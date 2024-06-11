import React, { useEffect, useState, Fragment } from 'react'
import { Loader, MetaData } from '../../Layout'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { register, clearErrors } from '../../../redux/actions/userActions'
// import { error as ToastError } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = user

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, isAuthenticated, loading } = useSelector(state => state.user)

  function userDataChange (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const signupHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)

    dispatch(register(myForm))
  }

  useEffect(() => {
    if (error) {
      // dispatch(ToastError(error))
      toast.error(error)
      dispatch(clearErrors())
    }

    if (isAuthenticated) {
      navigate('/account')
    }
  })

  return (
    <Fragment>
      { loading ? <Loader /> : (
        <div className='signup'>
          <MetaData title='Amazone Registration' />

          <div className='signup__wrapper'>
            <div className='signup__container'>
              <h1>Create Account</h1>

              <form encType='multipart/form-data'>
                <div className='signup__formDiv'>
                  <label htmlFor='name'>Your name</label>
                  <input
                    name='name'
                    id='name'
                    type='text'
                    placeholder='First and last name'
                    required
                    value={name}
                    onChange={userDataChange}
                  />
                </div>

                <div className='signup__formDiv'>
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={userDataChange}
                  />
                </div>

                <div className='signup__formDiv'>
                  <label htmlFor='password'>Password</label>
                  <input
                    name='password'
                    id='password'
                    type='password'
                    placeholder='At least 8 characters'
                    required
                    value={password}
                    onChange={userDataChange}
                  />
                </div>

                <div className='signup__tnc-div'>By enrolling your email address, you consent to receive automated security notifications via email from Amazone. Message and data rates may apply.</div>

                <div>
                  <button
                    type='submit'
                    onClick={signupHandler}
                    className='signup__signupButton button-primary'
                  >Continue</button>
                </div>
              </form>

              <div>
                <p>Already have an account? <span className='signup__links'><Link to='/login'>Sign in</Link></span></p>
                <p>Buying for work? <span className='signup__links'><Link to='/somewhere'>Create a free business</Link></span></p>
              </div>

              <div>
                <p>By creating an account or logging in, you agree to Amazon's <span className='signup__links'>Conditions of Use</span> and <span className='signup__links'>Privacy Policy.</span></p>
              </div>
            </div>
          </div>

        </div>
      )}
    </Fragment>
  )
}

export default Signup
