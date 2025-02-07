import React from 'react';
import { ArrowRight } from 'lucide-react'; // Import Lucide ArrowRight icon
import './LoginModal.css'; // Import the custom CSS file

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Arrow pointing upwards */}
      <div className="arrow-container">
        <div className="arrow-icon">
          {/* Simple arrow icon pointing upward, rotate 90 degrees counterclockwise, white color, smaller and thinner */}
          <ArrowRight className="w-full h-full text-white transform rotate-[-90deg] stroke-2" />
        </div>
        <p className="text-white font-semibold text-lg mt-2">Login Here!</p>
      </div>

      {/* Modal Content */}
      <div className="bg-white p-8 rounded-lg max-w-sm w-full shadow-xl relative modal-content">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        
        <h3 className="text-2xl font-semibold text-center mb-4">
          Login or Sign Up to Proceed
        </h3>
        
        <p className="text-lg text-center mb-6">
          You need to be logged in to proceed with the checkout.
        </p>

        <div className="flex justify-center gap-4">
          <button 
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={onClose}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
