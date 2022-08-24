import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useUpdateContactMutation } from '../store/app/app.api'
import { IContact } from '../types/contact'

type TProps = {
  showModal: boolean
  setShowModal: any
  contact: IContact | null
}

export default function EditContactForm({ setShowModal, contact }: TProps) {
  const [newContact, setNewContact] = useState({
    name: contact?.name,
    phone: contact?.phone,
    address: contact?.address,
    id: contact?._id,
  })

  const [updateContact] = useUpdateContactMutation()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await updateContact(newContact as IContact)
      setShowModal(false)
      toast.success(`Contact updated.`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      toast.error(`Something went wrong. Try later.`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div
          className='fixed inset-0 w-full h-full bg-black opacity-40'
          onClick={() => setShowModal(false)}
        ></div>
        <div className='flex items-center min-h-screen'>
          <div className='relative max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
            <div className='sm:flex'>
              <div>
                <h4 className='text-lg font-medium text-gray-800 text-center'>
                  Edit Contact
                </h4>
                <div className='relative p-2 flex-auto'>
                  <form className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full'>
                    <label className='block text-black text-sm font-bold mb-1'>
                      Name
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-1 text-black'
                      name='name'
                      value={newContact.name}
                      onChange={handleChange}
                    />
                    <label className='block text-black text-sm font-bold mb-1'>
                      Phone
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-1 text-black'
                      name='phone'
                      value={newContact.phone}
                      onChange={handleChange}
                    />
                    <label className='block text-black text-sm font-bold mb-1'>
                      Address
                    </label>
                    <textarea
                      className='shadow appearance-none border rownded w-full py-2 px-1 text-black'
                      rows={3}
                      name='address'
                      value={newContact.address}
                      onChange={handleChange}
                    />
                  </form>
                </div>

                <div className='items-center gap-2 mt-3 sm:flex'>
                  <button
                    className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
