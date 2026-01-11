import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const brandPrimary = "#6366f1"; 
  const brandDark = "#4f46e5";   

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    setLoading(true);
    // Unique ID used to replace loading toast with success/error
    const toastId = toast.loading("Verifying credentials...");
    
    try {
      await signInUser(data.email, data.password);
      toast.success("Welcome back, Access Granted!", { id: toastId });
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      console.error(error);
      // Clean error message
      let errorMessage = "Authentication failed.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid credentials provided.";
      }
      
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const googleToast = toast.loading("Connecting to Google...");
    try {
      await signInGoogle();
      toast.success("Google Authentication Successful!", { id: googleToast });
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      toast.error("Google authentication failed.", { id: googleToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200 transition-colors duration-500">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-300">
        
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>

        <div className="p-10">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-black text-base-content uppercase tracking-tighter">Welcome Back</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mt-2 text-indigo-600">
              Authorized Personnel Only
            </p>
          </header>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                placeholder="librarian@library.com"
                className={`input input-bordered w-full rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${errors.email ? 'border-error' : 'border-base-300'}`}
              />
              {errors.email && (
                <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <FaLock className="text-indigo-500 text-[10px]" /> Access Code
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" }
                  })}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-12 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${errors.password ? 'border-error' : 'border-base-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 text-indigo-500 transition-opacity"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-[10px] mt-1 font-black uppercase tracking-tighter">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn h-14 text-white border-none shadow-xl shadow-indigo-500/20 rounded-2xl uppercase tracking-[0.2em] font-black text-xs hover:scale-[1.02] active:scale-95 transition-all"
                style={{ backgroundColor: brandDark }}
              >
                {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
              </button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="divider text-[10px] font-black opacity-30 my-10 tracking-[0.3em]">OR CONNECT WITH</div>

          {/* Social Login Button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-outline border-base-300 h-14 w-full gap-3 rounded-2xl hover:bg-base-200 transition-all font-black uppercase text-[10px] tracking-widest"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Google Identity
          </button>

          {/* Footer Link */}
          <div className="mt-10 text-center border-t border-base-300 pt-8">
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">
              New to the system?
              <Link
                state={location.state}
                to="/register"
                className="font-black ml-2 hover:text-indigo-400 transition-colors"
                style={{ color: brandPrimary }}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;