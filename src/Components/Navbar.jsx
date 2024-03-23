import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar flex justify-around cursor-pointer items-center shadow-full p-3 h-full w-full font-semibold text-white bg-purple-600'>
            <div className="left-nav">
                <h1 className='text-xl font-bold'>Recipe App</h1>
            </div>
            <div className="middle-nav">
                <ul className='flex justify-center items-center'>
                    <Link to={"/"} className='p-2'>Home</Link>
                    <Link to={"/Recipe"} className='p-2'>Recipe</Link>
                    <Link to={"/"} className='p-2'>About</Link>
                    <Link to={"/"} className='p-2'>Contact</Link>
                </ul>
            </div>
            <div className="right-nav">
                <Link to={"/Login"}>
                    <button className='bg-blue-900 text-white py-2 px-8 text-center rounded-md'>Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar