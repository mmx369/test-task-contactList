import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useSearch } from '../hooks/useSearch'
import contactService from '../services/contacts'
import { RootState } from '../store'
import { useDeleteContactMutation } from '../store/app/app.api'
import { IContact } from '../types/contact'
import Modal from './EditContactForm'
import EmptyCard from './EmptyCard'
import ListCard from './ListCard'

type TProps = {
  contacts: IContact[]
}

export default function ContactsList({ contacts }: TProps) {
  const filter = useSelector((state: RootState) => state.filter)

  const [showModal, setShowModal] = useState(false)
  const [contact, setContact] = useState<IContact | null>(null)

  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap()
      toast.success(`Contact deleted.`, {
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

  const handleEdit = async (id: string) => {
    try {
      const res = await contactService.getSingleContact(id)
      setContact(res)
      setShowModal(true)
    } catch (err) {
      setShowModal(true)
    }
  }

  const searchedContacts = useSearch(contacts, filter)

  if (searchedContacts.length === 0) {
    return <EmptyCard />
  }

  return (
    <>
      {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          contact={contact}
        />
      ) : null}
      <div>
        {searchedContacts.map((contact) => (
          <ListCard
            key={contact._id}
            contact={contact}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  )
}
