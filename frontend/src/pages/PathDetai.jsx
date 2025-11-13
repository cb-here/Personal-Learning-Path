import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getPath } from '../../services/path'
import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { ClimbingBoxLoader } from 'react-spinners'
import { ArrowLeft, Route, GitBranch, Target } from 'lucide-react'

const PathDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: pathData, isPending, isError, error } = useQuery({
        queryKey: ['path', id],
        queryFn: () => getPath(id),
        enabled: !!id
    })

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
        <div className="bg-gray-950 h-screen w-full flex flex-col py-12">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 px-4 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => navigate('/path')}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Paths</span>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                                <Route className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    {pathData?.title}
                                </h1>
                                {pathData?.description && (
                                    <p className="text-gray-400 text-sm mt-1">{pathData.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                                <GitBranch className="w-4 h-4 text-purple-500" />
                                <span className="text-sm text-gray-400">
                                    {pathData?.nodes?.length || 0} Steps
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                                <Target className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-400">In Progress</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flow Container */}
            <div className="flex-1 relative">
                <ReactFlow
                    nodes={pathData?.nodes}
                    edges={pathData?.edges}
                    zoomOnScroll={false}
                    paneOnScroll={true}
                    fitView
                    preventScrolling={false}
                    className="bg-gray-950 text-gray-950"
                    defaultEdgeOptions={{
                        animated: true,
                        style: { stroke: '#9333ea', strokeWidth: 2 }
                    }}
                >
                    <Background
                        variant="dots"
                        gap={16}
                        size={1}
                        color="#374151"
                    />
                    <Controls
                        className="bg-gray-800 border border-gray-700 rounded-lg"
                        style={{
                            button: {
                                backgroundColor: '#1f2937',
                                borderBottom: '1px solid #374151',
                                color: ''
                            }
                        }}
                    />
                </ReactFlow>

                {/* Info Box */}
                {pathData?.nodes?.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
                            <Route className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-400">No nodes in this path yet</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PathDetail