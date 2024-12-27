import { ChangeEvent, useState } from "react";
import { AllowedFileTypes } from "../utils/types";
import fileService from "../services/file";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [application, setApplication] = useState<string>("");

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

  const handleSubmit = async () => {
    if (!file && !jobDescription) return;

    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    if (file) formData.append("file", file);

    try {
      const response = await fileService.uploadFile(
        formData,
        setUploadProgress
      );
      console.log(response);
      setStatus("success");
      setUploadProgress(100);
      setApplication(response.tailoredApplication);
    } catch {
      setStatus("error");
      setUploadProgress(0);
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4">
      <h1 className="absolute top-0 mt-4 text-4xl">JobBot</h1>
      <div className="justify-center gap-8 h-1/2 w-full max-w-4xl">
        <form
          className="grid grid-cols-2 gap-8 h-full"
          encType="multipart/form-data"
        >
          <div className="w-full flex flex-col">
            <label htmlFor="message" className="block m-1 text-md font-medium">
              Job Ad Text
            </label>
            <textarea
              id="message"
              className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Paste the job post here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="upload" className="block m-1 text-md font-medium">
              Upload your application (.pdf, .docx, .txt)
            </label>
            <div className="flex flex-col items-center border-2 border-gray-300 rounded-md h-full justify-center p-4">
              <input
                id="upload"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                className="font-semibold rounded p-2"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center mt-4">
        {file && status !== "uploading" && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Analyze
          </button>
        )}
        {status === "uploading" && (
          <div className="space-y-2 w-96 mb-4">
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {uploadProgress}%
            </p>
          </div>
        )}
        {status === "success" && (
          <p className="mt-4 text-sm text-green-600">Analysis complete!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600">
            Analysis failed. Please try again.
          </p>
        )}
      </div>
      <div className="h-1/4 mt-4">
        <p>{application}</p>
      </div>
    </div>
  );
};

export default FileUploader;
