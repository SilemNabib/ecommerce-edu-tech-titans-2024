import { BrowserRouter, useRoutes } from "react-router-dom";
import { GlobalProvider } from "../../Context";
import Navigation from "../../Components/Navigation";
import Home from "../Home";
import NotFound from "../NotFound";
import Login from "../Login";
import Register from "../Register";
import RecoverPassword from "../RecoverPassword";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    { path: '/login', element: <Login />},
    { path: '/register', element: <Register />},
    { path: '/recover-password', element: <RecoverPassword />	}
  ]);

  return routes;
};

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navigation />
        <AppRoutes />
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
