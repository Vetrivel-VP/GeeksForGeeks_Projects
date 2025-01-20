import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="w-full md:w-[600px] border border-gray-100 shadow-md rounded-md p-4 space-y-4 text-center">
        <h2 className="text-3xl tracking-wider font-semibold text-gray-700">
          Welcome back
        </h2>
        <div className="w-full flex flex-col items-center justify-start gap-6">
          <input
            className="w-full h-16 rounded-md outline-none border p-2 px-8 text-lg font-semibold text-gray-600"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full h-16 rounded-md outline-none border p-2 px-8 text-lg font-semibold text-gray-600"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            className="p-3 bg-purple-500 rounded-md w-full md:w-32 text-white hover:bg-purple-600 hover:shadow-md transition"
          >
            Login
          </button>
        </div>

        <div className="flex items-center justify-center w-full gap-6 mt-12">
          <div className="w-full md:w-64 h-[1px] rounded-md bg-gray-200"></div>
          <p>or</p>
          <div className="w-full md:w-64 h-[1px] rounded-md bg-gray-200"></div>
        </div>

        <div
          className="w-full p-3 border bg-gray-50 flex items-center justify-center gap-2 group hover:bg-gray-100 cursor-pointer rounded-full hover:shadow-md transition-all"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-5 h-5" />
          <p className="text-lg font-semibold text-gray-600 group-hover:text-gray-800 ">
            Signin With Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
