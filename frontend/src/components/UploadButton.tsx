interface UploadButtonProps {
  handleSubmit: () => Promise<void>;
}

const UploadButton = ({ handleSubmit }: UploadButtonProps) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      type="button"
    >
      Analyze
    </button>
  );
};

export default UploadButton;
