const PostCaption = ({ post }) => {
    return (
        <div className='flex pl-5'>
            <p className='font-semibold pr-2 pb-2'>{post.user.username}</p>
            <p>{post.caption}</p>
        </div>
    )
}

export default PostCaption
