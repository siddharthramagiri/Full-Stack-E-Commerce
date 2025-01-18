import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import {UserContextProvider} from "../Contexts/UserContext.js"

function Login() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/user/login", {email, password})
        setUser(response.data.user)
        setToken(response.data.token);
        console.log("response", response)
        console.log("token", response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        e.target.reset();
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            window.location.href = "/user";
    }

    return (
        <UserContextProvider value={{user, token}}>
            <div className="container m-10 justify-center items-center flex">
                <div className="w-1/3 my-10 bg-gray-200 p-10 ">
                    <h1 className="text-xl"> Login </h1>
                    <form
                        onSubmit={loginUser}
                    >
                        <div className="flex flex-col gap-4 m-5 mt-16">
                            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-gray-400 p-2"
                            />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                   className="border-2 border-gray-400 p-2"
                            />
                            <div className="flex justify-between">
                                <h1> Don't have an Account ? </h1>
                                <a href='/user/signup' className="font-bold underline"> Sign Up </a>
                            </div>
                            <button type="submit" className="bg-black text-white p-2 mt-16"> Login </button>
                        </div>
                    </form>
                </div>
            </div>
        </UserContextProvider>
    );
}

export default Login;