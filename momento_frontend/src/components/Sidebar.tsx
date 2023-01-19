import React from 'react';
import {NavLink, Link} from "react-router-dom";
import {RiHomeFill} from "react-icons/ri";
import {IoIosArrowForward} from "react-icons/io";

import logo from "../assets/Logo.svg"
import {docType} from "../types/docType";

const isNotActiveStyle: string = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle: string = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

type category = {
    name: string
}

const categories: category[] = [
    {
        name: 'Animals'
    },
    {
        name: 'Coding'
    },
    {
        name: 'Lovely'
    },
    {
        name: 'Islamic'
    }
]

function Sidebar({user , closeToggle} : {user: docType | null, closeToggle: any}) {
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }
    return (
        <div>
            <div className={"flex flex-col h-screen justify-between bg-white overflow-y-scroll min-w-210 hide-scrollbar"}>
                <div className={"flex flex-col"}>
                    <Link to={"/"} className={"flex px-5 gap-2 my-6 pt-2 w-190 items-center"}>
                        <img src={logo} alt={"logo"} className={"w-16"} onClick={handleCloseSidebar} />
                    </Link>
                    <div className={"flex flex-col gap-5"}>
                        <NavLink to={"/"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
                            <RiHomeFill /> Home
                        </NavLink>
                        <h3 className={"mt-2 px-5 text-base 2xl:text-xl"}>
                            Discover Categories
                        </h3>
                        {categories.slice(0, categories.length - 1).map((category) => (
                            <NavLink to={`/category/${category.name}`} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar} key={category.name}>
                                {category.name}
                            </NavLink>
                        )) }
                    </div>
                </div>
                {
                    user && (
                        <Link to={`user-profile/${user._id}`} className={"flex m-5 mb-3 gap-2 items-center shadow-lg mx-3 bg-white rounded-lg p-2"} onClick={handleCloseSidebar}>
                            <img src={user.image} className={"w-10 h-10 rounded-full"} alt={"user-profile"} /> <p> {user.userName} </p>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default Sidebar;