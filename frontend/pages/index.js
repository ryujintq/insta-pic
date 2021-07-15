import { useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import axios from '../api/axios'
import Post from '../components/Post'
import UploadButton from "../components/UploadButton"
import Spinner from "../components/Spinner"

const Home = () => {
  const [posts, setPosts] = useState([])
  const { token } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token])

  useEffect(() => {
    (async () => {
      const { data: { data: { posts } } } = await axios.get('/posts')
      setPosts(posts)
      setLoading(false)
    })()
  }, [])

  return (
    <div className='flex-1 flex items-center flex-col'>
      {loading ? <Spinner /> : !posts.length ? <p className='mt-10'>You don't follow anyone yet!</p> :
        (posts.map((post, index) => (
          <Post post={post} key={post._id} isLast={index === (posts.length - 1)} />
        )))}
      <UploadButton />
    </div >
  )
}

export default Home
