import { FileUp, Folder, FolderUp } from 'lucide-react'
import { Separator } from '../ui/separator'

const PopoverActions = () => {
  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        title="Create"
      >
        <Folder className="w-4 h-4" />
        <span>New folder</span>
      </div>
      <Separator />
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        title="Create"
      >
        <FileUp className="w-4 h-4" />
        <span>File upload</span>
      </div>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        title="Create"
      >
        <FolderUp className="w-4 h-4" />
        <span>Folder upload</span>
      </div>
    </>
  )
}

export default PopoverActions
