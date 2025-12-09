import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = (data) => {
    console.log("Before Register : ", data);
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log("After Register Succesfull : ", result.user);
      
        //from data imageBB
        const formData = new FormData();
        formData.append("image", profileImage);
        const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_Key
        }`;
        axios.post(image_Api_URL, formData).then((res) => {
          console.log("Image Upload Response ", res.data.data.display_url);
          //update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.display_url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User Profile update successfully");
              navigate(location.state || "/", { replace: true });
            })
            .catch((error) => {
              console.log("Error in Updating User profile: ", error.message);
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div class="card w-full max-w-sm shadow-2xl bg-white">
      <form onSubmit={handleSubmit(handleRegistration)} class="card-body">
        <h2 class="card-title text-2xl text-center mb-4">Register Now</h2>

        {/* Name field  */}
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your full name"
            class="input input-bordered w-full"
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>

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
              // pattern:
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/,
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
          {/* {errors.password?.type === "pattern" && (
            <span className="text-red-500">
              Password must be including uppercase,lowercase and special
              character.
            </span>
          )} */}
        </div>

        {/* image field  */}
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Profile Image</span>
          </label>
          <input
            {...register("photo", { required: true })}
            type="file"
            class="file-input file-input-bordered file-input-md w-full"
          />
          {errors.photo?.type === "required" && (
            <span className="text-red-500">Photo is required</span>
          )}
        </div>

        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary w-full">
            Register Account
          </button>
        </div>
        {/* Link to Registration */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              state={location.state}
              to="/login"
              className="link link-hover text-blue-600 font-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
