import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { signup, isPending } = useSignUp();

  return (
    <div className="bg-white rounded-2xl shadow-xl sm:p-6 p-4 border border-green-100 max-w-md mx-auto">
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 text-gray-500 hover:text-gray-700"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsSignup(true)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            isSignup
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          SignUp
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mt-2 sm:text-base text-sm">
          Join Diet Craft to start your nutrition journey
        </p>
      </div>

      <form onSubmit={handleSubmit(signup)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Your first name"
              {...register("firstName", { required: "First Name is required" })}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } focus:ring-green-500 focus:border-green-500`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Your last name"
              {...register("lastName", { required: "Last Name is required" })}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } focus:ring-green-500 focus:border-green-500`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-green-500 focus:border-green-500`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Password cannot be longer than 20 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])[A-Za-z\d@]{8,}$/,
                message:
                  'Password must include at least 1 lowercase, 1 uppercase, 1 "@" and be at least 8 characters long',
              },
            })}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-green-500 focus:border-green-500`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-green-500 focus:border-green-500`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition flex items-center justify-center"
        >
          {isPending ? <SpinnerMini /> : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
