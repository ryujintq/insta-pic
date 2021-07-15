import ProfileImage from './ProfileImage'

const UserSearchResult = ({ user, onClick }) => {
    return (
        <div className='flex hover:cursor-pointer hover:bg-gray-200 p-2' onClick={onClick}>
            <div className='mr-3'>
                <ProfileImage src={user.profileImage} />
            </div>
            <div>
                <p>{user.username}</p>
                <p className='text-gray-400'>{user.firstName} {user.lastName}</p>
            </div>
        </div>
    )
}

export default UserSearchResult
