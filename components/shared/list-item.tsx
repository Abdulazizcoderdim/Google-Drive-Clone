'use client'

import { byteConverter } from '@/lib/utils'
import { IFolderAndFile } from '@/types'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { File, Folder, Minus } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { TableCell, TableRow } from '../ui/table'
import ListAction from './list-action'

interface ListItemProps {
  item: IFolderAndFile
}

const ListItem = ({ item }: ListItemProps) => {
  const { user } = useUser()

  console.log(item)

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
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center space-x-2">
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  )
}

export default ListItem
