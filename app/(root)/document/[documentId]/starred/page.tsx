import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const getFiles = async (folderId: string, uid: string) => {
  let files: any[] = []
  const q = query(
    collection(db, 'folders', folderId, 'files'),
    where('uid', '==', uid),
    where('isArchive', '==', false),
    where('isStar', '==', true)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id })
  })

  return files
}

const DocumentStarredPage = () => {
  return <div>DocumentStarredPage</div>
}

export default DocumentStarredPage
