import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import ProtectedRoute from "./ProtectedRoute";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp> </SignUp>
            },
            {
                path: '/checkOut/:id',
                element: <CheckOut></CheckOut>,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: '/bookings',
                element: <ProtectedRoute> <Bookings></Bookings></ProtectedRoute>
            }
        ]
    },
]);

export default router

