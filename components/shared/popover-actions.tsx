'use client'

import { useFolder } from '@/hooks/use-folder'
import { db, storage } from '@/lib/firebase'
import { useUser } from '@clerk/nextjs'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { FileUp, Folder, FolderUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

const PopoverActions = () => {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const { onOpen } = useFolder()
  const { user } = useUser()
  const router = useRouter()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const file = files[0]
    let image = ''

    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        image = e.target?.result as string
        console.log(e.target?.result)
      }
    }

    const promise = addDoc(collection(db, 'files'), {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = ref(storage, `files/${docs.id}/image`)
      uploadString(refs, image, 'data_url').then(() => {
        getDownloadURL(refs).then((url) => {
          updateDoc(doc(db, 'files', docs.id), {
            image: url,
          }).then(() => {
            router.refresh()
          })
        })
      })
    })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'File uploaded',
      error: 'Error uploading file',
    })
  }

  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        title="Create"
        onClick={onOpen}
      >
        <Folder className="w-4 h-4" />
        <span>New folder</span>
      </div>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
          title="Create"
        >
          <FileUp className="w-4 h-4" />
          <span>File upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
          title="Create"
        >
          <FolderUp className="w-4 h-4" />
          <span>Folder upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </>
  )
}

export default PopoverActions
