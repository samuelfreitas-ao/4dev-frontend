import { Footer, Header } from '@/presentation/components'
import React from 'react'
import Styles from './home-style.scss'

const Home: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Home</h2>
      </form>
      <Footer />
    </div>
  )
}
export default Home
