import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { changeFocus } from '../../store/app/focus.slice'

type TProps = {
  label?: string
  name: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  id: number
  value: string
  errorMsg: string
}

export const FormInput = (props: TProps) => {
  const dispatch = useDispatch()
  const { label, name, errorMsg, onChange, id, ...inputProps } = props
  const focus = useSelector((state: RootState) => state.focus)

  return (
    <div className='form-group mb-6'>
      {label && (
        <label
          htmlFor={name}
          className='form-label inline-block mb-2 text-gray-700'
        >
          {label}
        </label>
      )}
      <input
        className='peer form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        name={name}
        {...inputProps}
        onChange={onChange}
        onBlur={() => dispatch(changeFocus(true))}
        onFocus={() => name === 'password' && dispatch(changeFocus(true))}
      />
      <span
        className={
          focus
            ? `invisible peer-invalid:visible text-xs text-red-500 p-0 m-0`
            : 'invisible text-xs p-0 m-0'
        }
      >
        {errorMsg}
      </span>
    </div>
  )
}
