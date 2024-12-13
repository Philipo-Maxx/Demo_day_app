import React, { useState } from "react";
import { SignUpForm } from "@/components/common/formik/registerForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault();
    setDataLoading(true);
    dispatch(registerUser(formData)).then((data) => {
      console.log(data?.payload?.message);
      const token = data?.payload?.message;
      sessionStorage.setItem("verificationToken", token);
      if (data?.payload?.success) {
        toast({
          title: "Registration Successful",
          description: "Verify OTP",
        });
        navigate("/auth/verify-email");
      } else {
        toast({
          title: `${data?.payload?.message}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-light text-yellow-400 font-body">
          Create new account
        </h1>
        <p className="mt-2 text-white font-body">
          Already have an account?
          <Link
            className="text-primary ml-2 font-extrabold text-white hover:underline"
            to="/auth/login"
          >
            <span className="hover:text-yellow-400 transition ease-in duration-100">
              Login
            </span>
          </Link>
        </p>
      </div>

      <div className="">
        <SignUpForm formData={formData} />
        {/* <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"sign up"}
          onSubmit={onSubmit}
        /> */}
      </div>
    </div>
  );
};

export default AuthRegister;
