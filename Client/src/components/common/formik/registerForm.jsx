import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const SignUpForm = ({ formData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dataLoading, setDataLoading] = useState(false);
  // Define validation schema
  const signUpSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Fullname cannot be less than 2 characters")
      .max(50, "Fullname cannot be more than 50 characters")
      .required("Fullname is required"),
    email: Yup.string().email().required("Email is required"),
    //gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters and include at least a letter and number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const signUpSubmitHandler = (values) => {
    console.log(values);
    console.log(typeof values);
    // setDataLoading(true);
    dispatch(registerUser(values)).then((data) => {
      console.log(data?.payload?.message);
      const token = data?.payload?.message;
      sessionStorage.setItem("verificationToken", token);
      if (data?.payload?.success) {
        //setDataLoading(false);
        toast({
          title: "Registration Successful",
          description: "Verify OTP",
        });
        navigate("/auth/verify-email");
      } else {
        //setDataLoading(false);
        toast({
          title: `${data?.payload?.message}`,
          variant: "destructive",
        });
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={signUpSubmitHandler}
        validationSchema={signUpSchema}
        validateOnChange={true}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-5 w-full">
            <h1 className="text-yellow-400 mx-auto">Sign up to continue</h1>
            <div className="flex flex-col space-y-1 ">
              <label
                htmlFor="userName"
                className="text-yellow-400 mb-1 tracking-wide font-extrabold"
              >
                Fullname
              </label>
              <Field
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter Full Name"
                className={`border rounded ${
                  errors.userName && touched.userName
                    ? "border-red-500 border-2"
                    : ""
                } ${
                  touched.userName && !errors.userName ? "border-[#61459E]" : ""
                } p-2`}
              />
              <ErrorMessage
                name="userName"
                component="p"
                className="text-red-500"
              />
            </div>
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
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-yellow-400 mb-1 tracking-wide font-extrabold"
              >
                Confirm password
              </label>
              <div className="relative">
                <Field
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  className={`border w-full rounded ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 border-2"
                      : ""
                  } ${
                    touched.confirmPassword && !errors.confirmPassword
                      ? "border-[#61459E]"
                      : ""
                  } p-2`}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="absolute top-3.5 right-2"
                    onClick={() => {
                      setShowConfirmPassword(false);
                    }}
                  />
                ) : (
                  <FaEye
                    className="absolute top-3.5 right-2"
                    onClick={() => {
                      setShowConfirmPassword(true);
                    }}
                  />
                )}
              </div>

              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col space-y-1 w-[50%]">
              <label
                htmlFor="role"
                className="text-yellow-400 mb-1 tracking-wide font-extrabold"
              >
                Select Role
              </label>
              <Field
                as="select"
                name="role"
                className="border w-full rounded p-2"
              >
                <option value="user">User</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
            </div>
            <button
              type="submit"
              className={` border-none rounded-sm  h-[50px]  w-full bg-white text-[#080B28] font-body text-lg font-extrabold hover:text-black transition ease-in duration-300 hover:bg-gradient-to-r from-yellow-400 to-white/5 focus:outline-none ring ring-yellow-300 hover:ring-0 `}
            >
              <span>
                {dataLoading ? (
                  <ClipLoader color="#61459E" size={30} />
                ) : (
                  "Sign up"
                )}
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
