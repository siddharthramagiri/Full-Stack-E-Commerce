import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import AddNewProduct from "./AddNewProduct.jsx";

function Admin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user.isAdmin;
    return (
        <>
            {isAdmin ?
                <div className="flex ">
                    <AddNewProduct />
                    <div>
                        <h1> Users Requests Shows here </h1>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center w-full h-screen">
                    <div className="justify-center">
                        <h1 className="text-3xl">Resticted Adminstrator Page</h1>
                    </div>
                </div>
            }
        </>
    );
}

export default Admin;
