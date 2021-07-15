import { useEffect, useState } from "react"
import Post from "../../../components/Post"
import Spinner from "../../../components/Spinner"
import axios from '../../../api/axios'
import { useRouter } from "next/router"

const index = () => {
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return

        (async () => {
            try {
                const { data: { data: { post } } } = await axios.get(`/posts/${id}`)
                setPost(post)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
            }
        })()
    }, [id])

    const handleBackClick = () => {
        router.back()
    }

    return (
        <div className='flex flex-col flex-1 items-center mb-10'>
            {loading ? <Spinner /> : (
                <>
                    <i className="fas fa-arrow-left fa-2x mt-5 -mb-5 self-start ml-5 hover:cursor-pointer" onClick={handleBackClick}></i>
                    <Post post={post} />
                </>
            )}
        </div>
    )
}

export default index
