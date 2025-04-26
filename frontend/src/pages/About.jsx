import { Users, BookOpen, Globe, Heart, Github, Mail, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Personal Introduction */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-600 p-8 flex flex-col items-center justify-center text-white">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg mb-6">
                <span className="text-4xl font-bold text-blue-600">CB</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Chandrabhushan Vishwakarma</h1>
              <p className="flex items-center text-blue-100 mb-4">
                <GraduationCap className="mr-2 h-5 w-5" />
                Recent Graduate
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/cb-here" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-200 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="mailto:cbv934@gmail.com" 
                  className="hover:text-blue-200 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Hello, I'm Chandrabhushan 👋</h2>
              <p className="text-lg text-gray-600 mb-6">
                A recent graduate passionate about building meaningful digital experiences. I created Pathik to help learners navigate their educational journeys with confidence.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-blue-800">
                  "Feel free to reach out on GitHub for collaborations or just to say hello! I'm always open to discussing new projects and ideas."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pathik Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">About Pathik</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Your intelligent guide to personalized learning paths
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 text-blue-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Community-Driven</h2>
              </div>
              <p className="text-gray-600">
                Join thousands of learners in our vibrant community. Share knowledge, get feedback, and grow together.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
              <div className="flex items-center mb-4">
                <BookOpen className="h-10 w-10 text-purple-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Smart Resources</h2>
              </div>
              <p className="text-gray-600">
                AI-curated learning materials that adapt to your level and goals. Never waste time on irrelevant content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
              <div className="flex items-center mb-4">
                <Globe className="h-10 w-10 text-green-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Global Classroom</h2>
              </div>
              <p className="text-gray-600">
                Learn from anywhere, connect with experts worldwide, and access content in multiple languages.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
              <div className="flex items-center mb-4">
                <Heart className="h-10 w-10 text-red-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Built with Care</h2>
              </div>
              <p className="text-gray-600">
                Designed by learners, for learners. Every feature is crafted to make your educational journey smoother.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://github.com/cb-here" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              Connect on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;