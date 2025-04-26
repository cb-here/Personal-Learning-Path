import { useQuery } from "@tanstack/react-query";
import { fetchDiscussions } from "../../services/api";
import { ClimbingBoxLoader } from "react-spinners";
import { User, Calendar, Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";

function Discuss() {
    const { data: discussions, isPending, isError, error } = useQuery({
        queryKey: ['discussions'],
        queryFn: fetchDiscussions,
    });

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
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-white">
                Community Discussions
            </h1>
            <NavLink
                to="/discuss/create"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition duration-200 mb-4"
            >
                <Plus className="h-4 w-4" />
                Create
            </NavLink>

            {discussions?.length === 0 ? (
                <p className="text-center text-gray-400">No discussions available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {discussions?.map((discussion) => (
                        <div
                            key={discussion._id}
                            className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-700 transition-all duration-300"
                        >
                            <div>
                                <p>{discussion?.tags}</p>
                            </div>
                            <div className="flex items-center justify-between text-gray-400 text-xs mb-3">

                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    <span>{discussion.user?.username ? discussion.user.username : 'Anon'}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{new Date(discussion.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</span>
                                </div>
                            </div>
                            <NavLink to={`/discuss/${discussion._id}`} className="text-2xl font-semibold mb-3 hover:underline">
                                {discussion.title}
                            </NavLink>

                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                {discussion?.content.length > 100
                                    ? discussion?.content.substring(0, 100) + "..."
                                    : discussion?.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Discuss;
