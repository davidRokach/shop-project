import React from "react";

const Payment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Credit Card Payment Unavailable
        </h1>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience, but our credit card payment system
          is currently unavailable. We are working diligently to resolve this
          issue and appreciate your patience.
        </p>
        <p className="text-gray-600">
          In the meantime, please feel free to contact our customer support for
          alternative payment options or any assistance you may need.
        </p>
      </div>
    </div>
  );
};

export default Payment;
