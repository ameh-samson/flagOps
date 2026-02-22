import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
