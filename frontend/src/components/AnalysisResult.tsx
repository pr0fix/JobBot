import { useLocation } from "react-router";

interface LocationState {
  application: string;
}

const AnalysisResult = () => {
  const location = useLocation();
  const { application } = location.state as LocationState;

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-1/2 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Application Analysis Result
        </h2>
        <p className="text-gray-600">{application}</p>
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
        Retry
      </button>
    </div>
  );
};

export default AnalysisResult;
