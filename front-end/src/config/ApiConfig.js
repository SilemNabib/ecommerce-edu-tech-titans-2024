export const uri = "http://localhost:8080/api/v1";

export const ApiConfig = {
  url: uri,
  profile: uri + "/user/profile",
  change_phone: uri + "/user/change-phone",
  change_password: uri + "/user/change-password",
  recover_password: uri + "/auth/forgotPwd/verifyMail",
  reset_password: uri + "/auth/forgotPwd/resetPwd",
  addresses: uri + "/user/address",
  countries: uri + "/country/",
  all: uri + "/admin/user/",
  order: uri + "/user/order/",
  order_history: uri + "/order/history",
  products: uri + "/product/",
  inventory: uri + "/product/inventory/",
  add_product_inventory: uri + "/admin/product/inventory/",
  reviews: uri + "/review/product/",
  addReview: uri + "/review/create/",
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
    create_product: uri + "/admin/product/",
  },
};

