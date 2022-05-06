import '../styles/globals.css'
import Layout1 from './layouts/layout'

const layouts = {
  L1: Layout1
}

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || (({children}) => <>{children}</>)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
