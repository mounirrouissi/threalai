import React from 'react';

const Testimony = () => {
  return (
    <div className="m-8">
       <div className="flex flex-col items-center bg-primary-200 text-white w-full py-5">
            <h1 className="text-2xl">Demo</h1>
            <hr className="w-1/2 border-pink-500 mt-2" />
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">How to Use the App</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-white text-gray-800 p-4 rounded-lg shadow-md transition-all hover:scale-105">
          <img
            src="/images/IMG1.jpg"
            alt="Step 1"
            className="w-50 h-80 mb-3"
          />
          <p className="text-xl font-semibold">Step 1: Choose a feature</p>
          <p className="text-center">
            Select the feature you want to use from the main menu.
          </p>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center bg-white text-gray-800 p-4 rounded-lg shadow-md transition-all hover:scale-105">
          <img
            src="/images/IMG1.jpg"
            alt="Step 2"
            className="w-50 h-80 mb-3"
          />
          <p className="text-xl font-semibold">Step 2: Enter your details</p>
          <p className="text-center">
            Fill in the required fields with your information.
          </p>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center bg-white text-gray-800 p-4 rounded-lg shadow-md transition-all hover:scale-105">
          <img
            src="/images/IMG1.jpg"
            alt="Step 3"
            className="w-50 h-80 mb-3"
          />
          <p className="text-xl font-semibold">Step 3: Review and submit</p>
          <p className="text-center">
            Review your inputs and submit to see the results.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Testimony;
