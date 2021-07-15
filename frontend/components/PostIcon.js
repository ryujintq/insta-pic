const PostIcon = ({ icon, onClick }) => {
    return (
        <i className={`${icon} mr-5 text-2xl hover:cursor-pointer`} onClick={onClick}></i>
    )
}

export default PostIcon
