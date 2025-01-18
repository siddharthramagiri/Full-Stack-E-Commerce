import React, {useEffect, useState} from 'react';
import axios from "axios";
import {UserContextProvider} from "../Contexts/UserContext.js";

function Signup() {
    const [user, setUser] = useState(localStorage.getItem("user") || {});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("")

    const signUpUser = async (e) => {
        e.preventDefault();
        console.log("username", username, "password", password, "email", email, "phone", phone)
        const response = await axios.post("/api/user/signup", {username, email, password, phone})
        setUser(response.data)
        setToken(response.headers.authorization);
        console.log("response", response)
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("user", JSON.stringify(response.data));
        e.target.reset();
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            window.location.href = `/user/updatedetails/${response.data._id}`;
    }

    return (
        <UserContextProvider value={{user, token}}>
            <div className="container m-10 justify-center items-center flex">
                <div className="w-1/3 my-10 bg-gray-200 p-10 ">
                    <h1 className="text-xl"> Sign Up </h1>
                    <form
                        onSubmit={signUpUser}
                    >
                        <div className="flex flex-col gap-4 m-5 mt-16">
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                                   className="border-2 border-gray-400 p-2"
                            />
                            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}
                                   className="border-2 border-gray-400 p-2"
                            />
                            <input type="text" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)}
                                   className="border-2 border-gray-400 p-2" maxLength="10" minLength="10"
                            />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                   className="border-2 border-gray-400 p-2" maxLength="8" minLength="6"
                            />
                            <div className="flex justify-between">
                                <h1> Already have an Account ? </h1>
                                <a href='/user/login' className="font-bold underline"> Login </a>
                            </div>
                            <button type="submit" className="bg-black text-white p-2 mt-16"> Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </UserContextProvider>
    );
    ;
}

export default Signup;