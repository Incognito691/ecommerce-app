"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ILoginResponse } from "@/types/user";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserCircle } from "lucide-react";
import { useUserSignUpMutation } from "@/app/features/api/apiSlice";
import { Loader } from "../ui/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  userFirstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  userLastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  userEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  userPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Register = () => {
  const router = useRouter();
  const [userSignUp, { isLoading }] = useUserSignUpMutation();
  const [showDialog, setShowDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await userSignUp({
          firstName: values.userFirstName,
          lastName: values.userLastName,
          email: values.userEmail,
          password: values.userPassword,
        }).unwrap();

        if (response !== undefined && response.token) {
          const user: ILoginResponse = response;
          localStorage.setItem("token", user.token);
          router.push("/login");
        }
      } catch (error) {
        console.log(error || "Something Went Wrong");
        setShowDialog(true);
      }
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Create Account
            </h1>
            <p className="text-gray-400">
              Please fill in your details to sign up
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent className="bg-gray-800 border border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Invalid Credentials
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    Please check your credentials and try again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                    Close
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-blue-600 hover:bg-blue-500">
                    Try Again
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="userFirstName"
                  {...formik.getFieldProps("userFirstName")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                    formik.touched.userFirstName && formik.errors.userFirstName
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your first name"
                />
                <div>
                  {formik.touched.userFirstName &&
                    formik.errors.userFirstName && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.userFirstName}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Last Name
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="userLastName"
                  {...formik.getFieldProps("userLastName")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                    formik.touched.userLastName && formik.errors.userLastName
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your last name"
                />
                <div>
                  {formik.touched.userLastName &&
                    formik.errors.userLastName && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.userLastName}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="userEmail"
                  {...formik.getFieldProps("userEmail")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                    formik.touched.userEmail && formik.errors.userEmail
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="example00@gmail.com"
                />
                <div>
                  {formik.touched.userEmail && formik.errors.userEmail && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.userEmail}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  id="userPassword"
                  {...formik.getFieldProps("userPassword")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                    formik.touched.userPassword && formik.errors.userPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                <div>
                  {formik.touched.userPassword &&
                    formik.errors.userPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.userPassword}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 text-white font-semibold py-3.5 px-6 rounded-xl
                transform transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Create Account
            </button>

            <div className="mt-6 text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
