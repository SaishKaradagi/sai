// src/pages/SignUpPage.jsx
import { SignUp } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, FileText, MessageSquare } from "lucide-react";

const SignUpPage = () => {
  return (
    // <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
    //   {/* Left Section - Value Proposition */}
    //   <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 p-12 text-white justify-center">
    //     <div className="max-w-md mx-auto">
    //       <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg inline-block mb-8">
    //         <div className="bg-white text-blue-600 font-bold text-xl px-3 py-2 rounded-md">
    //           CareerAI
    //         </div>
    //       </div>

    //       <h2 className="text-3xl font-bold mb-6">
    //         Start your career journey today
    //       </h2>
    //       <p className="text-blue-100 mb-12">
    //         Join thousands of students who have discovered their ideal career
    //         path using our AI-powered platform.
    //       </p>

    //       <div className="space-y-6">
    //         <div className="flex items-start">
    //           <div className="bg-white/10 p-2 rounded-lg mr-4">
    //             <Briefcase className="h-6 w-6 text-blue-200" />
    //           </div>
    //           <div>
    //             <h3 className="font-medium mb-1">AI Career Matching</h3>
    //             <p className="text-sm text-blue-100">
    //               Get personalized career recommendations based on your skills
    //               and interests
    //             </p>
    //           </div>
    //         </div>

    //         <div className="flex items-start">
    //           <div className="bg-white/10 p-2 rounded-lg mr-4">
    //             <FileText className="h-6 w-6 text-blue-200" />
    //           </div>
    //           <div>
    //             <h3 className="font-medium mb-1">Smart Resume Builder</h3>
    //             <p className="text-sm text-blue-100">
    //               Create professional resumes with AI-powered suggestions
    //             </p>
    //           </div>
    //         </div>

    //         <div className="flex items-start">
    //           <div className="bg-white/10 p-2 rounded-lg mr-4">
    //             <MessageSquare className="h-6 w-6 text-blue-200" />
    //           </div>
    //           <div>
    //             <h3 className="font-medium mb-1">Interview Preparation</h3>
    //             <p className="text-sm text-blue-100">
    //               Practice with AI-powered mock interviews
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right Section - Sign Up Form */}
    //   <div className="w-full lg:w-1/2 flex flex-col p-6">
    //     <div className="mb-6 flex items-center justify-between">
    //       <Link
    //         to="/"
    //         className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
    //       >
    //         <ArrowLeft className="mr-2 h-4 w-4" />
    //         Back to home
    //       </Link>

    //       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-md lg:hidden">
    //         CareerAI
    //       </div>
    //     </div>

    //     <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
    //       <div className="mb-8 text-center">
    //         <h1 className="text-2xl font-bold text-gray-900">
    //           Create your account
    //         </h1>
    //         <p className="mt-2 text-gray-600">
    //           Join CareerAI PathFinder and start your journey
    //         </p>
    //       </div>

    //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    //         <SignUp
    //           path="/signup"
    //           routing="path"
    //           signInUrl="/signin"
    //           appearance={{
    //             elements: {
    //               formButtonPrimary:
    //                 "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
    //               card: "shadow-none",
    //               headerTitle: "hidden",
    //               headerSubtitle: "hidden",
    //               socialButtonsBlockButton:
    //                 "border border-gray-200 text-gray-600",
    //               socialButtonsBlockButtonText: "font-normal",
    //               dividerLine: "bg-gray-200",
    //               dividerText: "text-gray-400 text-xs",
    //               formFieldLabel: "text-gray-700",
    //               formFieldInput:
    //                 "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    //               footerActionLink: "text-blue-600 hover:text-blue-700",
    //             },
    //           }}
    //         />
    //       </div>

    //       <div className="mt-8 text-center text-sm text-gray-500">
    //         <p>
    //           By signing up, you agree to our{" "}
    //           <Link to="/terms" className="text-blue-600 hover:underline">
    //             Terms of Service
    //           </Link>{" "}
    //           and{" "}
    //           <Link to="/privacy" className="text-blue-600 hover:underline">
    //             Privacy Policy
    //           </Link>
    //           .
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      {/* Right Section - Sign Up Form */}
      <div className="w-full  flex flex-col p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-md lg:hidden">
            CareerAI
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Create your account
            </h1>
            <p className="mt-2 text-gray-600">
              Join CareerAI PathFinder and start your journey
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SignUp
              path="/signup"
              routing="path"
              signInUrl="/signin"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border border-gray-200 text-gray-600",
                  socialButtonsBlockButtonText: "font-normal",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-400 text-xs",
                  formFieldLabel: "text-gray-700",
                  formFieldInput:
                    "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                  footerActionLink: "text-blue-600 hover:text-blue-700",
                },
              }}
            />
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default SignUpPage;
