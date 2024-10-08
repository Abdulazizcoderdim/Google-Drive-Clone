import Empty from '@/components/shared/empty'
import Header from '@/components/shared/header'
import ListItem from '@/components/shared/list-item'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/firebase'
import { auth } from '@clerk/nextjs/server'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'

const getData = async (uid: string, type: 'files' | 'folders') => {
  let data: any[] = []
  const q = query(
    collection(db, type),
    where('uid', '==', uid),
    where('isArchive', '==', false),
    limit(4)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  })

  return data
}

const RecentPage = async () => {
  const { userId } = auth()
  const folders = await getData(userId!, 'folders')
  const files = await getData(userId!, 'files')

  return (
    <>
      <Header label="Recent" />
      {[...folders, ...files].length === 0 ? (
        <Empty />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((folder) => (
              <ListItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default RecentPage
//3:11:00
