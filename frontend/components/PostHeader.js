import Link from "next/link"
import ProfileImage from "./ProfileImage"

const PostHeader = ({ user }) => {
    console.log(user)
    return (
        <div className='flex p-5 items-center'>
            <Link href={`/user/${user._id}`}>
                <a>
                    <ProfileImage src={user.profileImage} height={35} width={35} style='hover:cursor-pointer' />
                </a>
            </Link>
            <Link href={`/user/${user._id}`}>
                <p className='pl-5 font-semibold hover:cursor-pointer hover:underline'>{user.username}</p>
            </Link>
        </div>
    )
}

export default PostHeader
