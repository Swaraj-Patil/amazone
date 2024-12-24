import React, { useState, Fragment, useRef, useEffect } from 'react'
import './Header.css'
import { Loader } from '../../Layout'
import { logoLight, cartIcon } from '../../../assets'
import { ArrowDropDown, FmdGoodOutlined, Search } from '@mui/icons-material'
import { Backdrop } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { logout } from '../../../redux/actions/userActions'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, loading, isAuthenticated } = useSelector(state => state.user)
  const { cartItems } = useSelector(state => state.cart)

  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  const accountDropdown = useRef(null)
  const searchInput = useRef(null)

  const handleSearch = e => {
    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
      searchInput.current.blur()
    } else {
      navigate('/products')
      searchInput.current.blur()
    }
  }

  const handleKeys = e => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  function handleLogout() {
    dispatch(logout())
    // dispatch(ToastSuccess('Logout Successful'))
    toast.success('Logout Successful')
  }

  useEffect(() => {
    setCartItemCount(cartItems?.reduce((acc, cartItem) => acc + cartItem.quantity, 0))
  }, [cartItems])

  // useEffect(() => {
  //   if (userError) {
  //     dispatch(ToastError('header'))
  //     dispatch(clearErrors())
  //   } 
  // }, [dispatch, userError])

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div className='header'>

          <Link to='/'><img className='header__logo' src={logoLight} alt='AMAZONE' /></Link>

          <div className='header__location'>
            <FmdGoodOutlined />
            <div>
              <p className='header__optionLineOne'>
                {isAuthenticated ? `Deliver to ${user.name}` : 'Hello'}
              </p>
              <p className='header__optionLineTwo'>Select your address</p>
            </div>
          </div>

          <div className='header__search'>
            <div className='header__preSearch'>All <ArrowDropDown /></div>
            <Backdrop
              open={open}
              style={{ zIndex: 1 }}
            />
            <input
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              className='header__searchInput'
              type='text'
              placeholder='Search Amazone.in'
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={handleKeys}
              ref={searchInput}
            />
            <Search
              className='header__searchIcon'
              onClick={handleSearch}
            />
          </div>

          <div className='header__nav'>
            <div className='header__option' style={{ flexDirection: 'row', alignItems: 'center' }}>
              <div className='header__flag'></div>
              <div>EN <ArrowDropDown style={{ fontSize: 16, transform: 'translateY(3px)' }} /></div>
            </div>

            <Link to={isAuthenticated ? '/account' : '/login'}>
              <div
                className='header__option header__dropdown'
                onMouseEnter={() => { isAuthenticated && accountDropdown.current.classList.add('active') }}
                onMouseLeave={() => { isAuthenticated && accountDropdown.current.classList.remove('active') }}
              >
                <span className='header__optionLineOne'>
                  {`Hello, ${isAuthenticated ? user.name : 'User'}`}
                </span>
                <span className='header__optionLineTwo'>
                  Account & Lists &nbsp;
                  <ArrowDropDown style={{ fontSize: 16, transform: 'translateY(3px)' }} />
                  <div
                    className='header__logout'
                    ref={accountDropdown}
                  >
                    <h4>Your Account</h4>
                    <ul>
                      <li onClick={() => navigate('/account')}>Your Account</li>
                      <li onClick={() => navigate('/orders/me')}>Your Orders</li>
                    </ul>
                    <button className='button-primary' onClick={handleLogout}>Logout</button>
                  </div>
                </span>
              </div>
            </Link>

            <div className='header__option'>
              <span className='header__optionLineOne'>Returns</span>
              <span className='header__optionLineTwo'>& Orders</span>
            </div>

            <Link to='/cart' className='header__optionBasket'>
              <div style={{ position: 'relative', paddingRight: '2px' }}>
                <span className='header__optionLineOne header__basketCount'>{cartItemCount}</span>
                <img src={cartIcon} alt='Cart' />
              </div>
              Cart
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Header
