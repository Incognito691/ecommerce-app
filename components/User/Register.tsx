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
import { api } from "@/lib/api";
import { ILoginResponse } from "@/types/user";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserCircle } from "lucide-react"; // Import icons

const Register = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const token = api.post("/auth/signup", {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
    });
    token
      .then((response) => {
        console.log(response.data);
        if (!!response.data) {
          const user: ILoginResponse = response.data;
          localStorage.setItem("token", user.token);
          router.push("/user/login");
        }
      })
      .catch((error) => {
        console.log(error?.response?.data?.error || "Somethig Went Wrong");
        setShowDialog(true);
      });
  };

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

          <form className="space-y-6">
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
                  value={userFirstName}
                  onChange={(event) => setUserFirstName(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  placeholder="Enter your first name"
                />
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
                  value={userLastName}
                  onChange={(event) => setUserLastName(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  placeholder="Enter your last name"
                />
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
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  placeholder="Enter your email"
                />
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
                  value={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
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
