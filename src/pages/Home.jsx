export default function Home() {
  return (
    <div className="py-12">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-8">
        <h2 className="text-4xl font-bold mb-4">Welcome to JuicyWeb</h2>
        <p className="text-lg mb-4">
          A modern React application built with React Router and Tailwind CSS
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2 text-gray-800">React Router</h3>
          <p className="text-gray-600">
            Client-side routing for seamless navigation between pages
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Tailwind CSS</h3>
          <p className="text-gray-600">
            Utility-first CSS framework for rapid UI development
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Vite</h3>
          <p className="text-gray-600">
            Next generation frontend tooling for lightning-fast development
          </p>
        </div>
      </div>
    </div>
  );
}
