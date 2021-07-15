import Meta from "./Meta"
import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <div className='flex flex-col bg-gray-100 min-h-screen'>
                <Navbar />
                <main className='flex-1 flex flex-col max-w-5xl w-full mx-auto min-h-screen'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout

