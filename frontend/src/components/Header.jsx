import React, {useState} from 'react';
import {Link, NavLink} from "react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot, faUser, faMagnifyingGlass, faCaretDown} from '@fortawesome/free-solid-svg-icons'

function Header() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [dropDown, setDropDown] = useState(false);
    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }

    return (
        <>
            <header className="shadow sticky z-50 top-0">
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-1">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png"
                                className="mr-3 h-7"
                                alt="Logo"
                            />
                        </Link>
                        <div className="flex items-center lg:order-2">
                            <Link
                                to="/user"
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-2"/>
                                My Account
                            </Link>
                        </div>
                        <div
                            className="flex justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <div className="relative">
                                <button
                                    className={`bg-gray-200 text-black p-3 px-10`}
                                    onClick={toggleDropDown}
                                >
                                    Categories
                                    <FontAwesomeIcon icon={faCaretDown} className="mx-3" style={{color : "black"}}/>
                                </button>
                                {dropDown &&
                                    <Category />
                                }
                            </div>
                            <form className="flex">
                                <input
                                    className="bg-white border-2 border-gray-200 px-4 w-96"
                                    placeholder="Search Product"
                                    type="text"
                                />
                                <button className="p-3 bg-gray-200 w-fit text-white">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color : "black"}}/>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="justify-between items-center flex">
                            <Link to="/" className="flex items-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/640px-Jumpman_logo.svg.png"
                                    className="mr-3 h-6"
                                    alt="Logo"
                                />
                            </Link>
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={() =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:p-0 hover:border-b-1 hover:border-black transition-200`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={() =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:p-0 hover:border-b-1 hover:border-black transition-200`
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={() =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:p-0 hover:border-b-1 hover:border-black transition-200`
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={() =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:p-0 hover:border-b-1 hover:border-black transition-200`
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={() =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:p-0 hover:border-b-1 hover:border-black transition-200`
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="justify-end items-end px-16">
                            <h1 className="font-medium">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2"/>
                                {user? (user.country? user.country : "India") : "India"}
                            </h1>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

const categoriesList = ["Shoes", "Sliders", "Tops", "Accessories", "Air Force", "Sports"]

const Category = () => {
    return(
        <>
            <div className="absolute mt-2 w-48 bg-gray-200 text-black shadow-lg z-10 ">
                <ul>
                    {categoriesList.map((item) => (
                        <li key={item}>
                            <Link
                                to={`/category/${item}`}
                                className="block px-4 py-2 hover:bg-white hover:text-black duration-100"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Header;