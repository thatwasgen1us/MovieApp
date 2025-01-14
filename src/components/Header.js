import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png"
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contents/navigation";


const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split('%20')?.join(' ')
    const [searchInput, setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()


    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <header className="fixed top-0 z-40 w-full h-16 bg-black bg-opacity-50">
            <div className="container flex items-center h-full px-3 mx-auto">
                <Link to={"/"}>
                    <img src={logo} alt="logo" width={120} />
                </Link>

                <nav className="items-center hidden gap-1 ml-5 lg:flex">
                    {
                        navigation.map((nav) => {
                            return (
                                <div key={nav.label}>
                                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-50'}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className="flex items-center gap-5 ml-auto">

                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder="Search here..."
                            className="hidden px-4 py-1 bg-transparent border-none outline-none lg:block"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                    </form>

                    <button className="text-2xl text-white">
                        <IoSearchOutline />
                    </button>

                    <div className="w-8 h-8 overflow-hidden transition-all rounded-full cursor-pointer active:scale-50">
                        <img src={userIcon} width='w-full h-full' alt="icon" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
