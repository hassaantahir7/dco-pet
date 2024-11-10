import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white h-full p-6 dashboard-account">
      <h3 className="font-semibold text-xl mb-6">Account</h3>
      <ul>
        <li className="mb-4">
          <a href="/dashboard" className="hover:text-green-700">
            Profile
          </a>
        </li>
        <li className="mb-4">
          <a href="/profile" className="hover:text-green-700">
            Orders
          </a>
        </li>
        {/* <li className="mb-4">
          <a href="#" className="text-gray-700 hover:text-green-500">
            Payment
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="text-gray-700 hover:text-green-500">
            Refund and return
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="text-gray-700 hover:text-green-500">
            Feedback
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-green-500">
            Shipping address
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
