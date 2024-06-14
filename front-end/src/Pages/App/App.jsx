import { BrowserRouter, useParams, useRoutes } from "react-router-dom";
import Navigation from '../../Components/Navigation';
import { GlobalProvider } from "../../Context";
import { NavigationCategories } from '../../config/NavigationCategories';
import Home from "../Home";
import NotFound from "../NotFound";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    ...NavigationCategories.categories.flatMap(category => [
      ...category.featured.map(feature => ({ path: feature.href, element: <Category /> })),
      ...category.sections.flatMap(section => section.items.map(item => ({ path: item.href, element: <Category /> })))
    ]),
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
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;