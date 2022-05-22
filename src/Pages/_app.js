import '../styles/globals.css'
import Layout1 from '../layouts/layout'
import { wrapper, store } from "../Redux/store";
import { Provider } from "react-redux"

const layouts = {
  L1: Layout1
}

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || (({children}) => <>{children}</>)
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
