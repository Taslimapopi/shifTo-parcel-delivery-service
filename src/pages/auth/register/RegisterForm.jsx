import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ mode: "onBlur" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { registerUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const password = watch("password");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegister = (data) => {
    console.log("Register data:", data);
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res);

        // upload image on Imgbb

        const imageFile = data.profileImage[0];

        const formData = new FormData();
        formData.append("image", imageFile);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
            formData,
          )
          .then((res) => {
            const img_url = res.data.data.url;

            // update User

            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: img_url,
            };

            updateUser(userInfo)
              .then(() => {
                console.log("userprofile updated");
              })
              .catch((error) => console.log(error.message));
          });
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-base-300 p-8 rounded-3xl shadow-2xl border border-base-200 dark:border-base-500">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Welcome to Shifto
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl border-2 border-base-300 dark:border-base-500 overflow-hidden mb-3 bg-base-100 dark:bg-base-200">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
                No photo
              </div>
            )}
          </div>
          <label className="cursor-pointer text-primary font-medium text-sm hover:underline">
            Upload profile photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImage", {
                required: "Profile image is required",
                onChange: handleImageChange,
                validate: {
                  fileSize: (file) =>
                    (file && file[0] && file[0].size <= 2 * 1024 * 1024) ||
                    "Image must be under 2MB",
                  fileType: (file) =>
                    (file &&
                      file[0] &&
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        file[0].type,
                      )) ||
                    "Only JPG, PNG, WEBP allowed",
                },
              })}
            />
          </label>
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profileImage.message}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Gender
          </label>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: "Gender is required" })}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                {...register("gender", { required: "Gender is required" })}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-12"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be 8+ chars with uppercase, lowercase, number & special char",
                },
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full px-5 py-3.5 bg-white dark:bg-base-200 border border-base-300 dark:border-base-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-12"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-2xl transition disabled:opacity-70"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
