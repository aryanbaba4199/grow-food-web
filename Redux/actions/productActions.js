import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Use the correct URL for React Native emulator
const API_URL = 'https://growfoodapi.onrender.com/api/products';
// const API_URL = 'http://localhost:5000/api/products';

export const getProducts = () => async dispatch => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: GET_PRODUCTS, payload: response.data });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/product/${id}`);
    dispatch({ type: GET_PRODUCT, payload: res.data });
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};


// Getting Brands 
export const getBrands = () => async dispatch => {
  try{
  let brand = "brands";
  const response = await axios.get(`${API_URL}/${brand}`);
  dispatch({type : GET_BRANDS, payload: response.data})
  }catch (error) {
    console.error('Error fetching Brands', error);
  }
};



// Getting Categories
export const getCategories = () => async dispatch => {
  try{
    let category = "category";
    const response = await axios.get(`${API_URL}/${category}`);
    dispatch({type : GET_CATEGORY, payload: response.data})
  }catch(err){
    console.error('Error fetching categories', err);
  }
};


export const addProduct = (productData) => async dispatch => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: ADD_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};



export const updateProduct = (id, product) => async dispatch => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};


