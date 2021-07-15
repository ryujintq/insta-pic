import { useSelector } from "react-redux"
import ProfileImage from "./ProfileImage"
import axios from '../api/axios'

const ProfileHeader = ({ userData, setUserData }) => {
    const { user } = useSelector(state => state.auth)

    const handleFollowToggle = async () => {
        try {
            const { data: { data: { isFollowed } } } = await axios.post('/users/follow', { followingId: userData.user._id })
            setUserData(prevState => {
                return {
                    ...prevState,
                    isFollowed,
                    followers: isFollowed ? (prevState.followers + 1) : (prevState.followers - 1)
                }
            })
        } catch (error) {
            alert('Something wrong with server connection')
        }
    }

    return (
        <div className='w-full flex py-10 border-b-2 pl-5'>
            <ProfileImage src={userData.user.profileImage} height={150} width={150} />
            <div className='flex flex-col pl-10 md:pl-28 min-w-min justify-center'>
                <div className='flex flex-col md:flex-row'>
                    <h1 className='text-3xl'>{userData.user.username}</h1>
                    <div className='mt-4 md:ml-5 md:mt-0'>
                        {user._id !== userData.user._id && (
                            <button className='border border-gray-300 h-8 px-2' onClick={handleFollowToggle}>
                                {userData.isFollowed ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='flex gap-5 sm:gap-10 mt-4'>
                    <p><span className='font-bold'>{userData.posts.length}</span> posts</p>
                    <p><span className='font-bold'>{userData.followers}</span> followers</p>
                    <p><span className='font-bold'>{userData.followings}</span> following</p>
                </div>
                <div className='mt-4'>
                    <p className='font-bold'>{userData.user.firstName} {userData.user.lastName}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
