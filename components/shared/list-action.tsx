import { db } from '@/lib/firebase'
import { IFolderAndFile } from '@/types'
import { doc, setDoc } from 'firebase/firestore'
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

interface ListActionProps {
  item: IFolderAndFile
}

const ListAction = ({ item }: ListActionProps) => {
  const { refresh } = useRouter()

  const type = item.size ? 'files' : 'folders'

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    const ref = doc(db, type, item.id)
    const promise = setDoc(ref, {
      ...item,
      isArchive: true,
      archivedTime: new Date(),
    }).then(() => refresh())

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Archived!',
      error: 'Failed to archive.',
    })
  }

  const onAddStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    const ref = doc(db, type, item.id)

    const promise = setDoc(ref, { ...item, isStar: true }).then(() => refresh())

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Starred!',
      error: 'Failed to star.',
    })
  }
  const onRemoveStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    const ref = doc(db, type, item.id)

    const promise = setDoc(ref, { ...item, isStar: false }).then(() =>
      refresh()
    )

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Unstarred!',
      error: 'Failed to unstar.',
    })
  }

  return (
    <div className="flex items-center space-x-1">
      <div
        onClick={onDelete}
        role="button"
        title="Delete"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="w-4 h-4 opacity-50" />
      </div>
      {item.isStar ? (
        <div
          onClick={onRemoveStar}
          role="button"
          title="Star"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
      ) : (
        <div
          onClick={onAddStar}
          role="button"
          title="Star"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        >
          <Star className="w-4 h-4 opacity-50" />
        </div>
      )}
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
        <PopoverContent className="px-0 py-2">
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            title="Download"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </div>

          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            title="Rename"
          >
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </div>
          <Separator />
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            title="user"
          >
            <UserPlus className="w-4 h-4" />
            <span>Share</span>
          </div>
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            title="trash"
            onClick={onDelete}
          >
            <Trash className="w-4 h-4" />
            <span>Move to trash</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ListAction
