'use client'

import { usePlan } from '@/hooks/use-plan'
import Image from 'next/image'
import PlanCard from '../card/plan-card'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

const PlanModal = () => {
  const { isOpen, onClose } = usePlan()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <Image src={'/one.svg'} alt="one" width={50} height={50} />
        </DialogHeader>
        <div className="opacity-75 text-center">
          Choose the Google One plan that is right for you
        </div>
        <div className="grid grid-cols-2 gap-4">
          {planArray.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlanModal

const planArray = [
  {
    name: 'Basic',
    description: '1.5 GB',
    price: 'Free',
    options: '15 GB of storage',
  },
  {
    name: 'Pro',
    description: '15 GB',
    price: '10',
    options:
      '100 GB of storage, Access to Google experts,  Share with up to 5 others, Extra member benefits, More Google Photos editing features',
    priceId: 'price_1PigVG2LnuUPnMonOWF7XbRX',
  },
]
