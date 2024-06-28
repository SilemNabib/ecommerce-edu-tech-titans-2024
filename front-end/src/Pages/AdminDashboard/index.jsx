import { useEffect, useState } from 'react';
import IncomeSummary from '../../Components/IncomeSummary';
import OrderType from '../../Components/OrderType';
import Sidebar from "../../Components/Sidebar";
import WelcomeAdmin from '../../Components/WelcomeAdmin';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

const AdminDashboard = () => {
  const auth = useAuth();

  const [showIncomeSummary, setShowIncomeSummary] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [ordersData, setOrdersData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const newOrders = await auth.authFetch(`${ApiConfig.admin_orders}PAID`);
        const preparedOrders = await auth.authFetch(`${ApiConfig.admin_orders}PREPARED`);
        const sentOrders = await auth.authFetch(`${ApiConfig.admin_orders}SHIPPED`);
        const completedOrders = await auth.authFetch(`${ApiConfig.admin_orders}COMPLETED`);
        
        console.log(newOrders, preparedOrders, sentOrders, completedOrders);

        setOrdersData({
          newOrders: newOrders.data.content,
          preparedOrders: preparedOrders.data.content,
          sentOrders: sentOrders.data.content,
          completedOrders: completedOrders.data.content,
        });

      } catch (error) {
        toast.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100"> {/* Updated layout classes */}
    <ToastContainer />
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
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-x-auto max-h-96">
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