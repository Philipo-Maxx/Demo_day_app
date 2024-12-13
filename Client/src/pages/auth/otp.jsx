import React, { useState } from "react";
import { InputOTPForm } from "@/components/common/otpform";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const AuthVerifyEmail = () => {
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyEmail(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        sessionStorage.clear();
        toast({
          title: "logged In Successfully",
        });
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
          Verify your Email with your one-time password
        </h1>
        <p className="mt-2 text-white font-body">
          Did not recieve OTP? Click
          <Link
            className="text-primary ml-2 font-extrabold text-white hover:underline"
            to="/auth/register"
          >
            <span className="hover:text-yellow-400 transition ease-in duration-100">
              Here to Resend
            </span>
          </Link>
        </p>
      </div>

      <div className="">
        <InputOTPForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          otpText={"Verify Email"}
        />
      </div>
    </div>
  );
};

export default AuthVerifyEmail;
