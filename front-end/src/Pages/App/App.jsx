import { Navigate } from 'react-router';
import { BrowserRouter, useParams, useRoutes } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation';
import StripeProvider from '../../Components/StripeProvider';
import { GlobalProvider } from '../../Context';
import { isAuthenticated } from '../../Context/AuthContext';
import { NavigationCategories } from '../../config/NavigationCategories';
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
    ...NavigationCategories.categories.flatMap(category => [
      ...category.featured.map(feature => ({ path: feature.href, element: <Category /> })),
      ...category.sections.flatMap(section => section.items.map(item => ({ path: item.href, element: <Category /> })))
    ]),
    { path: '/login', element: isAuthenticated() ? <Navigate to='/profile' /> : <Login /> },
    { path: '/profile', element: isAuthenticated() ? <NotFound /> : <Login /> },
    { path: '/recover-password', element: <RecoverPassword /> },
    { path: '/update-password', element: <UpdatePassword /> },
    { path: '/register/email-verification', element: <EmailVerification /> },
    { path: '/register/verification-code', element: <VerificationCode /> },
    { path: 'register/*', element: <Register /> },
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
    { path: '*', element: <Navigation /> },
    { path: 'register/*', element: undefined },
    { path: '/checkout/*', element: undefined }
  ]);

  return routes;
};

const FootRoutes = () => {
  let routes = useRoutes([
    { path: "*", element: <Footer /> },
    { path: "register/*", element: undefined },
  ]);

  return routes;
};

const Category = () => {
  let { category, section, item } = useParams();
  let products;

  return (
    <div>
      <side>Filtros</side>
      <main>{products?.map(product => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </article>
      ))}</main>
    </div>
  );
}

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