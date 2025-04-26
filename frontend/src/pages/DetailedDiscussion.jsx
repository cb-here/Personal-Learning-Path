import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { getDiscussionById, postComment } from "../../services/api";
import { useParams } from "react-router-dom";
import { User, Calendar, MessageCircle} from 'lucide-react';
import { toast } from "react-toastify";
import { useState } from "react";


function DetailedDiscussion() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        content: ''
    })
    const  queryClient = useQueryClient()

    const { data: discussion, isPending, isError, error } = useQuery({
        queryKey: ['discussion', id],
        queryFn: () => getDiscussionById(id),
    });

    const mutation = useMutation({
        mutationFn: (data) => postComment(data.formData, data.id),
        onSuccess: () => {
            toast.success("Comment Posted!")
            queryClient.invalidateQueries()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate({formData, id})
        setFormData({
            content: ''
        })
    }
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
        <div className="bg-gray-900 text-white p-8 relative">
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold mb-4">
                    {discussion?.title}
                </h1>
                <div className="flex items-center space-x-6 text-gray-400 mb-8">
                    <div className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        <span>{discussion.user?.username ? discussion.user.username : 'Anon'}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{new Date(discussion?.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-gray-300">
                        {discussion?.content}
                    </p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3  mb-6">
                    <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        <span>{discussion?.comments.length || 0} Comments</span>
                    </div>
                </div>
                <div className="relative w-full">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full border border-gray-400 rounded-lg p-3 outline-none bg-gray-700
               text-white placeholder-gray-400 focus:border-green-400 focus:ring-1
               focus:ring-green-400 resize-y min-h-[100px] pr-16"
                            placeholder="Write your comment..."
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                        <button className="absolute bottom-2 right-2 bg-green-400 hover:bg-green-500 text-gray-800 
                     font-medium rounded-lg px-4 py-1 transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                            Comment
                        </button>
                    </form>
                </div>
                <div>
                    {
                        discussion.comments?.length === 0 ? (
                            <div className="mt-3">
                                <p className="italic">Not Commented yet!</p>
                            </div>
                        ) : (
                            discussion?.comments.map((comment) => (
                                <div className="border-b mb-3 p-2" key={comment._id}>
                                    <h1>{comment?.user?.username || 'Anon'}</h1>
                                    <p>{comment?.content}</p>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailedDiscussion;