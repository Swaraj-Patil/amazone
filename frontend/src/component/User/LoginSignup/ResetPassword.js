import React, { Fragment, useEffect, useState } from 'react'
import './Common.css'
import { Loader, MetaData } from '../../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../../redux/actions/userActions'
// import { error as ToastError, success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.forgotPassword)

    function resetPasswordHandler(e) {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('password', password)
        myForm.set('confirmPassword', confirmPassword)

        dispatch(resetPassword(token, myForm))
    }

    useEffect(() => {
        if (error) {
            // dispatch(ToastError(error))
            toast.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            // dispatch(ToastSuccess('Password updated successfully'))
            toast.success('Password updated successfully')
            navigate('/account')
        }

    }, [dispatch, error, success, navigate])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='login'>
                    <MetaData title='Amazone Reset Password' />

                    <div className='login__container'>
                        <h1>Reset Password</h1>
                        <p style={{ fontSize: 12, marginBottom: '1rem' }}>Use the form below to reset the password for your Amazone account</p>

                        <form>

                            <div className='login__formDiv'>
                                <label htmlFor="password">New Password</label>
                                <input
                                    id='password'
                                    name='password'
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='login__formDiv'>
                                <label htmlFor="confirm-password">Re-enter New Password</label>
                                <input
                                    id='confirm-password'
                                    name='confirm-password'
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    onClick={resetPasswordHandler}
                                    className='login__signInButton button-primary'
                                >Reset</button>
                            </div>

                        </form>

                    </div>

                    <div className='login__register'>
                        <div>
                            <div className='login__pLine'></div>
                            <p>Secure password tips?</p>
                            <div className='login__pLine'></div>
                        </div>
                        <ul>
                            <li>Use atleast 8 characters, a combination of numbers and letters is best.</li>
                            <li>Do not use the same password you have used with us previously.</li>
                            <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
                            <li>Do not use the same password for multiple online accounts.</li>
                        </ul>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ResetPassword
