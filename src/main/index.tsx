import React from 'react'
import { createRoot } from 'react-dom/client'

import { Login } from '@/presentation/pages'

const container = document.getElementById('root')

createRoot(container).render(<Login />)
