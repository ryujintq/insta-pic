import React from 'react'

const ErrorMessage = ({ text }) => {
    return (
        <p className='bg-red-500 text-white px-2'>
            {text}
        </p>
    )
}

export default ErrorMessage
