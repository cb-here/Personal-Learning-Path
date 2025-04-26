import { User, Mail, Settings, Book, Video, Heart, User2, LogOut } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userProfile } from '../../services/api';
import { ClimbingBoxLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { data: user, isPending, error, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userProfile,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  
  
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ClimbingBoxLoader color="#36d7b7" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-12">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-700">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <User2 className="w-24 h-24 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-2">{user?.username}</h1>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
            <User className="h-6 w-6 text-purple-400 mr-2" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3" />
              <p className="text-gray-300">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center space-x-8">
          <button
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition duration-300 shadow-lg"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;