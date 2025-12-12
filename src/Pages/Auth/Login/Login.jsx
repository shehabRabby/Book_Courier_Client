import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const accentColor = "#ff0077"; // Consistent brand accent

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
    const loginToast = toast.loading("Verifying credentials...");
    
    try {
      await signInUser(data.email, data.password);
      toast.success("Welcome back!", { id: loginToast });
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Check your email/password.", { id: loginToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      toast.success("Signed in with Google!");
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
        
        {/* Top Accent Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: accentColor }}></div>

        <div className="p-8">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-black text-base-content">Welcome Back</h2>
            <p className="text-sm opacity-60 mt-2 font-medium">Access your librarian dashboard</p>
          </header>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                placeholder="librarian@library.com"
                className={`input input-bordered w-full focus:outline-none focus:border-[${accentColor}] ${errors.email ? 'border-error' : ''}`}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1 font-medium">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase opacity-70 flex items-center gap-2">
                  <FaLock /> Password
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
                  className={`input input-bordered w-full pr-10 focus:outline-none focus:border-[${accentColor}] ${errors.password ? 'border-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1 font-medium">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn text-white border-none shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
              </button>
            </div>
          </form>

          <div className="divider text-[10px] font-bold opacity-30 my-8">SECURE SOCIAL LOGIN</div>

          {/* Social Login Button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-outline w-full gap-3 hover:bg-base-200 transition-all normal-case"
          >
            <FaGoogle className="text-error" />
            Continue with Google
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm opacity-70">
              New to the system?
              <Link
                state={location.state}
                to="/register"
                className="font-bold ml-2 hover:underline"
                style={{ color: accentColor }}
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