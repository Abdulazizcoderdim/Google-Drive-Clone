'use client'

import { usePlan } from '@/hooks/use-plan'
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Progress } from '../ui/progress'
import Item from './item'
import PopoverActions from './popover-actions'

const Sidebar = () => {
  const { onOpen } = usePlan()

  return (
    <div className="h-[90vh] fixed w-72 top-[10vh] left-0 z-30 bg-[#F6F9FC] dark:bg-[#1f1f1f] ">
      <div className="flex flex-col p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit h-12 rounded-full px-6">
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 py-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <Item
                icon={React.createElement(link.icon)}
                label={link.label}
                path={link.path}
              />
            </Link>
          ))}
          <div className="flex flex-col space-y-2">
            <Progress className="h-2" value={30} />
            <span>20 MB of 1.5 GB used</span>

            <Button
              onClick={onOpen}
              className="rounded-full"
              variant={'outline'}
            >
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

const sidebarLinks = [
  {
    label: 'My drive',
    icon: Tablet,
    path: '/',
  },
  {
    label: 'Starred',
    icon: Star,
    path: '/starred',
  },
  {
    label: 'Recent',
    icon: Clock5,
    path: '/recent',
  },
  {
    label: 'Trash',
    icon: Trash,
    path: '/trash',
  },
  {
    label: 'Storage',
    icon: Cloud,
    path: '/cloud',
  },
]
