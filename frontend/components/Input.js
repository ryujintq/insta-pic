const Input = ({ type, name, value, onChange, placeholder }) => {
    return (
        <input
            className='p-2 my-2 w-full bg-gray-100'
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

Input.defaultProps = {
    type: 'text'
}

export default Input
