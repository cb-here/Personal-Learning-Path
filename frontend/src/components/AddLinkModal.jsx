import React, { useState } from 'react'
import {Crosshair} from 'lucide-react'

const AddLinkModal = ({ isOpen, onClose, onAddLink }) => {
    const [formData, setFormData] = useState({
        title: '',
        url: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.url) {
            alert('Please fill in all fields')
            return
        }
        onAddLink(formData)
        setFormData({ title: '', url: '' })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-white">Add New Link</h1>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        <Crosshair />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-300 mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="url" className="block text-gray-300 mb-2">
                            URL
                        </label>
                        <input
                            id="url"
                            name="url"
                            type="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md text-white"
                        >
                            Add Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddLinkModal