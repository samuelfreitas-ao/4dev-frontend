import { useFormContext } from '@/presentation/contexts/form/form-context'
import React from 'react'

import Styles from './input-styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { handleInputChange, state } = useFormContext()
  const inputName = ({ ...props } as any).name as string

  // const error = state[`${inputName}Error`] || !data[inputName]
  const error = state[`${inputName}Error`]

  const getStatus = (): string => {
    return error ? '🟠' : '🟢'
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={inputName} onChange={handleInputChange} />
      <span title={error || 'Tudo certo!'} data-testid={`${inputName}-status`} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
