import { ChangeEvent, useState } from "react";
import { AllowedFileTypes } from "../utils/types";
import fileService from "../services/file";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const allowedFileTypes: AllowedFileTypes[] = [
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedFileTypes.includes(selectedFile.type as AllowedFileTypes)) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fileService.uploadFile(formData, setUploadProgress);
      setStatus("success");
      setUploadProgress(100);
    } catch {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6 border border-gray-300 rounded-md shadow-lg bg-white">
      <p className="text-gray-700 text-lg mb-4">
        Upload your resume (.pdf, .docx, .txt)
      </p>

      <div className="border-2 border-gray-300 rounded-md p-4 mb-4">
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          className="font-semibold rounded p-2"
          onChange={handleFileChange}
        />
      </div>

      {status === "uploading" && (
        <div className="space-y-2 w-96 mb-4">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center">{uploadProgress}%</p>
        </div>
      )}

      {file && status !== "uploading" && (
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      )}

      {status === "success" && (
        <p className="mt-4 text-sm text-green-600">
          File uploaded successfully!
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Upload failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default FileUploader;
