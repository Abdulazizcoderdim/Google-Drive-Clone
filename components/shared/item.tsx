'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface ItemProps {
  icon: React.ReactElement
  label: string
  path?: string
}

const Item = ({ icon, label, path }: ItemProps) => {
  const pathname = usePathname()

  const isActive = pathname === path

  return (
    <div
      className={cn(
        'flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer',
        isActive && 'bg-secondary'
      )}
    >
      {icon}
      <span className="pl-2 text-md opacity-75">{label}</span>
    </div>
  )
}

export default Item
