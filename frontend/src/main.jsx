import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router'
import User from "./Users/User.jsx";
import Login from "./Users/Login.jsx";
import SignUp from "./Users/SignUp.jsx";
import UpdateDetails from "./Users/UpdateDetails.jsx";
import Admin from "./Admin/Admin.jsx";
import ProductDetails from "./Product/ProductDetails.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Home />}/>
            <Route path="about" element={<About />}/>
            <Route path="user" element={<User />}/>
            <Route path="user/login" element={<Login />}/>
            <Route path="user/signup" element={<SignUp />}/>
            <Route path="user/updatedetails/:id" element={<UpdateDetails />}/>
            <Route path='/in/admin' element={<Admin />} />
            <Route path='/product/:id' element={<ProductDetails />}/>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)