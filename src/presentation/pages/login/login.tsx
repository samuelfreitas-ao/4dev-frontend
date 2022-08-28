import { Logo, Spinner } from '@/presentation/components'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquete para programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name='email' placeholder='Digite o seu email' />
          <span className={Styles.status}>0</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name='password' placeholder='Digite a sua senha' />
          <span className={Styles.status}>0</span>
        </div>
        <button type='submit'>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <footer className={Styles.footer}>Footer</footer>
    </div>
  )
}
export default Login
