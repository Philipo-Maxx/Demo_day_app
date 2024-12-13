import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link, useNavigate } from "react-router-dom";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: `${data?.payload?.message}`,
        });
      } else {
        if (data?.payload?.message.includes("not verified")) {
          const token = data?.payload?.token;
          console.log("token gen", token);
          sessionStorage.setItem("verificationToken", token);
          toast({
            title: "User Registered but not verified, OTP is resent",
            variant: "destructive",
          });
          navigate("/auth/verify-email");
        } else if (data?.payload?.message.includes("not exists")) {
          toast({
            title: `${data?.payload?.message}, please register`,
            variant: "destructive",
          });
          navigate("/auth/register");
        }
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-light text-yellow-400 font-body">
          Sign in to your account?
        </h1>
        <p className="mt-2 text-white font-body">
          Don't have an account?
          <Link
            className="text-primary ml-2 font-extrabold text-white hover:underline"
            to="/auth/register"
          >
            <span className="hover:text-yellow-400 transition ease-in duration-100">
              Register
            </span>
          </Link>
        </p>
      </div>

      <div className="">
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"login up"}
          onSubmit={onSubmit}
        />
        {/* <LoginForm formData={formData}/> */}
      </div>
    </div>
  );
};

export default AuthLogin;
