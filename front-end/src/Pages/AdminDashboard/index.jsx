import { useState } from 'react';
import IncomeSummary from '../../Components/IncomeSummary';
import OrderType from '../../Components/OrderType';
import Sidebar from "../../Components/Sidebar";
import WelcomeAdmin from '../../Components/WelcomeAdmin';

const ordersData = {
  newOrders: [{ date: '2023-04-01', status: 'NEW', total: 100 }],
  preparedOrders: [{ date: '2023-04-02', status: 'PREPARED', total: 200 }],
  sentOrders: [{ date: '2023-04-03', status: 'SENT', total: 300 }],
  completedOrders: [{ date: '2023-04-04', status: 'COMPLETED', total: 400 }],
};

const AdminDashboard = () => {
  const [showIncomeSummary, setShowIncomeSummary] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100"> {/* Updated layout classes */}
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto"> {/* Updated padding for consistency */}
        <WelcomeAdmin />
        <div className="md:w-3/4 mx-auto">
          <button
            onClick={() => setShowIncomeSummary(!showIncomeSummary)}
            className="w-full text-left font-bold py-2 px-4 bg-white shadow rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            📊 Statistics
          </button>
          {showIncomeSummary && (
            <div className="mt-4 p-4 bg-white shadow rounded-lg">
              <IncomeSummary />
            </div>
          )}
        </div>
        <div className="md:w-3/4 mx-auto mt-4">
          <button
            onClick={() => setShowOrders(!showOrders)}
            className="w-full text-left font-bold py-2 px-4 bg-white shadow rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            📦 Orders
          </button>
          {showOrders && (
            <div className="mt-4 p-4 bg-white shadow rounded-lg">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <OrderType title="New Orders" orders={ordersData.newOrders} className="md:w-1/4" />
                <OrderType title="Prepared Orders" orders={ordersData.preparedOrders} className="md:w-1/4" />
                <OrderType title="Sent Orders" orders={ordersData.sentOrders} className="md:w-1/4" />
                <OrderType title="Completed Orders" orders={ordersData.completedOrders} className="md:w-1/4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;