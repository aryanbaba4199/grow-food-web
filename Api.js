const apiurl = 'http://localhost:5000'
// const apiurl = 'https://growfoodapi.onrender.com'

export const API_URL = apiurl;
export const logo_uri = 'https://i.pinimg.com/736x/5d/90/4b/5d904b9f3b2f1a21c7ef3d19729598a3.jpg'


// -------------Users Api --------------------
export const userlogin = `${API_URL}/api/users/login`;
export const usersAPi = `${apiurl}/api/users`
export const getUserApi = `${apiurl}/api/users`
export const getuserAddress = `${apiurl}/api/users/getAddress`
export const getDeliveryAddress = `${apiurl}/api/users/getDeliveryAddress`
export const updateUserDetails = `${apiurl}/api/users/updateUser`
export const createAddress = `${apiurl}/api/users/createAddress`
export const getAllUsers = `${apiurl}/api/users/getallusersforadmin`



// -------Orders API --------------------------------
export const OrdersApi = `${apiurl}/api/orders`
export const createOrderAPI = `${apiurl}/api/orders/create`
export const getOrdersByUser = `${apiurl}/api/orders/getOrder`
export const updateOrderbyId = `${apiurl}/api/orders/updateOrder`
export const deleteOrderbyId = `${apiurl}/api/orders/deleteOrder`



// -------------Carts API --------------------------------
export const createCartbyUser = `${apiurl}/api/orders/createCart`
export const getCartbyUser = `${apiurl}/api/orders/getCart`
export const deleteCartItem = `${apiurl}/api/orders/deleteCart`




// ---------------Products Api ---------------------------
export const productsAPi = `${apiurl}/api/products`
export const getProductbyId = `${apiurl}/api/products/product`
export const createProduct = `${apiurl}/api/products`
export const getProductsApi = `${apiurl}/api/products`

export const updateBrandbyId = `${apiurl}/api/products/updateBrand`
export const deleteBrandbyId = `${apiurl}/api/products/deleteBrand`
export const getBrandsApi = `${apiurl}/api/products/brands`

export const createUnit = `${apiurl}/api/products/createUnit`
export const getUnit = `${apiurl}/api/products/getUnit`

export const getProductbySubCategory = `${apiurl}/api/products/subProduct`


export const createSubCategory = `${apiurl}/api/products/createSubCategory`
export const getSubCategoriesApi= `${apiurl}/api/products/getSubCategory`

export const getCategoriesApi = `${apiurl}/api/products/category`







