interface AnalysisResultProps {
  application: string;
}

const AnalysisResult = ({ application }: AnalysisResultProps) => {
  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Application Analysis Result
      </h2>
      <p className="text-gray-600">{application}</p>
    </div>
  );
};

export default AnalysisResult;
