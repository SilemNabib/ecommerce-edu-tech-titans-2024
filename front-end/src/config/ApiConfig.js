export const uri = "http://localhost:8080/api/v1";

export const ApiConfig = {
  url: uri,
  profile: uri + "/user/profile",
  addresses: uri + "/user/address",
  countries: uri + "/country/",
  all: uri + "/admin/user/",
  order: uri + "/user/order/",
  products: uri + "/product/",
  inventory: uri + "/product/inventory/",
  reviews: uri + "/review/product/",
  banners: uri + "/product/banner",
  cart: {
    add: uri + "/cart/add",
    remove: uri + "/cart/remove/",
    get: uri + "/cart/get",
  },
  checkout: {
    paypal: uri + "/checkout/paypal",
    status: uri + "/checkout/status",
  },
  auth: {
    login: uri + "/auth/login",
    register: uri + "/auth/register",
    verify: uri + "/auth/verify",
    complete: uri + "/auth/complete",
  },
  admin: {
    uploadimg: uri + "/admin/product/image/",
  },
};

