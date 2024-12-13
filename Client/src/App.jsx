import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Test-Login";
import AuthRegister from "./pages/auth/test-register";
import AdminLayout from "./components/admin/layout";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminDashboard from "./pages/admin/dashboard";
import ShoppingLayout from "./components/shop/layout";
import PagesNotFound from "./pages/not-found/layout";
import ShoppingAccount from "./pages/shop/account";
import ShoppingCheckout from "./pages/shop/checkout";
import ShoppingHome from "./pages/shop/home";
import ShoppingListing from "./pages/shop/listing";
import AuthVerifyEmail from "./pages/auth/otp";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import SearchProducts from "./pages/shop/search";
import AdminFeatures from "./pages/admin/features";
// import { SkeletonDemo } from "./components/common/skeleton";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-[800] h-[600px] bg-[#080B28]" />
      </div>
    );

  console.log(isLoading, user);
  return (
    <div className="flex flex-col overflow-hidden bg-gray-300 font-body">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify-email" element={<AuthVerifyEmail />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="*" element={<PagesNotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
      <Toaster className="bg-green-400" />
    </div>
  );
};

export default App;
