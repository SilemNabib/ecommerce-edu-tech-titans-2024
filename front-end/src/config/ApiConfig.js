export const uri = "http://localhost:8080/api/v1";

export const ApiConfig = {
  url: uri,
  products: uri + "/product/",
  reviews: uri + "/review/product/",
  banners: uri + "/product/banner",
  cart: uri + "/cart/",
  auth: {
    login: uri + "/auth/login",
    register: uri + "/auth/register",
    verify: uri + "/auth/verify",
    complete: uri + "/auth/complete",
  },
};

