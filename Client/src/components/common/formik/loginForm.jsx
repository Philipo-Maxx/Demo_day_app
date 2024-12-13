import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const LoginForm = ({ formData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Define validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    //gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters and include at least a letter and number"
      )
      .required("Password is required"),
  });

  const loginSubmitHandler = (values) => {
    console.log(values);
    console.log(typeof values);
    dispatch(loginUser(values)).then((data) => {
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
    <>
      <Formik
        initialValues={formData}
        onSubmit={loginSubmitHandler}
        validationSchema={loginSchema}
        validateOnChange={true}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-5 w-full">
            <h1 className="text-yellow-400 mx-auto">Sign in to continue</h1>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-yellow-400 mb-1 tracking-wide font-extrabold"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className={`border rounded ${
                  errors.email && touched.email ? "border-red-500 border-2" : ""
                } ${
                  touched.email && !errors.email ? "border-[#61459E]" : ""
                } p-2`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-yellow-400 mb-1 tracking-wide font-extrabold"
              >
                Password
              </label>
              <div className="relative ">
                <Field
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className={`border w-full rounded ${
                    errors.password && touched.password
                      ? "border-red-500 border-2"
                      : ""
                  } ${
                    touched.password && !errors.password
                      ? "border-[#61459E]"
                      : ""
                  } p-2`}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute top-3.5 right-2"
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <FaEye
                    className="absolute top-3.5 right-2"
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className={` border-none rounded-sm  h-[50px]  w-full bg-white text-[#080B28] font-body text-lg font-extrabold hover:text-black transition ease-in duration-300 hover:bg-gradient-to-r from-yellow-400 to-white/5 focus:outline-none ring ring-yellow-300 hover:ring-0 `}
            >
              <span>Sign in</span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
