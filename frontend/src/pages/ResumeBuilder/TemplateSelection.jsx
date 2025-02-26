import React, { useState } from "react";
import TemplateCard from "../../components/resume/TemplateCard";
import UploadTemplate from "../../components/resume/UploadTemplate";

// Sample template data with explicit type property
const defaultTemplates = [
  {
    id: 1,
    name: "Professional",
    type: "professional",
    thumbnail: "",
  },
  {
    id: 2,
    name: "Creative",
    type: "creative",
    thumbnail: "/templates/creative-thumb.jpg",
  },
  {
    id: 3,
    name: "Modern",
    type: "modern",
    thumbnail: "/templates/modern-thumb.jpg",
  },
  {
    id: 4,
    name: "Simple",
    type: "simple",
    thumbnail: "/templates/simple-thumb.jpg",
  },
];

const TemplateSelection = ({ onSelectTemplate, onUploadTemplate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Select a Resume Template</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Upload Your Own Template</h3>
        <UploadTemplate onUpload={onUploadTemplate} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          Or Choose from Our Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
