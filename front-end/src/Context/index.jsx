import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ( { children } ) => {

  // Products
  const [items, setItems] = useState(null)

  // Products - Filter
  const [filteredItems, setFilteredItems] = useState(null)

  // Product Detail - MustBeOpen
  const isProductDetailOpen = () => productToShow !== null 

  // Product Detail - Show Product
  const [productToShow, setProductToShow] = useState(null)

  const cartCount = () => cartProducts.length
  
  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState(null);

  // Estado para saber si el carrito está abierto o cerrado
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => { 
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products'); // Reemplazar por la URL de la API 
      const data = await response.json();
      setItems(data);
    };
  
    fetchProducts();
  }, [])
  
  // Para obtener los productos del carrito cada vez que abra o cierre el carrito
  useEffect(() => {
    const fetchCartProducts = async () => {
      setCartProducts(null);
      const response = await fetch('https://fakestoreapi.com/cart'); // Reemplazar por la URL de la API y agregar credenciales de autenticación
      const data = await response.json();
      setCartProducts(data);
    };
  
    fetchCartProducts();
  }, [isCartOpen])

  const filterBy = (type,items,search) => {
    if(type === "TITLE") return items?.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    if(type === "CATEGORY") return items?.filter(item => item.category.toLowerCase().includes(search.toLowerCase()));
  }

  useEffect(() => {
    let tempItems = items;
    if (searchByTitle) tempItems = filterBy("TITLE", tempItems, searchByTitle);
    if(searchByCategory) tempItems = filterBy("CATEGORY", tempItems, searchByCategory);

    setFilteredItems(tempItems)
  }, [items, searchByTitle, searchByCategory]);

  return (
    <GlobalContext.Provider value={{
      items,
      setItems,
      cartCount,
      filteredItems,
      setFilteredItems,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCartOpen,
      setIsCartOpen,
      searchByTitle,
      setSearchByTitle,
      searchByCategory,
      setSearchByCategory
    }}>
        {children}
    </GlobalContext.Provider>
  );
};
