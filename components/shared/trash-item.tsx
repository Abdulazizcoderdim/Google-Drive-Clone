'use client'

import { db, storage } from '@/lib/firebase'
import { byteConverter } from '@/lib/utils'
import { IFolderAndFile } from '@/types'
import { format } from 'date-fns'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { File, Folder, Minus, MoreVertical, Trash, Undo } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ConfirmModal from '../modals/confirm-modal'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { TableCell, TableRow } from '../ui/table'
import { deleteObject, ref } from 'firebase/storage'

interface TrashItemProps {
  item: IFolderAndFile
}

const TrashItem = ({ item }: TrashItemProps) => {
  const { refresh } = useRouter()

  const type = item.size ? 'files' : 'folders'

  const onRestore = () => {
    const ref = doc(db, type, item.id)

    const promise = setDoc(ref, {
      ...item,
      isArchive: false,
      archivedTime: null,
    }).then(() => refresh())

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Restored!',
      error: 'Failed to restore',
    })
  }

  const onDelete = () => {
    const refs = doc(db, type, item.id)

    if(type === 'folders'){
      const promise = deleteDoc(refs).then(() => refresh())

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Deleted!',
        error: 'Failed to delete',
      })
    }

    if(type === 'files'){
      const promise = deleteObject(ref(storage, item.image)).then(() => {
        deleteDoc(refs).then(() => refresh())
      })

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Deleted!',
        error: 'Failed to delete',
      })
    }
  }

  return (
    <TableRow>
      <TableCell>
        <div role="button" className="flex items-center space-x-1">
          {item.size ? (
            <File className="w-4 h-4 text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>
        {format(new Date(item.archivedTime.seconds * 1000), 'MMM dd, hh:mm a')}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center space-x-2">
        <Popover>
          <PopoverTrigger className="flex justify-start" asChild>
            <div
              className="p-2 hover:bg-secondary rounded-full transition"
              role="button"
              title="More"
            >
              <MoreVertical className="h-4 w-4" />
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-0 py-2" forceMount side="left">
            <div
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
              title="Download"
              onClick={onRestore}
            >
              <Undo className="w-4 h-4" />
              <span>Restore</span>
            </div>
            <ConfirmModal onConfirm={onDelete}>
              <div
                className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                role="button"
                title="Download"
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </div>
            </ConfirmModal>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  )
}

export default TrashItem
