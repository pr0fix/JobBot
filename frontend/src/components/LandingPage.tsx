import { useState } from "react";
import analysisService from "../services/analysisService";
import AnalysisForm from "./AnalysisForm";
import UploadStatus from "./UploadStatusIndicator";
import Header from "./Header";
import UploadButton from "./UploadButton";
import { FormDataState } from "../utils/types";
import { useNavigate } from "react-router";

type UploadStatusType = "idle" | "uploading" | "success" | "error";

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
    jobDescription: "",
    file: null,
  });
  const [status, setStatus] = useState<UploadStatusType>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    if (!formData.file && !formData.jobDescription) return;

    setStatus("uploading");
    setUploadProgress(0);

    const submitData = new FormData();
    submitData.append("jobDescription", formData.jobDescription);

    if (formData.file) submitData.append("file", formData.file);

    try {
      const response = await analysisService.sendAnalysis(
        submitData,
        setUploadProgress
      );
      setStatus("success");
      setUploadProgress(100);
      navigate("/result", {
        state: { application: response.tailoredApplication },
      });
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
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4 sm:p-6 md:p-8 mt-20">
        <Header />
        <AnalysisForm formData={formData} setFormData={setFormData} />
        <div className="flex flex-col items-center mt-8">
          {formData.file &&
            formData.jobDescription &&
            status !== "uploading" && (
              <UploadButton handleSubmit={handleSubmit} />
            )}
          <UploadStatus status={status} uploadProgress={uploadProgress} />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
