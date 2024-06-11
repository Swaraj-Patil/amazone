import React, { Fragment, useEffect, useState } from 'react'
import './Common.css'
import { Loader, MetaData } from '../../Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { clearErrors, forgotPassword } from '../../../redux/actions/userActions'
// import { error as ToastError, success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    function forgotPasswordHandler (e) {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set('email', email)

        dispatch(forgotPassword(myForm))
    }


    useEffect(() => {
        if (error) {
            // dispatch(ToastError(error))
            toast.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            // dispatch(ToastSuccess(message))
            toast.success(message)
        }

    }, [dispatch, error, message])

    return (
        <Fragment>
            { loading ? <Loader /> : (
                <div className='login'>
                    <MetaData title='Amazone Password Assistance' />
                    <div className='login__container'>
                        <h1>Password assistance</h1>

                        <p style={{ fontSize: 13, marginBottom: '1rem' }}>Enter the email address or mobile phone number associated with your Amazon account.</p>

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

                            <div>
                                <button
                                    type='submit'
                                    onClick={forgotPasswordHandler}
                                    className='login__signInButton button-primary'
                                >Continue</button>
                            </div>
                        </form>

                    </div>

                    <div className='login__register'>
                        <h4>Has your email address changed?</h4>
                        <p>
                        If you no longer use the e-mail address associated with your Amazon account, you may contact <Link to='/contact'>Customer Service</Link> for help restoring access to your account.
                        </p>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ForgotPassword
