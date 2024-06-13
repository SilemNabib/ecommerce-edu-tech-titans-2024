import { BrowserRouter, useRoutes } from "react-router-dom";
import { GlobalProvider } from "../../Context";
import Navigation from "../../Components/Navigation";
import Home from "../Home";
import NotFound from "../NotFound";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
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
