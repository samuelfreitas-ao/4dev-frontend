import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/presentation/styles/global.scss'

import { Router } from '@/presentation/components'
import { makeLogin } from './factories/pages/login/login-factory'

const container = document.getElementById('root')

createRoot(container).render(
  <Router
    makeLogin={makeLogin} />
)
