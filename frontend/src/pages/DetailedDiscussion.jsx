import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { getDiscussionById, postComment } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { User, Calendar, MessageCircle, Tag, ArrowLeft, Send } from 'lucide-react';
import { toast } from "react-toastify";
import { useState } from "react";

function DetailedDiscussion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        content: ''
    });
    const queryClient = useQueryClient();

    const { data: discussion, isPending, isError, error } = useQuery({
        queryKey: ['discussion', id],
        queryFn: () => getDiscussionById(id),
    });

    const mutation = useMutation({
        mutationFn: (data) => postComment(data.formData, data.id),
        onSuccess: () => {
            toast.success("Comment posted successfully!");
            queryClient.invalidateQueries(['discussion', id]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to post comment");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.content.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
        mutation.mutate({ formData, id });
        setFormData({
            content: ''
        });
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
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/discuss')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Discussions</span>
                </button>

                {/* Discussion Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
                    {/* Tags */}
                    {discussion?.tags && (
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-4 h-4 text-purple-500" />
                            <span className="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30">
                                {discussion.tags}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {discussion?.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-purple-500" />
                            </div>
                            <span className="text-gray-300">{discussion.user?.username || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(discussion?.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion?.comments?.length || 0} {discussion?.comments?.length === 1 ? 'Comment' : 'Comments'}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {discussion?.content}
                        </p>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-purple-500" />
                        Comments ({discussion?.comments?.length || 0})
                    </h2>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="relative">
                            <textarea
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all resize-none"
                                placeholder="Share your thoughts..."
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="mt-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutation.isPending ? (
                                    'Posting...'
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Post Comment
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {discussion?.comments?.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                            </div>
                        ) : (
                            discussion?.comments?.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="h-5 w-5 text-purple-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-white">
                                                    {comment?.user?.username || 'Anonymous'}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(comment?.createdAt).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                {comment?.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedDiscussion;