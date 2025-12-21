import Logo from '../../../component/Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router';
import authImage from '../../../assets/authImage.png';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth/useAuth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (data) => {
    try {
      // 1️⃣ Firebase create user
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append('image', data.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      );

      const photoURL = imgRes.data.data.url;

      // 3️⃣ Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL
      });

      // 4️⃣ Save user in backend database (PUBLIC axios)
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
        role: 'user',
        createdAt: new Date()
      };

      await axios.post('http://localhost:3000/users', userInfo);

      // 5️⃣ Success alert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sign Up Successful 🎉',
        showConfirmButton: false,
        timer: 1500
      });

      navigate(location?.state || '/');

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.message
      });
    }
  };

  return (
    <>
      <div className='m-4'>
        <Logo />
      </div>

      <div className='w-10/12 mx-auto lg:flex md:flex justify-between items-center'>
        <div className='bg-base-100 shadow-sm p-4 my-10'>
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p>Sign Up with ZapShift</p>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <fieldset className="fieldset">

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name && <p className='text-red-500'>Name is required</p>}

              {/* Photo */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register('photo', { required: true })}
                className="file-input"
              />
              {errors.photo && <p className='text-red-500'>Photo is required</p>}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && <p className='text-red-500'>Email is required</p>}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password && (
                <p className='text-red-500'>
                  Password must include uppercase, lowercase, number & special character
                </p>
              )}

              <button type="submit" className="btn bg-lime-300 mt-4">
                Sign Up
              </button>

              <SocialLogIn />
            </fieldset>
          </form>

          <Link
            state={location.state}
            to="/auth/login"
            className="text-blue-500 text-center block mt-3"
          >
            Already have an account? Login
          </Link>
        </div>

        <img src={authImage} alt="Auth" />
      </div>
    </>
  );
};

export default SignUp;
