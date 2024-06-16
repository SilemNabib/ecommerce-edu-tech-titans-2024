export const uri = "http://192.168.10.13:8080/api/v1";

export const ApiConfig = {
  url: uri,
  products: uri + "/product/",
  banners: uri + "/product/banner",
  cart: uri + "/cart/",
  auth: {
    login: uri + "/auth/login",
    register: uri + "/auth/register",
    verify: uri + "/auth/verify",
    complete: uri + "/auth/complete",
  },
};

