import { useState } from 'react'
import { useRef } from 'react'
import ImageWrapper from './ImageWrapper'
import PostHeader from './PostHeader'
import PostIcons from './PostIcons'
import PostLikes from './PostLikes'
import PostCaption from './PostCaption'
import PostComments from './PostComments'
import PostInput from './PostInput'

const Post = ({ post, isLast }) => {
    const [postState, setPostState] = useState(post)
    const inputRef = useRef()

    return (
        <div className={`flex flex-col border border-gray-200 max-w-2xl w-full mt-10 bg-white shadow ${isLast && 'mb-10'}`}>
            <PostHeader user={postState.user} />
            {/* <img src={postState.imageURL} style={{ height: 'auto', width: '100%' }} /> */}
            <ImageWrapper imageURL={postState.imageURL} />
            <PostIcons post={postState} setPostState={setPostState} inputRef={inputRef} />
            <PostLikes likeCount={postState.likeCount} />
            <PostCaption post={postState} />
            <PostComments comments={postState.comments} />
            <PostInput inputRef={inputRef} setPostState={setPostState} postId={postState._id} />
        </div>
    )
}

export default Post
