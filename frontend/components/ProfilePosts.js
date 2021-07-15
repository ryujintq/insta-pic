import Image from 'next/image'
import { useState } from 'react'
import PostModal from './PostModal'
import Link from 'next/link'

const ProfilePosts = ({ userData }) => {
    const [postId, setPostId] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handlePostModal = chosenPostId => {
        setPostId(chosenPostId)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div>
            {!userData.posts.length ? <p className='text-center mt-10'>User has not uploaded any posts yet</p> : (
                <div className='mt-10 grid grid-flow-row gap-1 md:gap-6 grid-cols-3'>
                    {userData.posts.map(post => (
                        // <div className='user-posts overflow-hidden' key={post._id} onClick={() => handlePostModal(post._id)}>
                        <Link href={`/post/${post._id}`} key={post._id}>
                            <div className='user-posts overflow-hidden'>
                                <div className='image-fill'>
                                    <Image src={post.imageURL} height={325} width={325} objectFit="cover" />
                                </div>
                                <div className='user-post-overlay'>
                                    <p className='text-white'><i className="fas fa-heart text-white"></i> {post.likeCount}</p>
                                    <p className='text-white ml-6'><i className="fas fa-comment text-white"></i> {post.commentCount}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            )}
            {/* {openModal && <PostModal postId={postId} closeModal={closeModal} />} */}
        </div>
    )
}

export default ProfilePosts
