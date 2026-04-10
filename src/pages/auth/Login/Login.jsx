import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onBlur" });
  const [showPassword, setShowPassword] = useState(false);
  const {signInUser} = useAuth()

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = (data) => {
    console.log("Login data:", data);
    signInUser(data.email,data.password)
    .then(res=>alert('login successful'))
    .catch(error=>console.log(error))
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-base-300 p-8 rounded-3xl shadow-2xl border border-base-200 dark:border-base-500">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Welcome to Shifto</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-12"
              {...register("password", {
                required: "Password is required",
                pattern: { value: passwordRegex, message: "Password must be 8+ chars with uppercase, lowercase, number & special char" }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-2xl transition disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Forgot your password? <a href="#" className="text-primary hover:underline">Reset</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;