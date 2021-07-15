import PostIcon from "./PostIcon"
import axios from '../api/axios'

const PostIcons = ({ post, setPostState, inputRef }) => {
    const handleLikeToggle = async () => {
        try {
            const { data: { data: { isLiked } } } = await axios.post('/posts/like', { postId: post._id })
            setPostState(prevState => {
                return {
                    ...prevState,
                    isLiked,
                    likeCount: isLiked ? prevState.likeCount + 1 : prevState.likeCount - 1
                }
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    const handleInputFocus = () => {
        if (inputRef)
            inputRef.current.focus()
    }

    return (
        <div className='flex pl-5 py-2'>
            <PostIcon icon={`${post.isLiked ? 'text-red-500 fas' : 'far'} fa-heart`} onClick={handleLikeToggle} />
            <PostIcon icon='far fa-comment' onClick={handleInputFocus} />
            <PostIcon icon='far fa-share-square' />
        </div>
    )
}

export default PostIcons
