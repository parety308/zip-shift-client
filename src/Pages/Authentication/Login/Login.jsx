import React, { useRef } from 'react';
import Logo from '../../../component/Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router';
import authImage from '../../../assets/authImage.png'
import useAuth from '../../../hooks/useAuth/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import Swal from 'sweetalert2';
const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { signInUser, user, setUser, forgetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = watch("email");
    const handleLogIn = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUser(res.user);
                navigate(location?.state || '/');

            })
            .catch(err => {
                console.log(err);
            });

    }
    const handleForgetPassword = () => {
        // console.log(email);
        forgetPassword(email)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Please Check Your Email",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className='m-4'> <Logo /></div>
            <div className='w-10/12 mx-auto lg:flex md:flex md:justify-between md:items-center  lg:justify-between lg:items-center'>
                <div className='w-100 flex flex-col justify-center bg-base-100 shadow-sm  p-4 my-10'>
                    <h1 className="text-5xl font-bold">Wellcome Back</h1>
                    <p>Login with ZapShift</p>
                    <form onSubmit={handleSubmit(handleLogIn)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email" {...register('email', { required: true })}
                                className="input"
                                placeholder="Email" />
                            {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true })} className="input" placeholder="Password" />
                            {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
                            <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn bg-lime-300 mt-4">Login</button>
                            <div><SocialLogIn /></div>
                        </fieldset>
                    </form>
                    <Link
                        state={location.state}
                        to='/auth/signup' className='link link-hover text-center text-blue-400'>Have no account ,go to signup</Link>
                </div>
                <div>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </>
    );
};

export default Login;