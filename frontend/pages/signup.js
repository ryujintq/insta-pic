import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../components/Button"
import Input from "../components/Input"
import { authError, authSignup } from "../redux/actions/authActions"
import ErrorMessage from "../components/ErrorMessage"
import Spinner from "../components/Spinner"

const signup = () => {
    const [signupData, setSignupData] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', password2: '' })
    const router = useRouter()
    const { token, errorMessage, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            router.push('/')
        }
    }, [token])

    const handleDataChange = e => {
        const { name, value } = e.target

        setSignupData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleConfirm = e => {
        e.preventDefault()

        //check if any of the fields are empty
        if (Object.values(signupData).some(x => x === '')) {
            return dispatch(authError('Please fill in all fields'))
        }

        //check if passwords match
        if (signupData.password !== signupData.password2) {
            return dispatch(authError('Passwords do not match'))
        }

        dispatch(authSignup(signupData))
    }

    return (
        <div className='w-full flex-1 flex items-center justify-center -mt-20'>
            <div className='flex flex-col shadow-md bg-white p-5'>
                {loading ? <Spinner /> : (
                    <form className='flex flex-col w-72'>
                        <h1 className='text-4xl mb-4'>Signup</h1>
                        <div className='my-2'>
                            {errorMessage && <ErrorMessage text={errorMessage} />}
                            <Input name='firstName' value={signupData.firstName} onChange={handleDataChange} placeholder='First Name' />
                            <Input name='lastName' value={signupData.lastName} onChange={handleDataChange} placeholder='Last Name' />
                            <Input name='email' value={signupData.email} onChange={handleDataChange} placeholder='Email' />
                            <Input name='username' value={signupData.username} onChange={handleDataChange} placeholder='Username' />
                            <Input name='password' value={signupData.password} onChange={handleDataChange} placeholder='Password' type='password' />
                            <Input name='password2' value={signupData.password2} onChange={handleDataChange} placeholder='Confirm Password' type='password' />
                        </div>
                        <Button text='Confirm' value={signupData.firstName} style='mt-3' onClick={handleConfirm} />
                        <Link href='/login'>
                            <a className='mt-3'>Already have an account? Click here</a>
                        </Link>
                    </form>
                )}
            </div>
        </div>
    )
}

export default signup
