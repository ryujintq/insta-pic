import { useRef, useState } from "react"
import UploadModal from "./UploadModal"

const UploadButton = () => {
    const [image, setImage] = useState()
    const [openModal, setOpenModal] = useState(false)
    const filePickerRef = useRef()

    const handleUploadClick = () => {
        filePickerRef.current.click()
    }

    const handleImageUpload = async e => {
        setImage(e.target.files[0])
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    return (
        <div className='fixed bottom-10 sm:bottom-16 w-full flex justify-center bg-red-500' >
            <div className='w-full flex relative h-full items-center max-w-5xl'>
                <input type='file' id='filePicker' accept='image/*' hidden onChange={handleImageUpload} ref={filePickerRef} />
                <button
                    className='h-14 w-14 bg-blue-500 rounded-full absolute right-5 sm:right-10 flex items-center justify-center focus:outline-none'
                    onClick={handleUploadClick}
                >
                    <i className="fas fa-plus fa-2x text-white"></i>
                </button>
            </div>
            {openModal && <UploadModal image={image} closeModal={handleModalClose} />}
        </div>
    )
}

export default UploadButton
