import React, { memo } from 'react'

import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer} />
  )
}

export default memo(Footer) // to Prevent re-rendering on state change in other components
