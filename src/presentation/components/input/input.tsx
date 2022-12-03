import { useFormContext } from '@/presentation/contexts/form/form-context'
import React from 'react'

import Styles from './input-styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { handleInputChange, state, data, errorMessage } = useFormContext()
  const inputName = props.name

  const error = state[`${inputName}Error`] || !data[inputName]

  const getStatus = (): string => {
    return error ? '🟠' : '🟢'
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={inputName} onChange={handleInputChange} />
      <span title={errorMessage} data-testid={`${inputName}-status`} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
