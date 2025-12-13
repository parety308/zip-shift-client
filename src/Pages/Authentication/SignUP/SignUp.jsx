import Logo from '../../../component/Logo/Logo';
import { Link, useFormAction, useLocation, useNavigate } from 'react-router';
import authImage from '../../../assets/authImage.png'
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth/useAuth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import axios from 'axios';
import Swal from 'sweetalert2';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSignUp = (data) => {
        // console.log(data);
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
            .then(res => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const photoURLApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`
                axios.post(photoURLApi, formData)
                    .then(res => {
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Sign Up SuccessFully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                setUser(res.data.user);
                                navigate(location?.state || '/');

                            })
                            .catch(err => console.log(err));
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <div className='m-4'> <Logo /></div>
            <div className='w-10/12 mx-auto lg:flex md:flex  justify-between items-center'>
                <div className='w-100 flex flex-col justify-center bg-base-100 shadow-sm  p-4 my-10'>
                    <h1 className="text-4xl font-bold">Create an Account</h1>
                    <p>Sign Up with ZapShift</p>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })} className="input" placeholder=" Your Name" />

                            {
                                errors.name?.type === 'required' && <p className='text-red-500'>Please Type Valid Name</p>
                            }
                            <label className="label">Photo</label>
                            <input type='file' {...register('photo', { required: true })} className="file-input" placeholder=" Your Photo" />
                            {
                                errors.photo?.type === 'required' && <p className='text-red-500'>Please Choose  Valid Image</p>
                            }
                            <label className="label">Email</label>
                            <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
                            {
                                errors.email?.type === 'required' && <p className='text-red-500'>Please Type Valid Email</p>
                            }
                            <label className="label">Password</label>
                            <input type="password" {...register('password', {
                                required: true, minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{6,}$/
                            })} className="input" placeholder="Password" />
                            {
                                errors.password?.type === 'pattern' && <p className='text-red-500'>Pasword must have at least one uppercase,one lowercase,one number,one special character </p>
                            }
                            <button type='submit' className="btn bg-lime-300 mt-4">Sign Up</button>
                            <div><SocialLogIn /></div>
                        </fieldset>
                    </form>
                    <Link
                        state={location.state}
                        to='/auth/login' className='link link-hover text-center text-blue-500'>Already have an account ,go to log in</Link >
                </div>
                <div>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </>
    );
};

export default SignUp;