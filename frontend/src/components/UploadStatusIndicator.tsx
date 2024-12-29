interface UploadStatusProps {
  status: string;
  uploadProgress: number;
}

const UploadStatus = ({ status, uploadProgress }: UploadStatusProps) => {
  return (
    <>
      {status === "uploading" && (
        <div className="w-full max-w-md mb-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
      {status === "success" && (
        <p className="mt-4 text-sm font-medium text-green-600">
          Analysis complete!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Analysis failed. Please try again.
        </p>
      )}
    </>
  );
};

export default UploadStatus;
