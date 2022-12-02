import React from 'react'

import { Footer, FormStatus, Header, Input } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form/form-context'
import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}
const Login: React.FC<Props> = ({ validation }: Props) => {
  const { handleSubmit, data } = useFormContext()

  React.useEffect(() => {
    validation?.validate({ email: data?.email })
  }, [data?.email])

  React.useEffect(() => {
    validation?.validate({ password: data?.password })
  }, [data?.password])

  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='text' name='email' placeholder='Digite o seu email' />
        <Input type='password' name='password' placeholder='Digite a sua senha' />
        <button data-testid="submit" type='submit' className={Styles.btnSubmit} disabled={true}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div >
  )
}
export default Login
