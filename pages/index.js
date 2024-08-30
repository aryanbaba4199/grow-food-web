import React, {useEffect} from 'react'
import Home from "@/Component/Home/home"
import { useDispatch } from 'react-redux';
import { getBrands, getCategories, getProducts } from '@/Redux/actions/productActions';

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  
  
  return (
    <>
      <div className='bg-gray-100'>
          <Home/>
          
      </div>
      
    </>
  )
}

export default index;