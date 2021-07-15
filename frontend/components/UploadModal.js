import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import Spinner from './Spinner'
import axios from '../api/axios'
import { useSelector } from 'react-redux'
import Modal from './Modal'

const UploadModal = ({ image, closeModal }) => {
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState('')

    const { user } = useSelector(state => state.auth)

    const handleCaptionChange = e => {
        setCaption(e.target.value)
    }

    const handleTagsChange = e => {
        setTags(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData()

        formData.append('folder', `users/${user._id}/posts`)
        formData.append('image', image)
        formData.append('caption', caption)
        formData.append('tags', tags)

        try {
            await axios.post(`/posts`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            setLoading(false)
            closeModal()
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    return (
        <Modal closeModal={closeModal}>
            <div className='bg-white w-64 sm:w-500 p-3 flex-shrink'>
                {loading ? <Spinner /> : (
                    <>
                        <h1 className='text-2xl font-semibold'>Upload Image</h1>
                        <img src={URL.createObjectURL(image)} className='w-full h-auto my-3' height='auto' />
                        <form onSubmit={handleSubmit}>
                            <label>Caption</label>
                            <Input placeholder='Enter Caption' value={caption} onChange={handleCaptionChange} />
                            <label>Tags</label>
                            <Input placeholder='Separate by commas' value={tags} onChange={handleTagsChange} />
                            <Button text='Upload' />
                        </form>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default UploadModal
