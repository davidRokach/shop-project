export const API_URL = "http://localhost:3003/";

//? LOCAL STORAGE KEY FOR TOKEN
export const TOKEN_KEY = "token";

//?AUTH
export const REGISTER_ROUTE = "users";
export const LOGIN_ROUTE = "users/login";
export const LOGOUT = "users/logout";
export const CHECK_TOKEN = "users/checkToken";

//?USER (NEED A TOKEN TO THIS ENDPOINT)
export const USER_INFO_ROUTE = "users/userInfo";
export const EDIT_USER_ROUTE = "users/editUser/";
export const UPDATE_ADDRESS = "users/updateAddress";
export const CHANGE_PASSWORD_ROUTE = "users/changePassword/";
export const DELETE_USER_ROUTE = "users/deleteUser/";

//?ADMIN()
export const USER_LIST = "users/userList";

//?PRODUCTS
export const GET_ALL_PRODUCTS = "products";
export const GET_PRODUCTS_BY_SEARCH = "products/?s=";
export const GET_PRODUCTS_BY_CATEGORY = "products/?category=";
export const GET_PRODUCTS_BY_PAGE = "products/?page=";
export const GET_SINGLE_PRODUCT = "products/single/";
export const ADD_PRODUCT = "products";
export const EDIT_PRODUCT = "products/";
export const DELETE_PRODUCT = "products/";
export const GET_MY_FAVORITE = "products/favorite";
export const GET_SHOP_CART = "products/shopCart";
export const MODIFY_SHOP_CART = "products/shopCart";
export const SEND_CART_ORDER = "products/order";
export const GET_ORDERS = "products/orders";

//?Default-Image
export const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/1017/1017141.png?w=1380&t=st=1691528013~exp=1691528613~hmac=d7c42b757c13926b81ef11de75954ec4043730ac44120f64ea62967394be1419";
