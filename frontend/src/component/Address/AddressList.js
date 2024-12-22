import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, MetaData } from '../Layout'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Addresses.css'
import { clearErrors, getAllAddresses } from '../../redux/actions/addressActions'
import { toast } from 'react-toastify'
import AddressCard from './AddressCard'

const AddressList = () => {

    const dispatch = useDispatch()

    const { error, loading, addresses } = useSelector(state => state.allAddresses)

    useEffect(() => {

        if (error) {
          toast.error(error)
          dispatch(clearErrors())
        }
    
        dispatch(getAllAddresses())
      }, [dispatch, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='addresses'>
                    <MetaData title='Your Addresses' />

                    <Breadcrumbs aria-label='breadcrumb' separator='›'>
                        <Link to='/account' underline='hover'>Your Account</Link>
                        <Typography color='text.primary'>Your Addresses</Typography>
                    </Breadcrumbs>

                    <div className='addresses__container'>
                        <h1>Your Addresses</h1>
                        <p style={{ fontSize: 12, marginBottom: '1rem' }}>Use the form below to change the password for your Amazone account</p>

                        {/* <form>

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

                        </form> */}

                        <div className='addresses__card-wrapper'>
                            {addresses.map(address => 
                                <AddressCard 
                                    key={address?._id} 
                                    name={address?.name} 
                                    addressLine={address?.addressLine}
                                    area={address?.area}
                                    city={address?.city}
                                    state={address?.state}
                                    pincode={address?.pincode}
                                    country={address?.country}
                                    mobile={address?.mobile}
                                    deliveryInstructions={address?.deliveryInstructions}
                                    defaultAddress={address?.defaultAddress}
                                />
                            )}
                        </div>

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

export default AddressList