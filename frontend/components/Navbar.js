import Searchbar from './Searchbar'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import NavbarRight from './NavbarRight'

const Navbar = () => {
    const { token } = useSelector(state => state.auth)

    return (
        <div className='bg-white w-full h-14 shadow sticky top-0 z-10'>
            <div className='max-w-5xl px-5 h-full mx-auto flex items-center justify-between'>
                <Link href='/'>
                    <h3 className='font-bold text-2xl hover:cursor-pointer'>Instapic</h3>
                </Link>
                {token && (
                    <>
                        <Searchbar />
                        <NavbarRight />
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
