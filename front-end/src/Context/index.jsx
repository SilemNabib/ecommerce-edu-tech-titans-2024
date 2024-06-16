import { createContext, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { ApiConfig } from "../config/ApiConfig";

export const GlobalContext = createContext();

export const GlobalProvider = ( { children } ) => {

  // Product Detail - MustBeOpen
  const isProductDetailOpen = () => productToShow !== null

  // Product Detail - Show product
  const [productToShow, setProductToShow] = useState(null)

  const cartCount = () => cartProducts.length
  
  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState(null);

  // Estado para saber si el carrito está abierto o cerrado
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Set loading state
  const [loading, setLoading] = useState(false)

  // Para obtener los productos del carrito cada vez que abra o cierre el carrito
  useEffect(() => {
    setCartProducts(null)
    fetch('https://fakestoreapi.com/cart') // Reemplazar por la URL de la API y agregar credenciales de autenticación
      .then((response) => response.json())
      .then((data) => setCartProducts(data))
  }, [isCartOpen])

  return (
    <AuthProvider>
      <GlobalContext.Provider value={{
        cartCount,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCartOpen,
        setIsCartOpen,
        loading,
        setLoading
      }}>
          {children}
      </GlobalContext.Provider>
    </AuthProvider>
  );
};
