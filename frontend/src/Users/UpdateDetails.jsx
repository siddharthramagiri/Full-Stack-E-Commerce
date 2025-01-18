import React, {useEffect, useState} from 'react';
import {UserContextProvider} from '../Contexts/UserContext.js';
import axios from "axios";
import {Link} from "react-router";


function UpdateDetails() {
    let user = JSON.parse(localStorage.getItem("user"))
    const [country, setCountry] = useState(user.country || "");
    const [city, setCity] = useState(user.city || "");
    const [address, setAddress] = useState(user.address || "");
    const [pincode, setPincode] = useState(user.pincode || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [username, setUsername] = useState(user.username || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        setUsername(user.username);
    }, [user.username])

    // const {country, city, address, pincode, phone};
    const updateDetails = async (e) => {
        e.preventDefault();
        console.log({
            country, city, address, pincode, phone
        })
        try {
            const response = await axios.put(`/api/user/updatedetails/${user._id}`,
                {country, city, address, pincode, phone},
                {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
            console.log(response);
            user = {...user, country, city, address, pincode, phone}
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/user";
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContextProvider value={{user, token}}>
            <div className="container m-10 justify-center items-center flex">
                <div className="w-full m-36 my-5 bg-gray-200 p-10 ">
                    <h1 className="text-3xl"> Update Details of {username} </h1>
                    <form
                        onSubmit={updateDetails}
                    >
                        <div className="flex flex-row gap-4 mt-16 mx-20">
                            <div className="grid gap-4 m-5 w-1/3">
                                <select className="border-2 border-gray-400 p-2"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}>
                                    <option value="" disabled> Select a Country </option>
                                    {
                                        Countries.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <input type="text" placeholder="City" value={city}
                                       onChange={(e) => setCity(e.target.value)}
                                       className="border-2 border-gray-400 p-2"
                                />
                                <input type="text" placeholder="Pin Code" value={pincode}
                                       onChange={(e) => setPincode(e.target.value)} maxLength="6" minLength="6"
                                       className="border-2 border-gray-400 p-2"
                                />
                                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                                       className="border-2 border-gray-400 p-2" maxLength="10" minLength="10"
                                />
                            </div>
                            <div className="flex gap-4 m-5">
                                <textarea className="border-2 border-gray-400 p-2 w-96"
                                          placeholder="Address"
                                          value={address}
                                          onChange={(e) => setAddress(e.target.value)}>
                                    {address}
                                </textarea>
                            </div>
                        </div>
                            <button type="submit" className="bg-black text-white p-2 mt-16"> Update </button>
                    </form>
                </div>
            </div>
        </UserContextProvider>
    );
}

const Countries = ["India", "USA", "UK", "Canada", "Australia", "New Zealand", "Korea", "China", "Japan", "Russia", "France", "Germany", "Italy"]

export default UpdateDetails;