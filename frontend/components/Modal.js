const Modal = ({ children, closeModal }) => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen z-20 bg-black bg-opacity-80 flex items-center justify-center'>
            <i className=" absolute top-3 right-7 text-white fas fa-times fa-2x hover:cursor-pointer z-40" onClick={closeModal}></i>
            {children}
        </div>
    )
}

export default Modal
