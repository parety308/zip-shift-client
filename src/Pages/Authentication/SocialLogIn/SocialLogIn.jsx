import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';

const SocialLogIn = () => {
    const { signInGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(res => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login SuccessFully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                setUser(res.user);
                navigate(location?.state || '/');

                const userProfile = {
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL,
                };

                axiosSecure.post('/users', userProfile)
                    .then(res => {
                        console.log('user data has been stored', res.user);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1 className="text-xl text-center my-1">OR</h1>

            <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
                <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff" />
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </g>
                </svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogIn;
