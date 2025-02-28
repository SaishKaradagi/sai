// src/components/resume/TemplateCard.jsx
import React from "react";
import { Button } from "../ui/button";

const TemplateCard = ({ template, onSelect }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-72 bg-gray-100 flex items-center justify-center">
        <img
          src={template.thumbnail}
          alt={`${template.name} template`}
          className="object-center w-full h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-template.jpg";
          }} 
        />

      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{template.name}</h3>
        <Button
          onClick={onSelect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Use This Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
