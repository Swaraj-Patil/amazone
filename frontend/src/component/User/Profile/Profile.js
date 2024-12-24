import React, { Fragment, useEffect, useState } from 'react'
import { Loader, MetaData } from '../../Layout'
import AccountCard from './AccountCard'
import './Profile.css'
import { CameraAltOutlined, CreateOutlined, DashboardRounded, DoneRounded, VpnKeyRounded } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors, loadUser, updateProfile } from '../../../redux/actions/userActions'
// import { error as ToastError, success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import { Backdrop, Tooltip } from '@mui/material'

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector(state => state.user)
    const [name, setName] = useState(user.name)
    const [nameUpdate, setNameUpdate] = useState(false)
    const { isUpdated, error: profileError, loading } = useSelector(state => state.profile)
    const [avatar, setAvatar] = useState(null)
    const [cover, setCover] = useState(null)
    const [openBackdrop, setOpenBackDrop] = useState(false)

    const cardOptions = [
        {
            imgUrl: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png',
            title: 'Your Orders',
            subtitle: 'Track, return, or buy things again',
            url: '/orders/me'
        },
        {
            imgUrl: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png',
            title: 'Your Address',
            subtitle: 'Edit address for orders and gifts',
            url: '/addresses'
        },
        {
            imgUrl: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png',
            title: 'Change Password',
            subtitle: 'Edit your password for login and security',
            url: '/password/update'
        },
        {
            imgUrl: 'https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png',
            title: 'Contact Us',
            subtitle: 'Get help from our customer service agents',
            url: '/contact'
        },
    ]

    function handleNameUpdate(e) {
        e.preventDefault()

        setNameUpdate(!nameUpdate)

        if (nameUpdate) {

            const myForm = new FormData()
            myForm.set('name', name)
            dispatch(updateProfile(myForm))
        }
    }

    const avatarChange = e => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const coverChange = e => {
        const reader2 = new FileReader()

        reader2.onload = () => {
            if (reader2.readyState === 2) {
                setCover(reader2.result)
            }
        }

        reader2.readAsDataURL(e.target.files[0])
    }

    const navigateToAdminDashboard = () => navigate('/admin/dashboard')

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }

        if (isUpdated) {
            // dispatch(ToastSuccess('Profile updated successfully'))
            toast.success('Profile updated successfully')
            dispatch(loadUser())
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        if (profileError) {
            // dispatch(ToastError(profileError))
            toast.error(profileError)
            dispatch(clearErrors())
        }

        if (avatar) {
            const myForm = new FormData()
            myForm.set('avatar', avatar)
            dispatch(updateProfile(myForm))
            setAvatar(null)
        }

        if (cover) {
            const myForm2 = new FormData()
            myForm2.set('cover', cover)
            dispatch(updateProfile(myForm2))
            setCover(null)
        }
    }, [navigate, isAuthenticated, isUpdated, dispatch, profileError, avatar, cover])

    return (
        <Fragment>
            <MetaData title='Your Account' />
            <Backdrop
                open={openBackdrop}
                style={{ zIndex: 101 }}
            />

            {loading ? <Loader /> : (
                <>
                    <div className='account'>
                        <div>
                            <div className='account__cover'>
                                {user.cover && <img src={user.cover.url} alt='Cover' />}
                                <label htmlFor='cover'>
                                    <CameraAltOutlined />
                                </label>
                                <input
                                    name='cover'
                                    id='cover'
                                    accept='image/*'
                                    type='file'
                                    onChange={coverChange}
                                />
                            </div>
                            <div className='account__info app__center'>
                                <div>
                                    <label htmlFor='avatar'>
                                        <CameraAltOutlined />
                                    </label>
                                    {user.avatar && <img src={user.avatar.url} alt='Profile' />}
                                    <input
                                        name='avatar'
                                        id='avatar'
                                        accept='image/*'
                                        type='file'
                                        onChange={avatarChange}
                                    />
                                </div>

                                <div>
                                    <p>
                                        {nameUpdate
                                            ? <input
                                                name='name'
                                                id='name'
                                                type='text'
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                            : user.name
                                        }
                                        &nbsp;
                                        <span>
                                            {nameUpdate ? <DoneRounded onClick={handleNameUpdate} /> : <CreateOutlined onClick={handleNameUpdate} />}
                                        </span>

                                        {user?.role === 'Admin' &&
                                            <div className='account__info-admin'>
                                                <VpnKeyRounded sx={{ fontSize: '18px', cursor: 'default !important' }} />
                                                &nbsp;
                                                Admin
                                            </div>
                                        }
                                    </p>
                                    <h4><span>Email:</span>&nbsp; {user.email}</h4>
                                    <h4><span>Joined:</span>&nbsp; {String(user.createdAt).substr(0, 10)}</h4>
                                </div>

                                <div>
                                    <Link to='/me/update'><button className='button-primary'>Edit your public profile</button></Link>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='account__about'>
                                <h4>About <span>Public</span></h4>
                                <p>{user.about}</p>
                            </div>

                            <div>
                                {cardOptions.map((cardOption, index) => <AccountCard key={index} data={cardOption} />)}
                            </div>
                        </div>
                    </div>

                    {
                        user?.role === 'Admin' &&
                        <Tooltip title='Dashboard'>
                            <div
                                className='account__admin'
                                onClick={navigateToAdminDashboard}
                                onMouseOver={() => setOpenBackDrop(true)}
                                onMouseLeave={() => setOpenBackDrop(false)}
                            >
                                <DashboardRounded sx={{ fontSize: '36px' }} />
                            </div>
                        </Tooltip>
                    }

                </>

            )}
        </Fragment>
    )
}

export default Profile
