import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";

const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.dataTransfer.files),
      ]);
      e.dataTransfer.clearData();
    }
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
  };

  return (
    <div className="w-full h-[60vh] flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Drag and Drop
      </h2>
      <div
        className={`flex w-1/2 h-72 flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg transition-colors ${
          dragActive
            ? "bg-blue-100 border-blue-400"
            : "bg-gray-100 border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDragDrop}
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          id="file-upload"
        />

        <label htmlFor="file-upload" className="cursor-pointer text-center">
          <span
            className={`text-xl ${
              dragActive ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {dragActive
              ? "Drop it here.."
              : "Drag & Drop your files or click to upload"}
          </span>
        </label>

        <div className="mt-4 w-full">
          {files.length > 0 && (
            <div>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-4 border rounded-lg mb-2 bg-white shadow-md"
                >
                  <span className="text-gray-800 font-semibold">
                    {file.name}
                  </span>
                  <button onClick={() => handleDelete(index)}>
                    <FaTrash className="text-xl text-gray-800" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
