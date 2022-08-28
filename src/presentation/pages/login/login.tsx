import { Footer, FormStatus, Header, Input } from '@/presentation/components'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite o seu email' />
        <Input type='password' name='password' placeholder='Digite a sua senha' />
        <button type='submit' className={Styles.btnSubmit}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
export default Login
