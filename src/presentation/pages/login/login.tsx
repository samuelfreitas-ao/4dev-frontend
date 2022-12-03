import React from 'react'

import Styles from './login-styles.scss'

import { Footer, FormStatus, Header, Input } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation?: Validation
  authentication?: Authentication
}
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { data, state, setState, setIsLoading, isLoading } = useFormContext()

  React.useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', data.email),
      paswordError: validation?.validate('password', data.password)
    })
  }, [data?.email, data?.password])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    await authentication.auth({
      email: data.email,
      password: data.password
    })
  }

  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='text' name='email' placeholder='Digite o seu email' />
        <Input type='password' name='password' placeholder='Digite a sua senha' />
        <button data-testid="submit" type='submit' className={Styles.btnSubmit} disabled={!data.email || !data.password}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div >
  )
}
export default Login
