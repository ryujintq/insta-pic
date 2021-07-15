import axios from "../../../api/axios"
import { useEffect, useState } from "react"
import Spinner from '../../../components/Spinner'
import { useRouter } from 'next/router'
import ProfileHeader from "../../../components/ProfileHeader"
import ProfilePosts from "../../../components/ProfilePosts"

const profile = () => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return

        (async () => {
            try {
                const { data: { data } } = await axios.get(`/users/${id}`)
                setUserData(data)
            } catch (error) {
                alert(error.response.data.error)
            }
            setLoading(false)
        })()
    }, [id])


    return (
        <div className='flex flex-col flex-1 '>
            {loading ? <Spinner /> : (
                <>
                    <ProfileHeader userData={userData} setUserData={setUserData} />
                    <ProfilePosts userData={userData} />
                </>
            )}
        </div>
    )
}

export default profile
