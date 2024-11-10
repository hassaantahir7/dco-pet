import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="mx-auto my-4 space-y-6">
      <div key={order.id} className="p-4 bg-white shadow-md rounded-md">
          {/* Top section: Status and Order Info */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-blue-800">
              {order.status}
            </h2>
            <div className="text-right text-gray-600">
              <p className="text-sm">
                Order date: {new Date(order.createdOn).toLocaleDateString()}
              </p>
              <p className="text-sm">Order ID: {order.id}</p>
            </div>
          </div>

          {/* Main content: Product info and action buttons */}
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between px-5 py-2"
              >
                {/* Product image (replace with actual images if available) */}
                <div className="flex items-center">
                  <img
                    className="w-20 h-20 object-cover mr-4"
                    src="https://via.placeholder.com/80"
                    alt={product.productName}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      ${product.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col items-end space-y-2 mr-10">
                  <p className="text-lg font-semibold">
                    Total: ${order.totalAmount}
                  </p>
                  <button className="px-6 py-2 bg-[#7EC537] text-white w-full rounded-full hover:bg-green-600">
                    Add to Cart
                  </button>
                  <button className="px-6 py-2 border rounded-full w-full text-gray-700 hover:bg-gray-100">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default OrderCard;
