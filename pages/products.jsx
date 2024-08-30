import React, { useState, useEffect } from "react";
import ProductCard from "@/Component/Home/productCard";
import Loader from "@/Component/helpers/loader";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { getProducts } from "@/Redux/actions/productActions";

const products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);

    const products = useSelector((state) => state.products.products);
    useEffect(()=>{
      if(products.length>0){
        setProductsData(products)
      }
    })

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 px-4">
          {productsData?.map((item, index) => (
            <>
              <ProductCard item={item} key={index} />
            </>
          ))}
        </div>
        </>
      )}
    </>
  );
};

export default products;
