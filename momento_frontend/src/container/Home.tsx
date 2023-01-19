import React,  {useState, useEffect, useRef} from "react";
import {HiMenu} from "react-icons/hi";
import {AiFillCloseCircle} from "react-icons/ai";
import {Link, Route, Routes} from "react-router-dom";
import { UserProfile, Login, Sidebar } from "../components"
import {client} from "../client";
import logo from "../assets/logo.svg"
import Moments from "./Moments";
import {userQuery} from "../utils/data";
import {dataCredential} from "../types/dataCredential";
import {docType} from "../types/docType";

function Home() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user , setUser] = useState<docType | null>(null);
    const scrollRef: any = useRef(null);

    const userInfo: dataCredential = localStorage.getItem("USER_CREDENTIAL") !== 'undefined' ? JSON.parse(localStorage.getItem("USER_CREDENTIAL") as string) : localStorage.clear();

    useEffect(() => {
        return () => {
            const queries = userQuery(userInfo?.sub);
            client.fetch(queries)
                .then((data) => {
                    setUser(data[0]);
                })
        };
    }, []);

    useEffect(() => {
        return () => {
            scrollRef.current.scrollTo(0, 0);
        };
    }, []);



    return (
        <div className={"flex bg-purple-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out"}>
            <div className={"hidden md:flex h-screen flex-initial"}>
                <Sidebar user={user && user}  closeToggle={null}/>
            </div>
            <div className={"flex md:hidden flex-row"}>
                <div className={"p-2 w-full flex flex-row justify-between items-center shadow-md"}>
                    <HiMenu fontSize={36} className={"cursor-pointer"} onClick={() => setToggleSidebar(true)} />
                    <Link to={"/"}>
                        <img src={logo} className={"w-12 rounded-full"}/>
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} className={"w-12 rounded-full"}/>
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className={"fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in"}>
                        <div className={"absolute w-full flex justify-end items-center p-3"}>
                            <AiFillCloseCircle onClick={() => setToggleSidebar(false)} className={"cursor-pointer"} fontSize={24} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar}  />
                    </div>
                )}
            </div>
            <div className={"pb-2 flex-1 h-screen overflow-y-scroll"} ref={scrollRef}>
                <Routes>
                    <Route path={"/user-profile/:userId"} element={<UserProfile />} />
                    <Route path={"/"} element={<Moments user={user && user} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Home;