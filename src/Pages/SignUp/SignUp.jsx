
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';



const SignUp = () => {

    const { createUser } = useContext(AuthContext)

    const handleSignUp = event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, email, password)


        // create user 
        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
            })
            .catch(error => console.log(error))

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 md:w-1/2 ">
                    <img src={img} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-5">
                    <h1 className="text-2xl text-center font-bold">Sign Up now!</h1>

                    <form className="card-body" onSubmit={handleSignUp}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" placeholder="name" name='name' className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-outline">Sign Up</button>
                        </div>
                    </form>
                    <p className='text-center py-4'>Already Have an Account<Link to='/login' className='text-orange-500 font-semibold underline '>Login</Link></p>

                </div>
            </div>
        </div>
    );
};

export default SignUp;