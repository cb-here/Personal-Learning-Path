import { useState } from "react";
import { createDiscussion } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function CreateDiscussion() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: ""
    })

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: createDiscussion,
        onSuccess: () => {
            toast.success("A new discussion created!")
            navigate("/discuss")
        },
        onError: (error) => {
            toast.error("Failed to create a new discussion")
        }
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate(formData)
        formData({
            title: '',
            content: '',
            tags: ''
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
                    Create a New Discussion
                </h1>
                <div>
                    <label htmlFor="tags">Tags: </label>
                    <select name="tags" id="tags" onSelect={handleChange}>
                        <option value="Node js">Node Js</option>
                        <option value="Django">Django</option>
                        <option value="React">React</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter a title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-300 text-sm font-medium mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        placeholder="Write your content here..."
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="6"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                >
                    Create Discussion
                </button>
            </form>
        </div>
    );
}

export default CreateDiscussion;