import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import CounterContextProvider from './components/Context/Counter.jsx'
import TokenContextProvider from './components/Context/TokenContext.jsx'
import CartContextProvider from './components/Context/CartContext.jsx';
import WishlistContextProvider from './components/Context/WishlistContext.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <WishlistContextProvider>
<CartContextProvider>
<TokenContextProvider>
    <CounterContextProvider>
  <React.StrictMode>
  {/* Children */}
    <App />
  </React.StrictMode>
  </CounterContextProvider>
  </TokenContextProvider>
  </CartContextProvider>
  </WishlistContextProvider>
  </Provider>
)   
