import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '../../Components/Pagination';
import { CircularProgress } from '@mui/material';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const auth = useAuth();

  useEffect(() => {
    setOrderHistory(null);

    const fetchOrderHistory = async () => {
      try {
        const response = await auth.authFetch(`${ApiConfig.order_history}?page=${page-1}`);
        setTotalPages(response.data.data.totalPages);
        setOrderHistory(response.data.data.content);
      } catch (error) {
        toast.error("Failed to fetch order history", error);
      }
    };

    const fetchUserInfo = async () => { 
      try {
        const response = await auth.authFetch(ApiConfig.profile);
        setUserInfo(response.data);
      } catch (error) {
        toast.error("Failed to fetch user info", error);
      }
    };

    fetchOrderHistory();
    fetchUserInfo();
  }, [auth, page]);

  return (
    <div className="flex flex-col md:flex-row items-start p-8">
      <ToastContainer />
      <ProfileNavigation userInfo={userInfo} /> 
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">My Order History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto mb-4">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Products</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orderHistory === null && 
                (
                  <tr>
                    <td colSpan="4" className="py-3 px-6 text-center"><CircularProgress /></td>
                  </tr>
                )}
                {orderHistory?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-3 px-6 text-center">No order history</td>
                  </tr>
                )}
                {orderHistory?.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={()=> window.location.href = `/checkout/payment?order=${order.id}`}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{`${new Date(order.creationDate).getDate()}/${new Date(order.creationDate).getMonth() + 1}/${new Date(order.creationDate).getFullYear()}`}</td>
                    <td className="py-3 px-6 text-left">
                      <ul>
                        {order.inventory?.slice(0, 2).map((inventory, idx) => (
                          <li key={idx}>
                            <img src={inventory.product.productImages[0].url} alt={inventory.product.name} className="w-8 h-8 inline-block mr-2" />
                            {inventory.product.name} x {inventory.amount}
                          </li>
                        ))}
                        {order.inventory?.length > 2 && <li>others...</li>}
                      </ul>
                    </td>
                    <td className="py-3 px-6 text-left">${order.totalPrice}</td>
                    <td className="py-3 px-6 text-left">{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(page) => setPage(page)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;