import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import axios from '../api/axios'
import UserSearchResult from './UserSearchResult'
import Link from 'next/link'

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([])
            return
        }

        try {
            const fetchUsers = async () => {
                const { data: { data: users } } = await axios.get(`/users/search/${searchTerm}`)
                setSearchResults(users)
                setLoading(false)
            }
            const timer = setTimeout(() => {
                fetchUsers()
            }, 1000)

            return () => clearTimeout(timer)

        } catch (error) {
            console.log(error)
        }
    }, [searchTerm])

    const handleOnFocus = () => {
        setIsFocused(true)
    }

    const handleOnBlur = () => {
        setIsFocused(false)
    }

    const handleOnChange = e => {
        setLoading(true)
        setSearchTerm(e.target.value)
        setShowResults(e.target.value !== '')
    }

    const handleInputClear = e => {
        setSearchTerm('')
        setShowResults(false)
    }

    return (
        <div className='hidden sm:flex relative items-center justify-center'>
            <i className='fas fa-search text-gray-400 absolute left-2 text-sm ' />
            <input
                className='border px-7 py-1 w-56'
                placeholder='Search'
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                value={searchTerm}
                onChange={handleOnChange}
            />
            {(isFocused || searchTerm) && <i
                className='fas fa-times-circle text-gray-400 absolute right-2 text-sm hover:cursor-pointer'
                onClick={handleInputClear}
            />}
            {/* {(showResults && isFocused) && ( */}
            {(showResults) && (
                <div className='absolute top-11 left-0 w-full bg-white shadow'>
                    {loading ? <Spinner size='2' /> : !searchResults.length
                        ? <p>No search results for {searchTerm}</p> :
                        searchResults.map(user => (
                            <Link href={`/user/${user._id}`} key={user._id}>
                                <a>
                                    <UserSearchResult user={user} onClick={handleInputClear} />
                                </a>
                            </Link>
                        ))

                    }
                </div>
            )}
        </div>
    )
}

export default Searchbar
