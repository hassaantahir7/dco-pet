import React from "react";
import { FaPlusCircle } from "react-icons/fa"; // For the add card icon

function AccountsPage() {
  return (
    <div className="w-3/4 bg-gray-100 p-6">
      {/* Payment Section */}
      <div className="bg-white rounded mb-6 p-3">
        <h2 className="text-lg font-semibold text-blue-800 p-4">Payment</h2>
      </div>

      {/* Bonus Section */}
      <div className="bg-white rounded mb-6 p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Bonus</h3>
        <div className="text-center mt-16 mb-10">
          <p className="text-gray-500">Total</p>
          <p className="text-2xl font-semibold text-blue-800">$10.00</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-1/2 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Cards</h3>
        <div className="bg-white p-20 flex justify-center items-center text-center">
          <FaPlusCircle className="text-blue-800 mr-2 text-2xl text-center" />
          <span className="text-blue-800 font-semibold">Add new card</span>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
