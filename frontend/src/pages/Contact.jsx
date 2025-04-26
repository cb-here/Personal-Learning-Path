import { Mail, MapPin, Phone } from 'lucide-react'; // Import Lucide icons

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 py-12">
      <div className="bg-gray-600 p-8 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Have questions or need assistance? We're here to help! Reach out to us via the form below or through our contact details.
        </p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <Mail className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">support@pathik.com</p>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <MapPin className="h-10 w-10 text-purple-500 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Address</h2>
            <p className="text-gray-600">123 Learning St, Knowledge City</p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <Phone className="h-10 w-10 text-green-500 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone</h2>
            <p className="text-gray-600">+1 (123) 456-7890</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              rows="5"
              placeholder="Enter your message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;