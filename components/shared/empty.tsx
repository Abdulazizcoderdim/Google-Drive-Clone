import Image from 'next/image'

interface EmptyProps {
  sm?: boolean
}

const Empty = ({ sm }: EmptyProps) => {
  return (
    <div className="w-full justify-center flex flex-col space-y-2">
      <Image
        src="/empty.svg"
        className="mx-auto"
        width={sm ? 100 : 300}
        height={sm ? 100 : 300}
        alt={'Empty'}
      />

      <h1 className="text-3xl text-center">Empty</h1>

      <p className="text-center text-gray-500">
        There is nothing here. Create a new folder or upload a file.
      </p>
    </div>
  )
}

export default Empty
