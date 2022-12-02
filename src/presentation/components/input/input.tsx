import React from 'react'

import Styles from './input-styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const getStatus = (): string => {
    return '🟠'
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${props?.name}-status`} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
