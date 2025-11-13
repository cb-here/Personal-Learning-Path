import { useQuery } from "@tanstack/react-query";
import { fetchDiscussions } from "../../services/api";
import { ClimbingBoxLoader } from "react-spinners";
import {
  User,
  Calendar,
  Plus,
  MessageCircle,
  Tag,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components/ui/modal";
import CreateDiscussionForm from "../components/CreateDiscussionForm";

function Discuss() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: discussions,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });

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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <MessageCircle className="hidden sm:block w-10 h-10 text-purple-500" />
                Community Discussions
              </h1>
              <p className="text-gray-400">
                Share knowledge, ask questions, and learn together
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-600/50 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              Start Discussion
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {discussions?.length || 0}
                </p>
                <p className="text-sm text-gray-500">Total Discussions</p>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {discussions
                    ? new Set(discussions.map((d) => d.user?.username)).size
                    : 0}
                </p>
                <p className="text-sm text-gray-500">Active Members</p>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">100%</p>
                <p className="text-sm text-gray-500">Engagement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Discussions List */}
        {discussions?.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No discussions yet
            </h3>
            <p className="text-gray-400 mb-6">
              Be the first to start a discussion in the community!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              Start First Discussion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions?.map((discussion) => (
              <NavLink
                key={discussion._id}
                to={`/discuss/${discussion._id}`}
                className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition-all duration-300 group"
              >
                {/* Tags */}
                {discussion?.tags && (
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span className="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30">
                      {discussion.tags}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>{discussion.title}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                {/* Content Preview */}
                <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                  {discussion?.content.length > 150
                    ? discussion?.content.substring(0, 150) + "..."
                    : discussion?.content}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-gray-500 text-sm pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-gray-400">
                        {discussion.user?.username || "Anonymous"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(discussion.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Create Discussion Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-2xl m-2"
      >
        <CreateDiscussionForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Discuss;
