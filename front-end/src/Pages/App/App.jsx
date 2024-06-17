import { BrowserRouter, useParams, useRoutes } from "react-router-dom";
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation';
import { GlobalProvider } from "../../Context";
import { NavigationCategories } from '../../config/NavigationCategories';
import Home from "../Home";
import Login from "../Login";
import NotFound from "../NotFound";
import RecoverPassword from "../RecoverPassword";
import Register from "../Register";
import UpdatePassword from "../UpdatePassword";
import VerificationCode from "../VerificationCode";
import EmailVerification from "../EmailVerification";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    ...NavigationCategories.categories.flatMap(category => [
      ...category.featured.map(feature => ({ path: feature.href, element: <Category /> })),
      ...category.sections.flatMap(section => section.items.map(item => ({ path: item.href, element: <Category /> })))
    ]),
    { path: '/login', element: <Login />},
    { path: '/register', element: <Register />},
    { path: '/recover-password', element: <RecoverPassword />	},
    { path: '/update-password', element: <UpdatePassword />	},
    { path: '/verification-code', element: <VerificationCode />},
    { path: '/email-verification', element: <EmailVerification />}
  ]);

  return routes;
};

const Category = () => {

  let { category, section, item } = useParams();

  let products;

  return <div>
    <side>Filtros</side>
    <main>{products?.map(product => { 
      return <article key={product.id}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </article>
    })}</main>
  </div>
}

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
      <Navigation/>
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;