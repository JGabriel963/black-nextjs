import prisma from '@/lib/db'
import AddItemForm from './_components/AddItemForm'
import ItemsPrize from './_components/ItemsPrize'

interface Props {
  params: {
    id: string
  }	
}

export default async function RolleteIdPage({ params }: Props) {
    
  const prizers = await prisma.options.findMany({
    where: {
      rolleteId: params.id
    }
  })


  return (
    <div className='h-full w-full flex justify-center items-start px-4'>
        <div className="flex flex-col w-full max-w-3xl px-4 text-center">
            <p className='font-medium text-lg'>Desenvolva seu Rolleta</p>
            <AddItemForm />
            {prizers.map((prizer) => (
              <ItemsPrize key={prizer.id} prizer={prizer} />
            ))}
        </div>
    </div>
  )
}
