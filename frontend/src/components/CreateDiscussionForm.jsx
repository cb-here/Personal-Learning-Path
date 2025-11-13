import { useState } from "react";
import { createDiscussion } from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MessageCircle, Tag, Type, FileText } from "lucide-react";

function CreateDiscussionForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "Node js",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      toast.success("Discussion created successfully!");
      queryClient.invalidateQueries(["discussions"]);
      setFormData({
        title: "",
        content: "",
        tags: "Node js",
      });
      onClose();
    },
    onError: () => {
      toast.error("Failed to create discussion");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="hidden md:flex w-10 h-10 bg-purple-600 rounded-lg  items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Start a Discussion</h2>
        </div>
        <p className="text-gray-400">
          Share your thoughts, questions, or ideas with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"
          >
            <Tag className="w-4 h-4" />
            Category
          </label>
          <select
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
          >
            <option value="Node js">Node.js</option>
            <option value="Django">Django</option>
            <option value="React">React</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"
          >
            <Type className="w-4 h-4" />
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter a descriptive title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Content
          </label>
          <textarea
            id="content"
            placeholder="Share your thoughts in detail..."
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all resize-none"
            rows="8"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-800 flex-col sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Creating..." : "Create Discussion"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDiscussionForm;
