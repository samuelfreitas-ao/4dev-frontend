import React from 'react'

import Styles from './login-styles.scss'

import { Footer, FormStatus, Header, Input } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link } from 'react-router-dom'

type Props = {
  validation?: Validation
  authentication?: Authentication
}
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { data, state, setState } = useFormContext()
  React.useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', data.email),
      passwordError: validation?.validate('password', data.password)
    })
  }, [data?.email, data?.password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: data.email,
        password: data.password
      })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
        isLoading: false
      })
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='text' name='email' placeholder='Digite o seu email' />
        <Input type='password' name='password' placeholder='Digite a sua senha' />
        <button data-testid="submit" type='submit' className={Styles.btnSubmit} disabled={!data.email || !data.password}>Entrar</button>
        <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
        <FormStatus />
      </form>
      <Footer />
    </div >
  )
}
export default Login
