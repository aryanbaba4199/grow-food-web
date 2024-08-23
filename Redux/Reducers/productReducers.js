import { GET_PRODUCTS, ADD_PRODUCT, GET_BRANDS, GET_CATEGORY, GET_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [],
  brands: [],
  categories: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_PRODUCT:
      return { ...state, products: action.payload };  
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_CATEGORY:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default productReducer;
