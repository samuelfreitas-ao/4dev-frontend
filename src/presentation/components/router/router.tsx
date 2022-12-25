import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={makeLogin(null, null)} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
