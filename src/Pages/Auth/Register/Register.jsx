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

  // Consistent Brand Colors
  const brandPrimary = "#6366f1";
  const brandDark = "#4f46e5";   

  const handleRegistration = async (data) => {
    setLoading(true);
    // Unique ID used to replace loading toast with success/error
    const toastId = toast.loading("Processing your registration...");
    const profileImage = data.photo[0];

    try {
      // 1. Firebase Registration
      await registerUser(data.email, data.password);

      // 2. Image Upload to ImgBB
      const imageData = await imageUpload(profileImage);
      const photoURL = imageData.data.display_url;

      // 3. Update Firebase Profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateUserProfile(userProfile);

      // Success Message - Clean and Bold
      toast.success("Account created! Welcome to the network.", { id: toastId });
      
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      
      // Error Message - Handling specific Firebase errors or generic ones
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak.";
      }

      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200 transition-colors duration-500">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-300">
        
        {/* Top Decorative Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>

        <div className="p-10">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-black text-base-content flex items-center justify-center gap-3 uppercase tracking-tighter">
              <FaUserPlus className="text-indigo-500" />
              Register
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mt-2 text-indigo-600">
              System Access Protocol
            </p>
          </header>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
            
            {/* Name Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <FaUser className="text-indigo-500 text-[10px]" /> Full Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all rounded-2xl font-bold text-sm"
              />
              {errors.name && <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.name.message}</span>}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <FaEnvelope className="text-indigo-500 text-[10px]" /> Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@example.com"
                className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all rounded-2xl font-bold text-sm"
              />
              {errors.email && <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <FaLock className="text-indigo-500 text-[10px]" /> Security Key
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" }
                })}
                placeholder="••••••••"
                className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all rounded-2xl font-bold text-sm"
              />
              {errors.password && <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.password.message}</span>}
            </div>

            {/* Image Upload Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <FaImage className="text-indigo-500 text-[10px]" /> Profile Identity
                </span>
              </label>
              <input
                type="file"
                {...register("photo", { required: "Identity photo required" })}
                className="file-input file-input-bordered w-full bg-base-200 focus:outline-none focus:border-indigo-500 rounded-2xl text-xs font-bold"
              />
              {errors.photo && <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.photo.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="form-control pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn h-14 text-white border-none shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all rounded-2xl uppercase tracking-[0.2em] font-black text-xs"
                style={{ backgroundColor: brandDark }}
              >
                {loading ? <span className="loading loading-spinner loading-sm"></span> : "Initialize Account"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center border-t border-base-300 pt-8">
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">
              Already verified?
              <Link
                state={location.state}
                to="/login"
                className="font-black ml-2 hover:text-indigo-400 transition-colors"
                style={{ color: brandPrimary }}
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