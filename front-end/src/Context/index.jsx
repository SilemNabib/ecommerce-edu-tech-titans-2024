import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  // Products
  const [items, setItems] = useState(null)

  // Products - Filter
  const [filteredItems, setFilteredItems] = useState(null)

  // Product Detail - Open/Close
  const [openProductDetail, setOpenProductDetail] = useState(false)

  // Product Detail - Show Product
  const [productToShow, setProductToShow] = useState(null)

  // Shopping Cart - Quantity
  const [count, setCount] = useState([])

  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => { 
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data))
  }, [])

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
      count,
      setCount,
      filteredItems,
      setFilteredItems,
      openProductDetail,
      setOpenProductDetail,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      searchByTitle,
      setSearchByTitle,
      searchByCategory,
      setSearchByCategory
    }}>
        {children}
    </GlobalContext.Provider>
  );
};
