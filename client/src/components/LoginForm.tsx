import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import contactService from '../services/contacts'
import loginService from '../services/login'
import { createUser } from '../services/user'
import { addUser } from '../store/app/app.slice'
import { changeFocus } from '../store/app/focus.slice'
import { IUserLogin } from '../types/user'
import { FormInput } from './UI/FormInput'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<IUserLogin>({
    email: '',
    password: '',
  })

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      errorMsg: 'It should be a valid email address.',
      label: 'Email',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      pattern: `^.{6,}$`,
      errorMsg: 'Password should be at least 6 characters.',
      label: 'Password',
      required: true,
    },
  ]

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    })

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const user = await loginService.login(formData)
      window.localStorage.setItem('loggedTestAppUser', JSON.stringify(user))
      dispatch(addUser(user))
      contactService.setToken(user.token)
      setFormData({ email: '', password: '' })
    } catch (err) {
      toast.error(err.response.data.error, {
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

  const handleSignUp = async (formData: IUserLogin) => {
    try {
      const res = await createUser(formData)
      setFormData({ email: '', password: '' })
      dispatch(changeFocus(false))
      toast.success(res, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      toast.error(err.response.data.error, {
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
      <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm'>
        <form onSubmit={handleLogin}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              value={formData[input.name as keyof IUserLogin]}
              onChange={handleChange}
              {...input}
            />
          ))}
          <button
            type='submit'
            className='w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      mb-2'
          >
            sign in
          </button>
        </form>
        <button
          className='w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out'
          onClick={() => handleSignUp(formData)}
        >
          sign up
        </button>
        <ToastContainer />
      </div>
    </>
  )
}
