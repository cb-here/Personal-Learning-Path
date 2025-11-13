import { User, Mail, Book, Video, Target, Award, Calendar, LogOut, Edit } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { userProfile } from '../../services/api';
import { ClimbingBoxLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: user, isPending, error, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userProfile,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <ClimbingBoxLoader color="#9333ea" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-center">
          <p className="text-red-400 text-lg">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                <Edit className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user?.username}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4">
                <Mail className="w-4 h-4" />
                <p className="text-sm">{user?.email}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">Joined {new Date().getFullYear()}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-800 hover:bg-red-600 text-white rounded-xl transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-gray-500">Learning Paths</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-gray-500">Resources Saved</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-gray-500">Achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Skill Level
              </label>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <p className="text-white font-medium">{user?.level || 'Beginner'}</p>
              </div>
            </div>

            {/* Preferred Format */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Preferred Format
              </label>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <p className="text-white font-medium">{user?.preferredFormat || 'Video'}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Book className="w-4 h-4" />
                Interests
              </label>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <p className="text-white">{user?.interests || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2">
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;