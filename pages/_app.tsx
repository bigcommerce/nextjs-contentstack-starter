import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import info from '../package.json'
import '@vercel/examples-ui/globals.css'
import '../styles/globals.css'

import { getLayout } from '@vercel/examples-ui'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout title="BigCommerce Demo" path={`https://www.bigcommerce.com/`}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
