import React from 'react'
import Styles from './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  const objProps = { ...props }
  return (
    <div {...props} className={[Styles.spinner, objProps.className].join(' ')}>
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
