import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import info from '../package.json'
import '@vercel/examples-ui/globals.css'
import '../styles/globals.css'

import { getLayout } from '@vercel/examples-ui'
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <div>
        <CommerceProvider >

        <Component {...pageProps} />
        </CommerceProvider>

    </div>
  )
}

export default App
