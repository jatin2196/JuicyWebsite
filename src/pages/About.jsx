export default function About() {
  return (
    <div className="py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          About JuicyWeb
        </h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Project Overview
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            JuicyWeb is a modern, secure React application built with
            industry-standard tools and best practices. All packages used are
            verified to have zero vulnerabilities and are actively maintained.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Tech Stack
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span>
                <strong>React:</strong> A JavaScript library for building user
                interfaces with components
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span>
                <strong>React Router:</strong> Declarative routing for React
                applications
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span>
                <strong>Tailwind CSS:</strong> Utility-first CSS framework for
                rapid development
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span>
                <strong>Vite:</strong> Next generation frontend build tool
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <p className="text-gray-700">
            <strong>Security Note:</strong> All dependencies have been audited
            and verified to be free of known vulnerabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
