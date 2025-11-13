import React from 'react'
import { Sparkles, Plus, Route, Target, BookOpen, ArrowRight, Zap } from 'lucide-react'
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
            <div className="flex justify-center items-center min-h-screen bg-gray-950">
                <ClimbingBoxLoader color="#9333ea" size={20} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Error Loading Paths</h2>
                    <p className="text-red-400 text-lg">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                <Route className="w-10 h-10 text-purple-500" />
                                Learning Paths
                            </h1>
                            <p className="text-gray-400">
                                {paths?.length > 0
                                    ? `${paths.length} ${paths.length === 1 ? 'path' : 'paths'} in your journey`
                                    : "Start your personalized learning journey"}
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">{paths?.length || 0}</p>
                                <p className="text-sm text-gray-500">Total Paths</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">0</p>
                                <p className="text-sm text-gray-500">In Progress</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">0</p>
                                <p className="text-sm text-gray-500">Completed</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <NavLink
                            to="/path/generate-with-ai"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-600/50 font-medium"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Generate with AI</span>
                        </NavLink>
                        <NavLink
                            to="/path/generate-manually"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-700 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Manually</span>
                        </NavLink>
                    </div>
                </header>

                {/* Paths Grid */}
                <div className="mb-8">
                    {paths?.length === 0 ? (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                            <Route className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-white mb-2">No Learning Paths Yet</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Create your first learning path to start your journey. Use AI to generate a customized path or create one manually.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <NavLink
                                    to="/path/generate-with-ai"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-medium"
                                >
                                    <Zap className="w-5 h-5" />
                                    Generate with AI
                                </NavLink>
                                <NavLink
                                    to="/path/generate-manually"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-700 font-medium"
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Manually
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {paths?.map((path) => (
                                <NavLink
                                    key={path?._id}
                                    to={`/path/${path?._id}`}
                                    className="group bg-gray-900 border border-gray-800 hover:border-purple-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                                <Route className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                                            {path?.title}
                                        </h3>
                                        {path?.description && (
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {path.description}
                                            </p>
                                        )}
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Path