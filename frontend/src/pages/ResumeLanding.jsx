// src/pages/ResumeLanding.jsx
import React from "react";
import { Link } from "react-router-dom";

const ResumeLanding = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
      
        <div className="flex flex-col lg:flex-row items-center justify-between m-10 gap-10 mb-20">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-blue-600">AI-Powered</span> Resume
              <br />
              Building Made Simple
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Create professional resumes without the hassle of login or
              sign-up. Input your details, generate a well-formatted resume, and
              export it in A4 PDF format.
            </p>
            <div className="flex gap-4">
              <Link
                to="/resume/builder/*"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                Create My Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
             
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/resume-pic.avif"
              alt="Resume Preview"
              className="w-full shadow-2xl rounded-lg border border-slate-200"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x800?text=Resume+Preview";
              }}
            />
          </div>
        </div>

        <div className="text-center text-slate-600 mt-10">
          <p>Trusted by students from 100+ universities</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeLanding;
