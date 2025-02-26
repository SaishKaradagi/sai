// src/pages/ResumeBuilder/ResumeBuilder.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateSelection from "./TemplateSelection";
import ResumeEditor from "./ResumeEditor";
import PreviewResume from "./PreviewResume";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  });

  // In ResumeBuilder.jsx, modify handleTemplateSelect
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem("selectedTemplate", template.type || "professional");
    setCurrentStep("edit");
  };

  const handleUploadTemplate = (templateFile) => {
    // Handle custom template upload
    setSelectedTemplate({ type: "custom", file: templateFile });
    setCurrentStep("edit");
  };

  const handleUpdateResumeData = (newData) => {
    setResumeData(newData);
  };

  const handlePreview = () => {
    setCurrentStep("preview");
  };

  const handleBack = () => {
    if (currentStep === "edit") setCurrentStep("templates");
    if (currentStep === "preview") setCurrentStep("edit");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 m-6 text-center">Resume Builder</h1>

      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === "templates" ||
              currentStep === "edit" ||
              currentStep === "preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            1
          </div>
          <div className="w-20 h-1 bg-gray-200">
            <div
              className={`h-full ${
                currentStep === "edit" || currentStep === "preview"
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }`}
            ></div>
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === "edit" || currentStep === "preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            2
          </div>
          <div className="w-20 h-1 bg-gray-200">
            <div
              className={`h-full ${
                currentStep === "preview" ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === "preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {currentStep === "templates" && (
        <TemplateSelection
          onSelectTemplate={handleTemplateSelect}
          onUploadTemplate={handleUploadTemplate}
        />
      )}

      {currentStep === "edit" && (
        <ResumeEditor
          template={selectedTemplate}
          resumeData={resumeData}
          onUpdateData={handleUpdateResumeData}
          onPreview={handlePreview}
          onBack={handleBack}
        />
      )}

      {currentStep === "preview" && (
        <PreviewResume
          template={selectedTemplate}
          resumeData={resumeData}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
