/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 10:41
 */

import { ApolloProvider } from '@apollo/client'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import Layout from '@/layout'
import { useApollo } from '@/lib/apollo'
import theme from '@/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Home</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
