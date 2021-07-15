import Image from 'next/image'

const ImageWrapper = ({ imageURL }) => {
    return (
        <div className='next-img-wrapper'>
            <Image src={imageURL} layout="fill" />
        </div>
    )
}

export default ImageWrapper
