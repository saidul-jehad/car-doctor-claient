import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import useAuth from '../../Hooks/useAuth';
// import { useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';
const Login = () => {

    // const { signInUser } = useContext(AuthContext)
    const { signInUser } = useAuth()

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        // loginUser
        signInUser(email, password)
            .then(result => console.log(result))
            .catch(error => console.error(error))

    }

    return (
        <div className="hero min-h-screen bg-base-200 my-12">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 md:w-1/2 ">
                    <img src={img} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-5">
                    <h1 className="text-2xl text-center font-bold">Login now!</h1>

                    <form className="card-body" onSubmit={handleLogin}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-outline">Login</button>
                        </div>
                    </form>
                    <p className='text-center py-4'>New to Car Doctors <Link to='/signUp' className='text-orange-500 font-semibold underline '>Sign Up</Link></p>

                </div>
            </div>
        </div>
    );
};

export default Login;