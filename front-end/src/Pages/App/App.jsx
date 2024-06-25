import { Navigate } from 'react-router';
import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import Cart from "../../Components/Cart";
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation';
import { GlobalProvider } from '../../Context';
import { isAuthenticated } from '../../Context/AuthContext';
import AdminDashboard from '../AdminDashboard';
import ProductManagement from '../AdminDashboard/ProductManagement';
import AddProductDetail from '../AdminDashboard/ProductManagement/AddProductDetail';
import AddProductImage from '../AdminDashboard/ProductManagement/AddProductImage';
import AddProductInventory from '../AdminDashboard/ProductManagement/AddProductInventory';
import UsersManagement from '../AdminDashboard/UsersManagement';
import Categories from '../Categories';
import CheckoutCart from '../CheckoutCart';
import CheckoutPayment from '../CheckoutPayment';
import CheckoutProfile from '../CheckoutProfile';
import CheckoutShipping from '../CheckoutShipping';
import Company from '../Company';
import Cookies from '../Cookies';
import EmailVerification from "../EmailVerification";
import Home from '../Home';
import Profile from '../InformationProfile';
import Login from '../Login';
import ManageProfile from '../MangeProfile';
import NotFound from '../NotFound';
import OrderHistory from '../OrderHistory';
import Privacy from '../Privacy';
import ProductDetail from '../ProductDetail';
import RecoverPassword from '../RecoverPassword';
import Register from '../Register';
import Terms from '../Terms';
import UpdatePassword from '../UpdatePassword';
import VerificationCode from '../VerificationCode';

import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <NotFound /> },
    { path: "/category/:category", element: <Categories /> },
    { path: "/category/:category/:section", element: <Categories /> },
    { path: "/category/:category/:section/:item", element: <Categories /> },
    { path: '/login', element: isAuthenticated() ? <Navigate to='/profile' /> : <Login /> },
    { path: '/profile', element: isAuthenticated() ? <NotFound /> : <Login /> },
    { path: '/recover-password', element: <RecoverPassword /> },
    { path: '/update-password', element: <UpdatePassword /> },
    { path: '/register/email-verification', element: isAuthenticated() ? <Navigate to="/profile" /> : <EmailVerification /> },
    { path: '/register/verification-code', element: isAuthenticated() ? <Navigate to="/profile" /> : <VerificationCode /> },
    { path: '/register/complete', element: isAuthenticated() ? <Navigate to="/profile" /> : <Register /> },
    { path: '/product-detail/:id', element: <ProductDetail /> },
    
    { path: '/checkout/summary', element: (isAuthenticated() ?  <CheckoutCart /> : <Navigate to="/login" />) },
    { path: '/checkout/address', element: (isAuthenticated() ?  <CheckoutProfile /> : <Navigate to="/login" />) },
    { path: '/checkout/new-address', element: (isAuthenticated() ?  <CheckoutShipping /> : <Navigate to="/login" />) },
    { path: '/checkout/payment', element: (isAuthenticated() ? <CheckoutPayment /> : <Navigate to="/login" />) },

    { path: '/information/profile', element: isAuthenticated() ? <Profile /> : <Navigate to="/login" /> },
    { path: '/manage-profile', element: isAuthenticated() ? <ManageProfile /> : <Navigate to="/login" /> },
    { path: '/order-history', element: isAuthenticated() ? <OrderHistory/> : <Navigate to="/login" /> },

    
    { path: '/company', element: <Company /> },
    { path: '/cookies', element: <Cookies /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },

    { path: '/admin/dashboard', element: isAuthenticated()? <AdminDashboard /> : <Navigate to="/login" />},
    { path: '/admin/users', element: isAuthenticated()? <UsersManagement /> : <Navigate to="/login" />},
    { path: '/admin/products', element: isAuthenticated()? <ProductManagement /> : <Navigate to="/login" />},
    { path: '/admin/products/add', element: isAuthenticated()? <AddProductDetail /> : <Navigate to="/login" />},
    { path: '/admin/products/add/images', element: isAuthenticated()? <AddProductImage /> : <Navigate to="/login" />},
    { path: '/admin/products/add/inventory', element: isAuthenticated()? <AddProductInventory /> : <Navigate to="/login" />},
    { path: '/cart', element: isAuthenticated()? <Cart /> : <Navigate to="/login" /> },
    { path: '/search', element: <Categories /> },

  ]);

  return routes;
};

const NavRoutes = () => {
  let routes = useRoutes([
    { path: "*", element: <Navigation /> },
    { path: "register/*", element: <Outlet /> },
    { path: '/checkout/*', element: undefined },
    {path: '/admin/*', element: undefined}
  ]);

  return routes;
};

const FootRoutes = () => {
  let routes = useRoutes([
    { path: "*", element: <Footer /> },
    { path: "register/*", element: undefined },
    { path: 'admin/*', element: undefined}
  ]);

  return routes;
};

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen justify-between'>
          <NavRoutes />
          <AppRoutes />
          <FootRoutes />
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;