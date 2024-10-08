'use client'

import { db } from '@/lib/firebase'
import { byteConverter } from '@/lib/utils'
import { IFolderAndFile } from '@/types'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { doc, setDoc } from 'firebase/firestore'
import { File, Folder, Minus, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { TableCell, TableRow } from '../ui/table'
import ListAction from './list-action'

interface ListItemProps {
  item: IFolderAndFile
}

const ListItem = ({ item }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(item.name)

  const inputRef = useRef<ElementRef<'input'>>(null)
  const { refresh, push } = useRouter()
  const { user } = useUser()

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, value.length)
    }, 0)
  }

  const onSave = () => {
    const type = item.size ? 'files' : 'folders'
    const ref = doc(db, type, item.id)

    const promise = setDoc(ref, {
      ...item,
      name: value.length ? value : 'Untitled',
    }).then(() => {
      setIsEditing(false)
      refresh()
    })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Saved!',
      error: 'Error saving',
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <TableRow
      className="group cursor-pointer"
      onClick={item.size ? () => {} : () => push(`/document/${item.id}`)}
    >
      <TableCell className="font-medium">
        {!isEditing ? (
          <div
            role="button"
            className="flex items-center space-x-1"
            onDoubleClick={onStartEditing}
          >
            {item.size ? (
              <File className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
            )}
            <span>{item.name}</span>
          </div>
        ) : (
          <div className="relative">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className=""
              ref={inputRef}
              onKeyDown={onKeyDown}
            />

            <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
              <Button
                onClick={onSave}
                size={'sm'}
                variant={'outline'}
                className="h-full"
              >
                <Save className="w-4 h-4" />
              </Button>

              <Button
                size={'sm'}
                variant={'outline'}
                className="h-full"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
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
        <ListAction onStartEditing={onStartEditing} item={item} />
      </TableCell>
    </TableRow>
  )
}

export default ListItem
