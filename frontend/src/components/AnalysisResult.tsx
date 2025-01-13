import { useLocation, useNavigate } from "react-router";

interface LocationState {
  application: string;
}

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { application } = location.state as LocationState;

  const paragraphs = application.split("\n").filter((p) => p.trim());

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-3/4 max-w-3xl border">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Tailored Application
        </h2>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Try again
      </button>
    </div>
  );
};

export default AnalysisResult;
