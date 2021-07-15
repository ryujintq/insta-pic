import Link from 'next/link'
import NavbarIcon from './NavbarIcon'
import ProfileImage from './ProfileImage'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../api/axios'
import Spinner from './Spinner'
import { authSetUser, authSignout } from '../redux/actions/authActions'
import { useRouter } from 'next/router'
import createFormData from '../api/createFormData'

const NavbarRight = () => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    const { user } = useSelector(state => state.auth)

    const handleDropdownToggle = () => {
        setOpenDropdown(!openDropdown)
    }

    const handleProfileRedirect = () => {
        setOpenDropdown(false)
        router.push(`/user/${user._id}`)
    }

    const handleImageUpload = async e => {
        setLoading(true)

        const { data: { data } } = await axios.patch(`/users/profileImage`, createFormData(user._id, e.target.files[0]), { headers: { 'Content-Type': 'multipart/form-data' } })

        setOpenDropdown(false)
        dispatch(authSetUser(data.user))
        setLoading(false)
    }

    const handleSignout = () => {
        dispatch(authSignout())
        setOpenDropdown(false)
        router.push('/')
    }

    return (
        <div className='flex'>
            <Link href='/'>
                <a>
                    <NavbarIcon icon='fas fa-home' />
                </a>
            </Link>
            <NavbarIcon icon='far fa-comments' />
            <NavbarIcon icon='far fa-compass' />
            <NavbarIcon icon='far fa-heart' />
            <div className='mx-2 sm:mx-4 relative flex items-center' >
                <ProfileImage
                    src={user.profileImage}
                    width={25}
                    height={25}
                    onClick={handleDropdownToggle}
                    style='hover:cursor-pointer '
                />
                {openDropdown && (
                    <div className='absolute top-11 left-1/2 transform -translate-x-1/2 w-32 p-2 bg-white shadow'>
                        {loading ? <Spinner size='2' /> : (
                            <>
                                <p className='cursor-pointer my-2' onClick={handleProfileRedirect}>My Profile</p>
                                <input type='file' id='filePicker' accept='image/*' hidden onChange={handleImageUpload} />
                                <label className='cursor-pointer my-2' htmlFor='filePicker'>Change picture</label>
                                <p className='cursor-pointer my-2' onClick={handleSignout}>Signout</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavbarRight
