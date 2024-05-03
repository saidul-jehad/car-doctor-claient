import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.svg'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => console.error(error))
    }


    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>

        {
            user ? <li><NavLink to='/bookings'>My Bookings</NavLink></li> : <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/signUp'>Sign Up</NavLink></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 h-28 mb-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navItems
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end space-x-5">

                <button className="btn btn-outline btn-warning">Appointment</button>

                {user && <button className="btn btn-outline btn-warning" onClick={handleSignOut}>Log Out</button>
                }
            </div>
        </div >
    );
};

export default Navbar;