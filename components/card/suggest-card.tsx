import { defineImageAndFile } from '@/lib/utils'
import { IFolderAndFile } from '@/types'
import { File, Paperclip } from 'lucide-react'
import Image from 'next/image'

interface SuggestCardProps {
  item: IFolderAndFile
}

const SuggestCard = ({ item }: SuggestCardProps) => {
  return (
    <div className="max-w-[300px] max-h-[400px] h-[210px] flex flex-col rounded-md shadow-lg p-4 bg-secondary group">
      <div
        title="Download"
        className="flex items-center space-x-2"
        role="button"
      >
        <Paperclip className="w-4 h-4 text-blue-500" />
        <span className="text-sm opacity-70">{item.name}</span>
      </div>
      <div className="relative h-[70%] w-full bg-white dark:bg-black mt-2 rounded-md">
        {defineImageAndFile(item.type) === 'file' ? (
          <div className="flex h-full items-center justify-center">
            <File className="w-16 h-16" strokeWidth={1} />
          </div>
        ) : (
          <Image fill src={item.image} alt="image" className="object-cover" />
        )}
      </div>
    </div>
  )
}

export default SuggestCard
