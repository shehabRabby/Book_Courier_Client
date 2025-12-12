import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../Utiles";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaImage, FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const accentColor = "#ff0077"; // Brand accent

  const handleRegistration = async (data) => {
    setLoading(true);
    const regToast = toast.loading("Creating your account...");
    const profileImage = data.photo[0];

    try {
      // 1. Firebase Registration
      const result = await registerUser(data.email, data.password);

      // 2. Image Upload to ImgBB
      const imageData = await imageUpload(profileImage);
      const photoURL = imageData.data.display_url;

      // 3. Update Firebase Profile with Name and Photo
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateUserProfile(userProfile);

      toast.success("Account created successfully!", { id: regToast });
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Registration failed.", { id: regToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
        
        {/* Decorative Top Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: accentColor }}></div>

        <div className="p-8">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-black text-base-content flex items-center justify-center gap-3">
              <FaUserPlus style={{ color: accentColor }} />
              Register
            </h2>
            <p className="text-sm opacity-60 mt-2 font-medium italic">Join the librarian network</p>
          </header>

          

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            
            {/* Name Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase opacity-70 flex items-center gap-2">
                  <FaUser /> Full Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase opacity-70 flex items-center gap-2">
                  <FaEnvelope /> Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@company.com"
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase opacity-70 flex items-center gap-2">
                  <FaLock /> Password
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                placeholder="••••••••"
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Image Upload Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase opacity-70 flex items-center gap-2">
                  <FaImage /> Profile Photo
                </span>
              </label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered file-input-md w-full bg-base-200"
              />
              {errors.photo && <span className="text-error text-xs mt-1">{errors.photo.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="form-control pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn text-white border-none shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                {loading ? <span className="loading loading-spinner"></span> : "SignUp"}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-base-300 pt-6">
            <p className="text-sm opacity-70">
              Already have an account?
              <Link
                state={location.state}
                to="/login"
                className="font-bold ml-2 hover:underline"
                style={{ color: accentColor }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;