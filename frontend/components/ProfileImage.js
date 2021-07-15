import Image from 'next/image'

const ProfileImage = ({ src, width, height, onClick, style }) => {
    return (
        <div className='flex items-center'>
            <Image
                src={src}
                height={height}
                width={width}
                className={`rounded-full ${style}`}
                onClick={onClick}
                objectFit="cover"
            />
        </div>
    )
}

export default ProfileImage

ProfileImage.defaultProps = {
    height: 50,
    width: 50
}
