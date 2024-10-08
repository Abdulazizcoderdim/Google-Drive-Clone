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
import { FileUp, Folder, FolderUp, Star, Trash } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

const PopoverActions = () => {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const { onOpen } = useFolder()
  const { user } = useUser()
  const router = useRouter()
  const { documentId } = useParams()

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
      }
    }

    const folderId = documentId as string

    const collectionRefs = !documentId
      ? collection(db, 'files')
      : collection(db, 'folders', folderId, 'files')

    const promise = addDoc(collectionRefs, {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = documentId
        ? ref(storage, `files/${folderId}/${docs.id}/image`)
        : ref(storage, `files/${docs.id}/image`)
      uploadString(refs, image, 'data_url').then(() => {
        getDownloadURL(refs).then((url) => {
          const docRefs = documentId
            ? doc(db, 'folders', folderId, 'files', docs.id)
            : doc(db, 'files', docs.id)
          updateDoc(docRefs, {
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
      {!documentId && (
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
        </>
      )}
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

      {documentId && (
        <>
          <Separator />
          <Link href={`/document/${documentId}/trash`}>
            <div
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
              title="Trash"
            >
              <Trash className="w-4 h-4" />
              <span>Trash</span>
            </div>
          </Link>
          <Link href={`/document/${documentId}/starred`}>
            <div
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
              title="Starred"
            >
              <Star className="w-4 h-4" />
              <span>Starred</span>
            </div>
          </Link>
        </>
      )}
    </>
  )
}

export default PopoverActions
