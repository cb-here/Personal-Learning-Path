import { useQuery } from '@tanstack/react-query';
import { fetchReccomendations } from '../../services/api';
import { ClimbingBoxLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';

function Reccomendation() {
    const { data: reccomendations, isError, error, isPending } = useQuery({
        queryKey: ["reccomendations"],
        queryFn: fetchReccomendations,
    });

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
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
                Recommended Courses Just for You
            </h2>

            {reccomendations?.length === 0 ? (
                <p className="text-center text-gray-400">No recommendations available based on your interests.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reccomendations?.map((course) => (
                        <div
                            key={course._id}
                            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Course Title */}
                            <h3 className="text-xl font-bold text-blue-400 mb-3">{course.title}</h3>

                            {/* Course Description */}
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                {course.description}
                            </p>

                            {/* Course Categories */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {course?.category?.map((item, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Course Level */}
                            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                {course.level}
                            </span>

                            {/* View Course Button */}
                            <NavLink
                                to={course.link}
                                target="_blank"
                                className="mt-4 inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                View Course
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Reccomendation;