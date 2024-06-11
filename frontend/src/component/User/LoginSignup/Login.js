import React, { Fragment, useEffect, useState } from 'react'
import './Login.css'
import { ArrowDropDown, CloseRounded } from '@mui/icons-material'
import { Loader, MetaData } from '../../Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../../redux/actions/userActions'
// import { error as ToastError } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const DetailsTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FFF',
      color: 'rgb(0, 0, 0)',
      padding: 0,
      fontSize: '12px',
      border: '1px solid #dadde9',
      boxShadow: '1px 1px 5px 2px rgba(0,0,0,0.2)',
      minWidth: '400px'
    },
  }));

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [detailsTooltipOpen, SetDetailsTooltipOpen] = useState(false)

    const redirect = location.search ? `/${location.search.split('=')[1]}` : '/account'

    function loginHandler(e) {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (error) {
            // dispatch(ToastError(error))
            toast.error(error)
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            navigate(redirect)
        }

    }, [dispatch, error, isAuthenticated, navigate, redirect])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='login'>
                    <MetaData title='Amazone Sign In' />
                    <div className='login__container'>
                        <h1>Sign in</h1>

                        <form>
                            <div className='login__formDiv'>
                                <label htmlFor="email">Email</label>
                                <input
                                    id='email'
                                    name='email'
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='login__formDiv'>
                                <label htmlFor="password">Password</label>
                                <input
                                    id='password'
                                    name='password'
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    onClick={loginHandler}
                                    className='login__signInButton button-primary'
                                >Sign in</button>
                            </div>

                            <div className='login__formDiv-last' style={{ marginBottom: 5 }}>
                                <input type='checkbox' />
                                <p>
                                    Keep me signed in.
                                    &nbsp;
                                    <DetailsTooltip
                                        open={detailsTooltipOpen}
                                        onClose={() => SetDetailsTooltipOpen(false)}
                                        title={
                                            <div className='details__tooltip'>
                                                <div>
                                                    <strong>"Keep Me Signed In" Checkbox</strong>
                                                    <CloseRounded
                                                        onClick={() => SetDetailsTooltipOpen(false)} 
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </div>
                                                <p>
                                                    Choosing "Keep me signed in" reduces the number of times you're asked to Sign-In on this device.
                                                    <br />
                                                    <br />
                                                    To keep your account secure, use this option only on your personal devices.
                                                </p>
                                            </div>
                                        }
                                    >
                                        <span onClick={() => SetDetailsTooltipOpen(true)}>Details</span>
                                    </DetailsTooltip>
                                </p>
                                <ArrowDropDown />
                            </div>

                            <Link to='/password/forgot'>Forgot Password?</Link>
                        </form>

                    </div>

                    <div className='login__register'>
                        <div>
                            <div className='login__pLine'></div>
                            <p>New to Amazon?</p>
                            <div className='login__pLine'></div>
                        </div>
                        <Link to='/signup'><button className='login__registerButton button-secondary'>Create your Amazone account</button></Link>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Login
