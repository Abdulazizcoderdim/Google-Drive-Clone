'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useLayout } from '@/hooks/use-layout'
import { IFolderAndFile } from '@/types'
import SuggestCard from '../card/suggest-card'
import ListItem from './list-item'

interface ListsProps {
  folders: IFolderAndFile[]
  files: IFolderAndFile[]
}

const Lists = ({ files, folders }: ListsProps) => {
  const { layout } = useLayout()

  return layout === 'list' ? (
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
  ) : (
    <>
      <div className="text-sm opacity-70 mt-6">Suggested</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-4">
        {files.map((file) => (
          <SuggestCard item={file} key={file.id} />
        ))}
      </div>
      <div className="text-sm opacity-70 mt-6">Folders</div>
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
          {folders.map((folder) => (
            <ListItem key={folder.id} item={folder} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Lists
