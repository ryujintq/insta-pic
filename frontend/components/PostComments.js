const PostComments = ({ comments }) => {
    return (
        <div className='flex flex-col pl-5 flex-grow overflow-y-auto max-h-96'>
            {comments.map((comment, index) => (
                <div className='flex' key={index}>
                    <p className='font-semibold pr-2 pb-2'>- {comment.user.username}</p>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    )
}

export default PostComments
