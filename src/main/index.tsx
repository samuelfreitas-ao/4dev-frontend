import React from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

const container = document.getElementById('root')

createRoot(container).render(<Router />)
