'use client'

import { IFolderAndFile } from '@/types'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { File, Folder } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { TableCell, TableRow } from '../ui/table'

interface ListItemProps {
  item: IFolderAndFile
}

const ListItem = ({ item }: ListItemProps) => {
  const { user } = useUser()

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        <div role="button" className="flex items-center space-x-1">
          {item.size ? (
            <File className="w-4 h-4 text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell></TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  )
}

export default ListItem
