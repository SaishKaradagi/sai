// src/pages/ResumeBuilder/PreviewResume.jsx
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import DownloadButton from "../../components/resume/DownloadButton";

// Import template components
import ProfessionalTemplate from "../../components/resume/templates/ProfessionalTemplate";
import CreativeTemplate from "../../components/resume/templates/CreativeTemplate";
import ModernTemplate from "../../components/resume/templates/ModernTemplate";

// export default function PreviewResume() {
//   const navigate = useNavigate();
//   const resumeRef = useRef(null);
//   const [resumeData, setResumeData] = useState(null);
//   const [activeSections, setActiveSections] = useState(null);
//   const [selectedTemplate, setSelectedTemplate] = useState("professional");

//   useEffect(() => {
//     // Load data from localStorage
//     const storedData = localStorage.getItem("resumeData");
//     const storedSections = localStorage.getItem("activeSections");
//     const storedTemplate = localStorage.getItem("selectedTemplate");

//     if (storedData) {
//       setResumeData(JSON.parse(storedData));
//     }

//     if (storedSections) {
//       setActiveSections(JSON.parse(storedSections));
//     }

//     if (storedTemplate) {
//       setSelectedTemplate(storedTemplate);
//     }
//   }, []);

//   const renderTemplate = () => {
//     // If data isn't loaded yet
//     if (!resumeData || !activeSections) return null;

//     // Filter out inactive sections
//     const filteredData = Object.keys(resumeData).reduce((acc, key) => {
//       if (activeSections[key]) {
//         acc[key] = resumeData[key];
//       }
//       return acc;
//     }, {});

//     // Render the appropriate template
//     switch (selectedTemplate) {
//       case "creative":
//         return <CreativeTemplate data={filteredData} />;
//       case "modern":
//         return <ModernTemplate data={filteredData} />;
//       case "professional":
//       default:
//         return <ProfessionalTemplate data={filteredData} />;
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Preview Your Resume</h1>

//       <div className="flex justify-between items-center mb-6">
//         <Button variant="outline" onClick={() => navigate("/resume/editor")}>
//           Back to Editor
//         </Button>
//         <DownloadButton resumeRef={resumeRef} />
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto">
//         <div
//           ref={resumeRef}
//           className="bg-white w-full aspect-[8.5/11] overflow-hidden"
//         >
//           {renderTemplate()}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PreviewResume({ template, resumeData, onBack }) {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [loadedData, setLoadedData] = useState(resumeData || null);
  const [activeSections, setActiveSections] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(
    template?.type || "professional"
  );

  useEffect(() => {
    // If props were provided, use them
    if (resumeData) {
      setLoadedData(resumeData);
    } else {
      // Otherwise fall back to localStorage
      const storedData = localStorage.getItem("resumeData");
      if (storedData) {
        setLoadedData(JSON.parse(storedData));
      }
    }

    // Load active sections
    const storedSections = localStorage.getItem("activeSections");
    if (storedSections) {
      setActiveSections(JSON.parse(storedSections));
    } else {
      // Default - all sections active
      setActiveSections({
        personalInfo: true,
        education: true,
        experience: true,
        skills: true,
        projects: true,
        achievements: true,
      });
    }

    // Set template based on props or localStorage
    if (template?.type) {
      setSelectedTemplate(template.type);
    } else {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
      }
    }
  }, [resumeData, template]);

  const renderTemplate = () => {
    // If data isn't loaded yet
    if (!loadedData || !activeSections) return null;

    // Filter out inactive sections
    const filteredData = Object.keys(loadedData).reduce((acc, key) => {
      if (activeSections[key]) {
        acc[key] = loadedData[key];
      }
      return acc;
    }, {});

    // Render the appropriate template
    switch (selectedTemplate) {
      case "creative":
        return <CreativeTemplate data={filteredData} />;
      case "modern":
        return <ModernTemplate data={filteredData} />;
      case "professional":
      default:
        return <ProfessionalTemplate data={filteredData} />;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl" >
      <h1 className="text-3xl font-bold mb-6 text-center">Preview Your Resume</h1>

      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={onBack || (() => navigate("/resume/editor"))}
        >
          Back to Editor
        </Button>
        <DownloadButton resumeRef={resumeRef} />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto">
        <div
          ref={resumeRef}
          className="bg-white w-full aspect-[8.5/11] overflow-hidden"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
