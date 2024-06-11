import React, { useEffect } from 'react'
import {
  Footer,
  Header,
  AmazoneLogo,
  FooterAlt
} from './component/Layout'
import {
  Cart,
  Home,
  Products,
  Login,
  Signup,
  ProductDetails,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword
} from './component'
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import store from './redux/store'
import { loadUser } from './redux/actions/userActions';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Checkout from './component/Checkout/Checkout';

function App() {

  const conditions = ['login', 'signup', 'password']
  const location = useLocation()
  const authPages = conditions.some(element => location.pathname.includes(element))

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      {authPages ? <AmazoneLogo /> : <Header />}
      <Routes>
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />

        <Route exact path='/cart' element={<Cart />} />

        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route exact path='/account' element={<Profile />} />
          <Route exact path='/me/update' element={<UpdateProfile />} />
          <Route exact path='/password/update' element={<UpdatePassword />} />

          <Route exact path='/checkout' element={<Checkout />} />
        </Route>


        <Route exact path='/' element={<Home />} />
      </Routes>
      {authPages ? <FooterAlt /> : <Footer />}
    </>
  )
}

export default App
