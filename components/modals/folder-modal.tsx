'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useFolder } from '@/hooks/use-folder'

const FolderModal = () => {
  const { isOpen, onClose } = useFolder()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FolderModal
