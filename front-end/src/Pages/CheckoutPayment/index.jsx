import OrderSummary from "../../Components/OrderSummary";
import PaymentInfo from "../../Components/PaymentInfo";
import ProgressBar from "../../Components/ProgressBar";
import { useEffect, useState } from "react";
import { ApiConfig } from "../../config/ApiConfig";
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { LocalShipping, LockClockOutlined, MoneyOff } from "@mui/icons-material";

const registerSteps = [
  "Select destination",
  "New address",
  "Summary",
  "Payment",
];

const CheckoutPayment = () => {
    const auth = useAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const order = queryParams.get("order");

    const [orderStatus, setOrderStatus] = useState(null);

    const checkOrderStatus = async (orderId) => {
      try {
        const response = await auth.authFetch(`${ApiConfig.checkout.status}?order=${orderId}`);
        const data = await response.data;
        setOrderStatus(data);
      } catch (error) {
        toast.error("Error fetching order status", error);
      }
    };

    const renderIcon = (status) => {
      switch (status) {
        case "COMPLETED":
          return <CheckBadgeIcon className="w-12 h-12" />;
        case "PAID":
          return <CheckBadgeIcon className="w-12 h-12" />;
        case "PENDING":
          return <LockClockOutlined className="w-12 h-12"/>;
        case "FAILED":
          return <XCircleIcon className="w-12 h-12"/>;
        case "CANCELLED":
          return <XCircleIcon className="w-12 h-12"/>;
        case "REFUNDED":
          return <MoneyOff className="w-12 h-12" />;
        case "SHIPPED":
          return <LocalShipping className="w-12 h-12"/>;
        default:
          return <CircularProgress className="w-12 h-12"/>;
      }
    };
    useEffect(() => {
      if (order) {
        checkOrderStatus(order);
      }
    }, [order]);

    return (
      <div className="flex flex-col items-center">
        <ToastContainer />
        <ProgressBar steps={registerSteps} currentStep={3} title="Checkout progress" />
        {order && orderStatus === null && (
          <div className="flex items-center justify-center w-full h-96">
            <CircularProgress />
          </div>
        )}
        {order && orderStatus && (
          <div className="items-center justify-center w-full h-96">
            <div className="flex flex-row justify-center items-center">
              {renderIcon(orderStatus.status)}
              <h1 className="text-2xl text-center">Order {orderStatus.status}</h1>
            </div>
            <p className="text-center">Order's ID: {orderStatus.orderId}</p>
            <p className="text-center">Platforms's ID: {orderStatus.paymentId}</p>
            <p className="text-center">Platforms's status: {orderStatus.platformStatus}</p>
          </div>
        )}
        {!order &&
          (
            <div className="flex flex-col md:flex-row justify-around w-full mt-10">
              <div className="md:w-3/5 mb-4 md:mb-0 mt-4 lg:mt-20">
                <PaymentInfo />
              </div>
              <div className="md:w-2/6">
                <OrderSummary />
              </div>
            </div>
          )
        }
      </div>
    );
  };

export default CheckoutPayment;