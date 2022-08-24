import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addUser } from '../store/app/app.slice'
import { changeFocus } from '../store/app/focus.slice'
import AddNewContactForm from './AddNewContactForm'

export default function Nav() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const showAddContactForm = () => {
    setIsOpen(true)
    dispatch(changeFocus(false))
  }

  const handleSignOut = () => {
    window.localStorage.removeItem('loggedTestAppUser')
    dispatch(addUser(null))
  }

  return (
    <>
      <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
        <h3 className='font-bold'>Contact List</h3>
        <span>
          {user && (
            <button
              className='inline-block px-6 py-2 border-0 text-white-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
              onClick={showAddContactForm}
            >
              Add Contact
            </button>
          )}

          {user && (
            <button
              className='inline-block px-6 py-2 border-0 text-white-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
              onClick={handleSignOut}
            >
              Sign out
            </button>
          )}
        </span>
      </nav>
      {isOpen ? <AddNewContactForm setIsOpen={setIsOpen} /> : null}
    </>
  )
}
