import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            {/* Badge */}
            <p className="flex items-center gap-3 w-full justify-center mb-6">
              <span className="text-5xl font-bold tracking-tight shiny-text">
                Pathik
              </span>
            </p>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Master Your Skills, One Path at a Time
            </h1>
          </div>

          {/* Form Container */}
          <div>{children}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-gray-600 text-sm">
        <span>© 2025 Pathik. All rights reserved.</span>
      </div>
    </div>
  );
};

export default AuthLayout;
