import React, { useState, useEffect } from "react";
import ProductCard from "@/Component/Home/productCard";
import Loader from "@/Component/helpers/loader";
import { decryptData } from "@/Context/userFunction";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setProductsData(decryptData(localStorage.getItem("products")));
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 px-4">
          {productsData.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
