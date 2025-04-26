import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-white mb-8">Oops! Looks like you're lost.</p>
        <div className="mx-auto">
          <img
            src="ezgif.com-animated-gif-maker.gif"
            alt="Lost animation"
            className="w-96 h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-lg text-white mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Don't worry, let's get you back on track.
        </p>
        <NavLink
          to="/path"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Take Me Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;