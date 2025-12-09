import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();

  const handleLogin = (data) => {
    console.log("login data : ", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("After Login Succesfull : ", result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log("Google sign in Succesfully: ", result.user);
      })
      .catch((error) => {
        console.log("Google sign in error: ", error.message);
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        LogIn to Your Account
      </h2>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {/* Email Field  */}
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="email@example.com"
            class="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>

        {/* password field  */}
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              //  pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/
            })}
            placeholder="Must be at least 6 characters"
            class="input input-bordered w-full"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password must be 6 character or more
            </span>
          )}
          {/* {errors.password ?. type === "pattern" && <span className="text-red-500">Password must be including uppercase,lowercase and special character.</span>} */}
        </div>

        {/* Submit Button */}
        <div className="form-control pt-2">
          <button
            type="submit"
            className="btn btn-primary w-full transition duration-300"
          >
            Login
          </button>
        </div>
      </form>

      <div className="divider text-gray-400 my-8">OR CONTINUE WITH</div>

      {/* Social Login Button (Google) */}
      <div className="form-control">
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="btn btn-outline w-full bg-white border-gray-300 hover:bg-gray-50 transition duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083L42 20H24V28H36.444C35.204 31.849 31.789 34.613 24 34.613C16.593 34.613 10.597 28.618 10.597 21.211C10.597 13.805 16.593 7.809 24 7.809C27.994 7.809 31.579 9.38 34.116 11.758L39.027 6.847C34.793 2.871 29.28 0 24 0C10.745 0 0 10.745 0 24C0 37.255 10.745 48 24 48C37.255 48 48 37.255 48 24C48 22.146 47.828 20.317 47.502 18.513L43.611 20.083Z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.693L11.536 18.068C13.298 13.91 18.307 10.603 24 10.603C28.53 10.603 32.748 12.13 36.03 14.775L40.941 9.864C36.812 5.952 30.738 3.5 24 3.5C14.18 3.5 5.253 8.356 1.157 15.617L6.306 14.693Z"
            />
            <path
              fill="#4CAF50"
              d="M24 44.5C32.062 44.5 39.112 41.24 43.834 36.191L38.564 32.816C35.535 34.809 30.128 36.5 24 36.5C18.257 36.5 13.248 33.193 11.486 29.035L6.256 32.41C10.352 39.671 19.279 44.5 24 44.5Z"
            />
            <path
              fill="#1976D2"
              d="M47.502 18.513C47.01 21.282 46.126 24 44.887 26.718L40.096 23.343C40.69 21.902 41 20.354 41 18.75C41 18.528 40.975 18.307 40.941 18.086L45.852 14.99C47.081 16.035 47.781 17.228 47.502 18.513Z"
            />
          </svg>
          Sign In with Google
        </button>
      </div>

      {/* Link to Registration */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="link link-hover text-blue-600 font-semibold ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
