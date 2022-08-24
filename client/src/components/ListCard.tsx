import { IContact } from '../types/contact'

type TProps = {
  contact: IContact
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

export default function ListCard({
  contact,
  handleEdit,
  handleDelete,
}: TProps) {
  return (
    <div className='flex flex-col text-xs border-2 border-solid shadow-inner rounded-md p-1 my-2 bg-slate-50 hover:border-violet-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'>
      <div className='grid grid-cols-6 font-semibold '>
        <div>{contact?.name}</div>
        <button
          className='col-start-6 col-end-6 place-self-end'
          onClick={() => handleEdit(contact._id!)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 hover:fill-cyan-700'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
            <path
              fillRule='evenodd'
              d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <button
          className='col-start-7 col-end-7 place-self-end shrink-0'
          onClick={() => handleDelete(contact._id!)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5  hover:fill-cyan-700'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      <div className='w-full'>Phone: {contact.phone}</div>

      <div className='w-full my-0 mx-0'>Address: {contact.address}</div>
    </div>
  )
}
