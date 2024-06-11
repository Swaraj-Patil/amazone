import React, { useState, useEffect, useRef } from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
// import { error as ToastError, success as ToastSuccess, info as ToastInfo } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { clearErrors, loadUser, updateProfile } from '../../../redux/actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, MetaData } from '../../Layout'
import './UpdateProfile.css'

const UpdateProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)
    const { isUpdated, error: profileError, loading } = useSelector(state => state.profile)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')

    const nameInput = useRef(null) 
    const emailInput = useRef(null) 
    const aboutInput = useRef(null) 

    function handleUpdate(e) {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('about', about)

        dispatch(updateProfile(myForm))
    }

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAbout(user.about)
        }
        if (profileError) {
            // dispatch(ToastError(profileError))
            toast.error(profileError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            // dispatch(ToastSuccess('Profile Updated successfully'))
            toast.success('Profile Updated successfully')
            dispatch(loadUser())
            navigate('/account')
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [profileError, dispatch, isUpdated, navigate, user])


    return (
        <div className='updateProfile'>
            <MetaData title='Amazone Change Name, E-mail, About' />

            <div>
                <Breadcrumbs aria-label='breadcrumb' separator='›'>
                    <Link to='/account' underline='hover'>Your Account</Link>
                    <Typography color='text.primary'>Update Profile</Typography>
                </Breadcrumbs>
                <h1>Update Profile</h1>

                {loading ? <Loader /> : (
                    <div className='updateProfile__form'>
                        <form encType='multipart/form-data'>
                            <div>
                                <div>
                                    <label htmlFor='name'>Name:</label>
                                    <input
                                        name='name'
                                        id='name'
                                        type='text'
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        readOnly={true}
                                        ref={nameInput}
                                    />
                                </div>
                                <button className='button-secondary' onClick={e => {
                                    e.preventDefault()
                                    nameInput.current.readOnly = false
                                    nameInput.current.focus()
                                    nameInput.current.classList.add('focus')
                                }}>Edit</button>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor='email'>Email:</label>
                                    <input
                                        name='email'
                                        id='email'
                                        type='email'
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        readOnly={true}
                                        ref={emailInput}
                                    />
                                </div>
                                <button className='button-secondary' onClick={e => {
                                    e.preventDefault()
                                    emailInput.current.readOnly = false
                                    emailInput.current.focus()
                                    emailInput.current.classList.add('focus')
                                }}>Edit</button>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor='about'>About:</label>
                                    <textarea
                                        name='about'
                                        id='about'
                                        rows={6}
                                        maxLength='400'
                                        value={about}
                                        onChange={e => setAbout(e.target.value)}
                                        readOnly={true}
                                        ref={aboutInput}
                                        ></textarea>
                                </div>
                                <button className='button-secondary' onClick={e => {
                                    e.preventDefault()
                                    aboutInput.current.readOnly = false
                                    aboutInput.current.focus()
                                    aboutInput.current.classList.add('focus')
                                }}>Edit</button>
                            </div>
                            <div>
                                <div>
                                    <label>2-step verification:</label>
                                    <textarea rows={3} defaultValue='Add a layer of security. Require a verification code in addition to your password.'></textarea>
                                </div>
                                <button className='button-secondary' onClick={e => {
                                    e.preventDefault()
                                    // dispatch(ToastInfo('Feature Coming soon'))
                                    toast.info('Feature Coming soon')
                                }}>Turn on</button>
                            </div>
                            <div>
                                <div>
                                    <label>Compromised account?</label>
                                    <textarea rows={3} defaultValue='Take steps like changing your password and signing out everywhere'></textarea>
                                </div>
                                <button className='button-secondary' onClick={e => {
                                    e.preventDefault()
                                    // dispatch(ToastInfo('Feature Coming soon'))
                                    toast.info('Feature Coming soon')
                                }}>Start</button>
                            </div>
                        </form>

                        <button type='submit' className='button-primary' onClick={handleUpdate}>Done</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default UpdateProfile
