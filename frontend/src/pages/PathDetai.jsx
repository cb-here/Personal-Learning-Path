import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPath } from '../../services/path'
import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { ClimbingBoxLoader } from 'react-spinners'

const PathDetail = () => {
    const { id } = useParams()

    const { data: pathData, isPending, isError, error } = useQuery({
        queryKey: ['path', id],
        queryFn: () => getPath(id),
        enabled: !!id
    })

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
        <div className="bg-gray-700 h-screen w-full overflow-hidden">
            <h1 className="text-3xl text-white text-center">{pathData?.title.toUpperCase()}</h1>
                <ReactFlow 
                nodes={pathData?.nodes}
                edges={pathData?.edges}
                zoomOnScroll={false}
                paneOnScroll={true}
                fitView
                preventScrolling={false}
                >
                    <Background variant="dots" gap={12} size={1} />
                    <Controls />
                </ReactFlow>
        </div>
    )
}

export default PathDetail