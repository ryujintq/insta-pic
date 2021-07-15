import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from '../store'
// import { SocketProvider } from '../api/socket'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <SocketProvider id={store.getState().auth.user._id} token={store.getState().auth.token}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </SocketProvider> */}
    </Provider>
  )
}

export default MyApp
