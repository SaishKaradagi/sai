// Updated version of the Home component with an improved design and a 'Sign In' button.
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Book,
  Award,
  Users,
  MessageSquare,
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-blue-600">AI-Powered</span> Career
                  Guidance For Your Future
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                  Discover your ideal career path, build professional resumes,
                  and prepare for interviews—all in one platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="hover:shadow-md">
                  Watch Demo
                </Button>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Trusted by students from 100+ universities
                </p>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-10 bg-white rounded-xl shadow-xl p-4 md:p-8">
                <img
                  src="landImg.jpg"
                  alt="Career guidance dashboard preview"
                  className="rounded-lg w-full h-80 object-cover "
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-blue-100 rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need For Your Career Journey
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              One platform, multiple tools to launch your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-8 transition-all hover:shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Award className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Career Matching
              </h3>
              <p className="text-gray-600">
                Get personalized career recommendations based on your unique
                skills, interests, and strengths.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-indigo-50 rounded-lg p-8 transition-all hover:shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <FileText className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Resume Builder
              </h3>
              <p className="text-gray-600">
                Create professional resumes with AI suggestions tailored to your
                target roles.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 rounded-lg p-8 transition-all hover:shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <MessageSquare className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Interview Preparation
              </h3>
              <p className="text-gray-600">
                Practice with AI-powered mock interviews and get instant
                feedback to improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who found their ideal career path using
            our AI-powered platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg"
            >
              Sign Up Free
            </Button>
            <Link to="/signin">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg"
              >
                Sign In
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
