import { useSelector } from 'react-redux'
import { LoginForm } from '../components/LoginForm'
import { RootState } from '../store'
import ContactPage from './ContactPage'

export default function HomePage() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className='grid place-items-center mt-10'>
      {user === null ? <LoginForm /> : <ContactPage />}
    </div>
  )
}
