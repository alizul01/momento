import React from 'react';
import bgVideo from "../assets/bgvideologin.mp4"
import logo from "../assets/logo.svg"
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import {json, useNavigate} from "react-router-dom";
import {dataCredential} from "../types/dataCredential";
import {client} from "../client";

function Login() {
    const navigate = useNavigate();
    return (
        <div className={"flex items-center justify-start flex-col h-screen"}>
            <div className={"relative w-full h-full"}>
                <video
                    src={bgVideo}
                    typeof={"video/mp4"}
                    loop={true}
                    controls={false}
                    muted={true}
                    autoPlay={true}
                    className={"w-full h-full object-cover"}
                />
                <div
                    className={"absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay"}
                >
                    <div className={"p-5 flex flex-col justify-center items-center"}>
                        <img src={logo} className={"w-16"} alt={"logo"} />
                        <div className={"shadow-2xl"}>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    if (credentialResponse.credential != null) {
                                        const USER_CREDENTIAL: dataCredential = jwtDecode(credentialResponse.credential);
                                        console.log(USER_CREDENTIAL);
                                        const { name, picture, sub } = USER_CREDENTIAL;
                                        const doc = {
                                            _id: sub,
                                            _type: 'user',
                                            userName: name,
                                            image: picture
                                        }
                                        client.createIfNotExists(doc)
                                            .then(() => {
                                                navigate('/', {replace: true})
                                            })
                                        localStorage.setItem("USER_CREDENTIAL", JSON.stringify(USER_CREDENTIAL));
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;