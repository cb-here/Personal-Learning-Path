function Modal({ isOpen, onClose, node }) {
    if (!isOpen || !node) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg text-black relative">
                <h2 className="text-xl font-bold mb-2">{node.data.label}</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    ×
                </button>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    {node.data.resources && node.data.resources.length > 0 ? (
                        <ul className="space-y-3">
                            {node.data.resources.map((res, index) => (
                                <li key={index} className="bg-gray-800 p-3 rounded-lg shadow flex items-start gap-3">
                                    <span className="text-2xl">
                                        {res.type === 'video' ? '🎥' : res.type === 'article' ? '📄' : '🔗'}
                                    </span>
                                    <div>
                                        <a
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 font-medium hover:underline"
                                        >
                                            {res.title}
                                        </a>
                                        <p className="text-xs text-gray-400 capitalize">{res.type}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No resources available.</p>
                    )}
                </div>

            </div>

        </div>
    );
}

export default Modal;
