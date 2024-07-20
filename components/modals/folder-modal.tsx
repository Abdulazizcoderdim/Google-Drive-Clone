'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useFolder } from '@/hooks/use-folder'
import { db } from '@/lib/firebase'
import { formSchema } from '@/lib/validation'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { toast } from 'sonner'

const FolderModal = () => {
  const { isOpen, onClose } = useFolder()
  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const promise = addDoc(collection(db, 'folders'), {
      name: values.name,
      timestamp: serverTimestamp(),
      uid: user?.id,
      isArhive: false,
    }).then(() => {
      form.reset()
      onClose()
    })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Folder created',
      error: 'Error creating folder',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-none outline-none"
                        placeholder="Folder name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center space-x-2">
                <Button
                  type="button"
                  size={'sm'}
                  onClick={onClose}
                  variant={'link'}
                >
                  Cancel
                </Button>
                <Button variant={'outline'} type="submit" size={'sm'}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FolderModal
