const Spinner = ({ size, color }) => {
    return (
        <div className='w-full h-full flex flex-col flex-1 items-center justify-center my-auto'>
            <i className={`fas fa-spinner fa-spin fa-${size}x text-${color}`}></i>
        </div>
    )
}

Spinner.defaultProps = {
    size: '3'
}

export default Spinner
