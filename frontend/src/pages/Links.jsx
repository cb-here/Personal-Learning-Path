import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLinks } from '../../services/link'
import { ClimbingBoxLoader } from 'react-spinners'
import { NavLink } from 'react-router-dom'
import { PlusIcon, DeleteIcon } from 'lucide-react'
import AddLinkModal from '../components/AddLinkModal'
import { addLink, deleteLink } from '../../services/link'
import { toast } from 'react-toastify'

const Links = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: links, isPending, isError, error } = useQuery({
        queryKey: ["links"],
        queryFn: getLinks
    })
    const onAddLink = (formData) => {
        mutation.mutate(formData)
    }
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: addLink,
        onSuccess: () => {
            toast.success("Link added successfully")
            queryClient.invalidateQueries({ queryKey: ['links'] })
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(error.message || "Failed to add link")
        }
    })

    const handleDelete = async (id) => {
        await deleteLink(id)
        queryClient.invalidateQueries({queryKey: ['links']})
    }

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <ClimbingBoxLoader color="#36d7b7" size={20} />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-6 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Links</h2>
                <p className="text-red-400">{error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 border-b">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Your Links
                </h1>
                <button className="inline-flex items-center gap-2 bg-green-200 hover:bg-green-300 transition duration-300 rounded-2xl p-2 mb-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusIcon color="#898435" size={20} />
                    <span>Add</span>
                </button>
                <AddLinkModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddLink={onAddLink}
                />
                {links.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 rounded-lg bg-gray-700/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                        <p className="text-xl text-gray-400 mb-2">No links added yet</p>
                        <p className="text-gray-500">Add your first link to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {links.map((link) => (
                            <div
                                key={link._id}
                                className="group relative transition-all duration-200 hover:scale-[1.01]"
                            >
                                <NavLink
                                    to={link.url}
                                    target="_blank"
                                    className={({ isActive }) =>
                                        `block p-5 rounded-lg bg-gray-700 border-l-4 ${isActive ? 'border-emerald-500' : 'border-gray-600'} 
                                        hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg`
                                    }
                                >
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                                            <p className="text-sm text-gray-300 mt-1 truncate">{link.url}</p>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </div>
                                </NavLink>
                                <div className="ml-1 absolute right-5 top-0 hover:text-red-400 transition duration-500 ">
                                    <DeleteIcon onClick={() => handleDelete(link._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Links