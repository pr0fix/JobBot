import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormDataState } from "../utils/types";

interface AnalysisFormProps {
  formData: FormDataState;
  setFormData: Dispatch<
    SetStateAction<{
      jobDescription: string;
      file: File | null;
    }>
  >;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type AllowedFileTypes =
  | "application/pdf"
  | "text/plain"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const allowedFileTypes: AllowedFileTypes[] = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const AnalysisForm = ({ formData, setFormData }: AnalysisFormProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFormData((prev) => ({ ...prev, file: null }));
      return;
    }

    if (!allowedFileTypes.includes(selectedFile.type as AllowedFileTypes)) {
      setFormData((prev) => ({ ...prev, file: null }));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFormData((prev) => ({ ...prev, file: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  return (
    <div className="flex-grow flex flex-col items-center w-full max-w-4xl mx-auto mt-8">
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 h-96 "
        encType="multipart/form-data"
      >
        <div className="w-full mt-4">
          <label
            htmlFor="message"
            className="block mb-2 ml-1 text-sm font-medium text-gray-700"
          >
            Job Ad Text
          </label>
          <textarea
            id="message"
            className="w-full h-full p-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
            placeholder="Paste the job post here..."
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                jobDescription: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="upload"
            className="block mb-2 ml-1 text-sm font-medium text-gray-700"
          >
            Upload your application (.pdf, .docx, .txt)
          </label>
          <div className="flex items-center justify-center w-full h-full">
            <label
              htmlFor="upload"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  & drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, TXT, DOC, or DOCX (MAX. 10MB)
                </p>
              </div>
              <input
                id="upload"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnalysisForm;
