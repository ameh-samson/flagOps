import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-4xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </p>
        <p className="text-lg text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
