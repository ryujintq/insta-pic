const PostLikes = ({ likeCount }) => {
    return (
        <div className='pl-5 pb-2'>
            <p className='font-semibold'>
                {likeCount === 0
                    ? 'Be the first to like this!'
                    : `${likeCount} like${likeCount > 1 ? 's' : ''}`
                }
            </p>
        </div>
    )
}

export default PostLikes
