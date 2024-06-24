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
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <WelcomeAdmin />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <OrderType title="New Orders" orders={ordersData.newOrders} />
          <OrderType title="Prepared Orders" orders={ordersData.preparedOrders} />
          <OrderType title="Sent Orders" orders={ordersData.sentOrders} />
          <OrderType title="Completed Orders" orders={ordersData.completedOrders} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
