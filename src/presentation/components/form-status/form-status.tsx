import React from 'react'
import Styles from './form-status-style.scss'
import { Spinner } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useFormContext()
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Erro</span>}
    </div>
  )
}

export default FormStatus
