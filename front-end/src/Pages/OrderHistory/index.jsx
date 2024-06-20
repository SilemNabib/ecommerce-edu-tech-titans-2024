import React from 'react';
import { orderHistory } from '../../config/OrderHistory';
import { UserInfo } from '../../config/UserInfo';

const OrderHistory = () => {
  return (
    <div className="flex flex-col md:flex-row items-start p-8">
      <nav className="w-65 p-4 mb-auto md:mb-0 mt-8 md:mr-8 shadow-lg bg-gray-200">
        <div className="relative w-60 h-40 overflow-hidden mb-4 mx-auto">
          <img
            src="/assets/user_model.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 py-2 text-center w-full">
            <span className="text-white font-bold">Hi, {UserInfo.firstName}</span>
          </div>
        </div>

        <ul>
          <li className="mb-2">
            <a href="/information/profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/order-history" className="text-gray-700 hover:text-gray-900 font-bold">
              Orders History
            </a>
          </li>
          <li className="mb-2">
            <a href="/manage-profile" className="text-gray-700 hover:text-gray-900">
              Manage Profile
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Log Out
            </a>
          </li>
        </ul>
      </nav>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">My Order History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Products</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orderHistory.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{order.date}</td>
                    <td className="py-3 px-6 text-left">
                      <ul>
                        {order.products.map((product, idx) => (
                          <li key={idx}>{product}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-6 text-left">${order.total}</td>
                    <td className="py-3 px-6 text-left">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
