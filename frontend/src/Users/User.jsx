import React, {useEffect, useState} from 'react';
import {UserContextProvider} from '../Contexts/UserContext.js';
import axios from "axios";

function User() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if(!user || !token) {
            window.location.href = "user/login";
        } else {
            console.log(user)
            console.log(token)
        }
    }, [user])

    const logOutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }

    const admin = (e) => {
        e.preventDefault();
        window.location.href = '/in/admin';
    }

    return (
        <UserContextProvider value={{token: localStorage.getItem("token")}}>
            <div className="m-10">
                <h1> Users Page </h1>
                <h1> {user.username} </h1>
                <div className="gap-6 ">
                    <button onClick={logOutUser}
                        className="bg-black text-white px-8 font-bold p-5 mt-16 ml-10 hover:bg-red-600">
                        Logout
                    </button>
                    <button onClick={() => window.location.href = `/user/updatedetails/${user._id}`}
                        className="bg-black text-white px-8 font-bold p-5 mt-16 ml-10 hover:bg-gray-600">
                        Update Details
                    </button>
                    {user.isAdmin ?
                        <button onClick={admin}
                            className="bg-black text-white px-8 font-bold p-5 mt-16 ml-10 hover:bg-gray-600"
                        > Admin </button>
                        : ""
                    }
                </div>
            </div>
        </UserContextProvider>
    );
}

export default User;