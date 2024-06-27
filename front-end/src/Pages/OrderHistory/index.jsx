import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * Renders the Order History page.
 *
 * return (
 *   <OrderHistory />
 * )
 */
const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [userInfo, setUserInfo] = useState({}); 
  const auth = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await auth.authFetch(ApiConfig.order + 'history');
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      }
    };

    const fetchUserInfo = async () => { 
      try {
        const response = await auth.authFetch(ApiConfig.profile);
        setUserInfo(response.data); 
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchOrderHistory();
    fetchUserInfo();
  }, [auth]);

  return (
    <div className="flex flex-col md:flex-row items-start p-8">
      <ProfileNavigation userInfo={userInfo} /> 
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