import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../components/Button"
import ErrorMessage from "../components/ErrorMessage"
import Input from "../components/Input"
import Spinner from "../components/Spinner"
import { authError, authLogin } from '../redux/actions/authActions'
import { useRouter } from 'next/router'
import Link from 'next/link'

const login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const { token, loading, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/')
        }
    }, [token])

    const onDataChange = e => {
        const { name, value } = e.target

        setLoginData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleConfirm = e => {
        e.preventDefault()

        //check if any of the fields are empty
        if (Object.values(loginData).some(x => x === '')) {
            return dispatch(authError('Please fill in all fields'))
        }

        dispatch(authLogin(loginData))
    }

    return (
        <div className='w-full flex-1 flex items-center justify-center -mt-40'>
            <div className='flex shadow-md bg-white p-5 mx-3 w-72 h-80'>
                {loading ? <Spinner /> : (
                    <form className='flex flex-col w-full justify-between'>
                        <h1 className='text-4xl'>Login</h1>
                        <div>
                            {errorMessage && <ErrorMessage text={errorMessage} />}
                            <Input placeholder='Email' name='email' onChange={onDataChange} />
                            <Input placeholder='Password' type='password' name='password' onChange={onDataChange} />
                        </div>
                        <div>
                            <Button style='mb-3' text='Confirm' onClick={handleConfirm} />
                            <Link href='/signup'>
                                <a>Don't have an account? Click here</a>
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default login
