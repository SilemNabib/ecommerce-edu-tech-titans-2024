import { Navigate } from 'react-router';
import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation';
import StripeProvider from '../../Components/StripeProvider';
import { GlobalProvider } from '../../Context';
import { isAuthenticated } from '../../Context/AuthContext';
import Category from '../Categories';
import CheckoutCart from '../CheckoutCart';
import CheckoutPayment from '../CheckoutPayment';
import CheckoutProfile from '../CheckoutProfile';
import CheckoutShipping from '../CheckoutShipping';
import EmailVerification from "../EmailVerification";
import Home from '../Home';
import Login from '../Login';
import NotFound from '../NotFound';
import ProductDetail from '../ProductDetail';
import RecoverPassword from '../RecoverPassword';
import Register from '../Register';
import UpdatePassword from '../UpdatePassword';
import VerificationCode from '../VerificationCode';

import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <NotFound /> },
    { path: "/category/:category", element: <Category /> },
    { path: "/category/:category/:section", element: <Category /> },
    { path: "/category/:category/:section/:item", element: <Category /> },
    { path: '/login', element: isAuthenticated() ? <Navigate to='/profile' /> : <Login /> },
    { path: '/profile', element: isAuthenticated() ? <NotFound /> : <Login /> },
    { path: '/recover-password', element: <RecoverPassword /> },
    { path: '/update-password', element: <UpdatePassword /> },
    { path: '/register/email-verification', element: isAuthenticated() ? <Navigate to="/profile" /> : <EmailVerification /> },
    { path: '/register/verification-code', element: isAuthenticated() ? <Navigate to="/profile" /> : <VerificationCode /> },
    { path: '/register/complete', element: isAuthenticated() ? <Navigate to="/profile" /> : <Register /> },
    { path: '/product-detail/:id', element: <ProductDetail /> },
    { path: '/checkout/cart', element: <CheckoutCart /> },
    { path: '/checkout/profile', element: <CheckoutProfile /> },
    { path: '/checkout/shipping', element: <CheckoutShipping /> },
    { path: '/checkout/payment', element: (
      <StripeProvider>
        <CheckoutPayment />
      </StripeProvider>
    )},
  ]);

  return routes;
};

const NavRoutes = () => {
  let routes = useRoutes([
    { path: "*", element: <Navigation /> },
    { path: "register/*", element: <Outlet />},
    { path: '/checkout/*', element: undefined }
  ]);

  return routes;
};

const FootRoutes = () => {
  let routes = useRoutes([
    { path: "*", element: <Footer /> },
    { path: "register/*", element: <Outlet />},
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