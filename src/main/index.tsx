import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/presentation/styles/global.scss'

import { Router } from '@/presentation/components'

const container = document.getElementById('root')

createRoot(container).render(<Router />)
