import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import contactService from './services/contacts'
import { addUser } from './store/app/app.slice'
import { ITokenObject } from './types/token'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedTestAppUser'
    ) as string

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) as ITokenObject
      dispatch(addUser(user))
      contactService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <>
      <Nav />
      <HomePage />
    </>
  )
}

export default App
