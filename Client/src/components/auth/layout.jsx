import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="hidden lg:flex overflow-hidden relative w-1/2">
        {" "}
        <img
          src="/images/cart.jpg"
          alt="cart_image"
          className="object-cover w-full h-full"
        />
        <h1 class="absolute text-4xl font-bold text-slate-50">
          <span class="text-[#080B28] font-body text-7xl absolute top-10 left-32">
            Spark Haven
          </span>
        </h1>
      </div>
      <div class="w-1/2 flex flex-1 justify-center items-center bg-[#080B28] px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
