import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login, isPending } = useLogin();

  function handleLogin(data) {
    login(data, {
      onError: () => reset(),
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl sm:p-8 p-4 border border-green-100 max-w-md mx-auto mt-10">
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
              isLogin
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 text-gray-500 hover:text-gray-700"
          >
            SignUp
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mt-2 sm:text-base text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
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
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition flex items-center justify-center"
        >
          {isPending ? <SpinnerMini /> : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
