export const uri = "http://192.168.10.13:8080/api/v1";

export const ApiConfig = {
  url: uri,
  products: uri + "/product/",
  cart: uri + "/cart/",
  auth: {
    login: uri + "/auth/login",
    register: uri + "/auth/register",
    verify: uri + "/auth/verify",
    complete: uri + "/auth/complete",
  },
};

