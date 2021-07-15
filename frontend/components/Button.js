const Button = ({ text, style, onClick }) => {
    return (
        <button
            className={`h-12 w-full border-2 border-black hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out active:bg-gray-700 ${style}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button

