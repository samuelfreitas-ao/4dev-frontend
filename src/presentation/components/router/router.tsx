import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login, Home } from '@/presentation/pages'
import { FormContextLayer } from '@/presentation/contexts/form/form-context'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<FormContextLayer><Login /></FormContextLayer>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
