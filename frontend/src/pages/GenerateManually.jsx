import React, { useCallback, useState } from 'react'
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import {savePath} from '../../services/path'
import {useMutation} from '@tanstack/react-query'
import { toast } from 'react-toastify';

const GenerateManually = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [editLabel, setEditLabel] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [pathTitle, setPathTitle] = useState('');

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    );

    const generatePathData = ({ title, nodes, edges }) => {
        return {
          title,
          nodes: nodes?.map((node) => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: {
              label: node.data.label,
            },
            resources: node.resources || [],
          })),
          edges: edges?.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type || 'step',
            label: edge.label || '',
            animated: true
          })),
        };
      };
      

    const addNode = () => {
        const newNode = {
            id: uuidv4(),
            type: 'default',
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
            data: {
                label: `Step ${nodes.length + 1}`,
            },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const onNodeClick = (event, node) => {
        event.preventDefault()
        setSelectedNode(node)
        setEditLabel(node.data.label)
    }

    const updateNodeLabel = () => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === selectedNode.id ? { ...n, data: { ...n.data, label: editLabel } } : n
            )
        );
        setSelectedNode(null);
        setEditLabel('');
    };

    const deleteNode = () => {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
        setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
        setSelectedNode(null);
    };

    const mutation = useMutation({
        mutationFn: savePath,
        onSuccess: () => {
            toast.success("Path saved successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handlePathSave = async (e) => {
        const pathData = generatePathData({
            title: pathTitle,
            nodes, 
            edges
        })
        mutation.mutate(pathData)
        setShowSaveModal(false)
    }
    return (
        <div className="bg-gray-700 h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-around">
            <button
                onClick={addNode}
                className="bg-green-400 text-white p-2 rounded"
            >
                Add Step
            </button>
            <button
          onClick={() => setShowSaveModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Path
        </button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                zoomOnScroll={true}
                panOnScroll={false}
                preventScrolling={false}
                fitView
            >
                <Controls className="text-green-500 text-xl" />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>

            {selectedNode && (
                <div className="fixed top-1/4 left-1/3 bg-white p-6 rounded shadow-lg z-50">
                    <h2 className="text-lg font-bold mb-4">Edit Step</h2>
                    <input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="border p-2 w-full mb-4"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={updateNodeLabel}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={deleteNode}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showSaveModal && (
                <div className="fixed top-1/4 left-1/3 bg-white p-6 rounded shadow-lg z-50">
                    <h2 className="text-lg font-bold mb-4">Save Path</h2>
                    <input
                        value={pathTitle}
                        onChange={(e) => setPathTitle(e.target.value)}
                        placeholder="Enter path title..."
                        className="border p-2 w-full mb-4"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={handlePathSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? 'Saving' : 'Save Path'}
                        </button>
                        <button
                            onClick={() => setShowSaveModal(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenerateManually