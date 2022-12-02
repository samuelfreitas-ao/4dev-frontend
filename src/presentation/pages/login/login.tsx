import React from 'react'

import { Footer, FormStatus, Header, Input } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form/form-context'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const { handleSubmit, handleInputChange } = useFormContext()

  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='text' name='username' placeholder='Digite o seu email'
          onChange={handleInputChange} />
        <Input type='password' name='password' placeholder='Digite a sua senha'
          onChange={handleInputChange} />
        <button data-testid="submit" type='submit' className={Styles.btnSubmit} disabled={true}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div >
  )
}
export default Login
