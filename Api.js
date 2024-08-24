// const apiurl = 'http://localhost:5000'
const apiurl = 'https://growfoodapi.onrender.com'

export const API_URL = apiurl;
export const logo_uri = 'https://i.pinimg.com/736x/5d/90/4b/5d904b9f3b2f1a21c7ef3d19729598a3.jpg'


// -------------Authentication --------------------
export const userlogin = `${API_URL}/api/users/login`;



export const getUserApi = `${apiurl}/api/users`
export const getuserAddress = `${apiurl}/api/users/getAddress`


export const createOrderAPI = `${apiurl}/api/orders/create`
export const createCartbyUser = `${apiurl}/api/orders/createCart`
export const getCartbyUser = `${apiurl}/api/orders/getCart`
export const getProductbyId = `${apiurl}/api/products/product`
export const getOrdersByUser = `${apiurl}/api/orders/getOrder`
export const getDeliveryAddress = `${apiurl}/api/users/getDeliveryAddress`
export const updateOrderbyId = `${apiurl}/api/orders/updateOrder`
export const deleteCartItem = `${apiurl}/api/orders/deleteCart`
export const updateUserDetails = `${apiurl}/api/users/updateUser`
export const OrdersApi = `${apiurl}/api/orders`
export const productsAPi = `${apiurl}/api/products`
export const usersAPi = `${apiurl}/api/users`
export const createProduct = `${apiurl}/api/products`
export const createAddress = `${apiurl}/api/users/createAddress`