import axios from '../api/axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const PostInput = ({ inputRef, setPostState, postId }) => {
    const [comment, setComment] = useState('')
    const { user } = useSelector(state => state.auth)

    const handleOnChange = e => {
        setComment(e.target.value)
    }

    const handleSubmitComment = async e => {
        e.preventDefault()

        if (!comment.length) return

        setComment('')

        try {
            await axios.post('/posts/comment', { comment, postId })

            setPostState(prevState => {
                return {
                    ...prevState,
                    comments: [...prevState.comments, { comment, user }]
                }
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    return (
        <form onSubmit={handleSubmitComment} className='flex items-center border-t px-5'>
            <input
                type="text"
                placeholder='Add a comment...'
                className='w-full mr-3 focus:outline-none'
                value={comment}
                onChange={handleOnChange}
                ref={inputRef}
            />
            <button className={`font-semibold ${comment ? 'text-blue-400' : 'text-blue-200'} ${comment.length && 'hover:cursor-pointer'}  p-3 focus:outline-none`} >
                Post
            </button>
        </form>
    )
}

export default PostInput
