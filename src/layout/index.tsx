/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 12:02
 */

import { Box } from '@material-ui/core'
import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const Layout: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      width="100%">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  )
}

export default Layout
