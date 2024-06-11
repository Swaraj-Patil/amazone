import React, { Fragment, useEffect, useState } from 'react'
import './Common.css'
import { Loader, MetaData } from '../../Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePassword } from '../../../redux/actions/userActions'
// import { error as ToastError, success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@mui/material'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, loading, isUpdated } = useSelector(state => state.profile)

    function updatePasswordHandler(e) {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if (error) {
            // dispatch(ToastError(error))
            toast.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            // dispatch(ToastSuccess('Password updated successfully'))
            toast.success('Password updated successfully')
            navigate('/account')
        }

    }, [dispatch, error, isUpdated, navigate])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='login'>
                    <MetaData title='Amazone Change Password' />

                    <Breadcrumbs aria-label='breadcrumb' separator='›'>
                        <Link to='/account' underline='hover'>Your Account</Link>
                        <Typography color='text.primary'>Change Password</Typography>
                    </Breadcrumbs>

                    <div className='login__container'>
                        <h1>Change Password</h1>
                        <p style={{ fontSize: 12, marginBottom: '1rem' }}>Use the form below to change the password for your Amazone account</p>

                        <form>

                            <div className='login__formDiv'>
                                <label htmlFor="old-password">Current Password</label>
                                <input
                                    id='old-password'
                                    name='old-password'
                                    type="password"
                                    required
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className='login__formDiv'>
                                <label htmlFor="new-password">New Password</label>
                                <input
                                    id='new-password'
                                    name='new-password'
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
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
                                    onClick={updatePasswordHandler}
                                    className='login__signInButton button-primary'
                                >Save Changes</button>
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

export default UpdatePassword
