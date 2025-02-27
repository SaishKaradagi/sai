import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { PaperclipIcon } from "lucide-react";

const FileUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      alert("Only PDF files are allowed");
      e.target.value = null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
      >
        <PaperclipIcon size={20} />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf"
      />
      {file && (
        <Button onClick={() => onUpload(file)}>Upload {file.name}</Button>
      )}
    </div>
  );
};

export default FileUploader;
