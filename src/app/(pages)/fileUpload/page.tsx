"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/zip") {
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setFile("");
      setErrorMessage("Please upload a valid ZIP file.");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Please select a valid ZIP file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("File uploaded successfully!");
      fetchFiles();
    } else {
      alert("Failed to upload file");
    }
  };

  const fetchFiles = async () => {
    const response = await fetch("/api/files");
    const filenames = await response.json();
    setFiles(filenames);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1>Upload a ZIP file</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='.zip' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((filename) => (
          <li key={filename}>
            <a href={`/uploads/${filename}`} download>
              {filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
