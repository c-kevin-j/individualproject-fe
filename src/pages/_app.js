import '../styles/globals.css'
import Layout1 from '../layouts/layout'
import { wrapper, store } from "../Redux/store";
import { Provider } from "react-redux"
import ErrorBoundary from "../Components/ErrorBoundary"

const layouts = {
  L1: Layout1
}

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || (({children}) => <>{children}</>)
  return (
    <>
    <ErrorBoundary>
      <Provider store={store}>
      
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
    </>
  )
}

export default wrapper.withRedux(MyApp)
