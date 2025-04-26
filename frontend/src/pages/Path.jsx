import React from 'react'
import { LucidePenTool } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { getPaths } from '../../services/path'
import { useQuery } from '@tanstack/react-query'
import { ClimbingBoxLoader } from 'react-spinners'

const Path = () => {
    const { data: paths, isPending, error, isError } = useQuery({
        queryKey: ['paths'],
        queryFn: getPaths
    })

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <ClimbingBoxLoader color="#3B82F6" size={20} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-red-400 p-6">
                <h2 className="text-2xl font-bold mb-4">Error Loading Paths</h2>
                <p className="text-lg mb-6">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-700 px-4 py-8 sm:px-8 lg:px-16">
            <header className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Learning Paths</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {paths.length > 0 
                        ? "Your personalized learning journeys"
                        : "Create your first learning path to get started"}
                </p>
            </header>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <NavLink 
                    to="/path/generate-with-ai"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                    <LucidePenTool className="w-5 h-5" />
                    <span>Generate with AI</span>
                </NavLink>
                <NavLink 
                    to="/path/generate-manually"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-gray-500/20"
                >
                    <LucidePenTool className="w-5 h-5" />
                    <span>Create Manually</span>
                </NavLink>
            </div>

            <div className="mb-8">
                {paths?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                        <h2 className="text-xl text-gray-400 mb-2">No Paths Created Yet</h2>
                        <p className="text-gray-500 mb-6 text-center max-w-md">
                            Get started by generating a learning path with AI or create one manually
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paths.map((path) => (
                            <NavLink 
                                key={path._id} 
                                to={`/path/${path._id}`}
                                className=" bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                                            {path.title}
                                        </h3>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Path