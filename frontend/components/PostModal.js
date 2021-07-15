import Modal from "./Modal"
import axios from '../api/axios'
import { useEffect, useState } from "react"
import Spinner from './Spinner'
import PostHeader from './PostHeader'
import PostComments from './PostComments'
import PostIcons from './PostIcons'
import PostLikes from './PostLikes'
import PostInput from './PostInput'
import PostCaption from './PostCaption'
import { useRef } from "react"
import Image from 'next/image'

const PostModal = ({ postId, closeModal }) => {
    const [loading, setLoading] = useState(true)
    const [postState, setPostState] = useState({})
    const inputRef = useRef()

    useEffect(() => {
        (async () => {
            try {
                const { data: { data: { post } } } = await axios.get(`/posts/${postId}`)
                setPostState(post)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
            }
        })()
    }, [])

    return (
        <Modal closeModal={closeModal}>
            {loading ? <Spinner color='white' /> : (
                <div className='bg-white flex flex-col sm:flex-row max-h-screen'>
                    <div className='flex-1'>
                        <img src={postState.imageURL} alt="" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <PostHeader user={postState.user} />
                        <PostCaption post={postState} />
                        <PostComments comments={postState.comments} />
                        <PostIcons post={postState} setPostState={setPostState} inputRef={inputRef} />
                        <PostLikes likeCount={postState.likeCount} />
                        <PostInput inputRef={inputRef} setPostState={setPostState} postId={postState._id} />
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default PostModal
