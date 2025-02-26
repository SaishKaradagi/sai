// src/pages/ResumeBuilder/ResumeEditor.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PersonalInfoForm } from "../../components/resume/ResumeForm";

// Additional form components
import { EducationForm } from "../../components/resume/EducationForm";
import { ExperienceForm } from "../../components/resume/ExperienceForm";
import { SkillsForm } from "../../components/resume/SkillsForm";
import { ProjectsForm } from "../../components/resume/ProjectsForm";
import { AchievementsForm } from "../../components/resume/AchievementsForm";

export default function ResumeEditor({ selectedTemplate }) {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    achievements: [],
  });

  const [activeSections, setActiveSections] = useState({
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    achievements: true,
  });

  const updateFormData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleToggleSection = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePreview = () => {
    // Save data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("activeSections", JSON.stringify(activeSections));
    navigate("/resume/preview");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your Resume</h1>

      <div className="flex justify-between items-center mb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white"  onClick={() => navigate("/resume/templates")}>
          Back to Templates
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePreview}>Preview Resume</Button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          {/* Personal Info - Always required */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <PersonalInfoForm
              formData={resumeData.personalInfo}
              updateFormData={updateFormData}
            />
          </div>

          {/* Education Section */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Education</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                // variant="ghost"
                onClick={() => handleToggleSection("education")}
              >
                {activeSections.education ? "Hide Section" : "Show Section"}
              </Button>
            </div>

            {activeSections.education && (
              <EducationForm
                educationList={resumeData.education}
                updateFormData={(data) => updateFormData("education", data)}
              />
            )}
          </div>

          {/* Experience Section */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Work Experience</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleToggleSection("experience")}
              >
                {activeSections.experience ? "Hide Section" : "Show Section"}
              </Button>
            </div>

            {activeSections.experience && (
              <ExperienceForm
                experienceList={resumeData.experience}
                updateFormData={(data) => updateFormData("experience", data)}
              />
            )}
          </div>

          {/* Skills Section */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Skills</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleToggleSection("skills")}
              >
                {activeSections.skills ? "Hide Section" : "Show Section"}
              </Button>
            </div>

            {activeSections.skills && (
              <SkillsForm
                skillsList={resumeData.skills}
                updateFormData={(data) => updateFormData("skills", data)}
              />
            )}
          </div>

          {/* Projects Section */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleToggleSection("projects")}
              >
                {activeSections.projects ? "Hide Section" : "Show Section"}
              </Button>
            </div>

            {activeSections.projects && (
              <ProjectsForm
                projectsList={resumeData.projects}
                updateFormData={(data) => updateFormData("projects", data)}
              />
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-white p-6 rounded-lg shadow hover:border-blue-600 border duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Achievements</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleToggleSection("achievements")}
              >
                {activeSections.achievements ? "Hide Section" : "Show Section"}
              </Button>
            </div>

            {activeSections.achievements && (
              <AchievementsForm
                achievementsList={resumeData.achievements}
                updateFormData={(data) => updateFormData("achievements", data)}
              />
            )}
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-6">
            <h2 className="text-xl font-bold mb-4">Selected Template</h2>
            <div className="aspect-w-8 aspect-h-11 bg-gray-100 rounded mb-4">
              <img
                src={
                  selectedTemplate?.previewUrl || "/placeholder-template.png"
                }
                alt="Template Preview"
                className="object-cover rounded"
              />
            </div>
            <p className="font-medium text-center mb-4">
              {selectedTemplate?.name || "Professional"} template selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
