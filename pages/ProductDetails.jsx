import React, { useEffect, useState } from "react";
import Details from "@/Component/product/Details";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import axios from "axios";


import ProductCard from "@/Component/Home/productCard";
import { getProductbySubCategory } from "@/Api";
import { memoize } from "@/Context/productFunction";
import { decryptData } from "@/Context/userFunction";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [subProduct, setSubProduct] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const encryptedData = router.query.thegrowfood;



    if (encryptedData) {
      try {
        const id = decryptData(encryptedData);
       
        const product = decryptData(localStorage.getItem('products')).find(item=>item._id===id);
        setProduct(product);
        getSubCategoriesProduct(decryptedProduct.subCategory);
      } catch (error) {
        console.error("Failed to decrypt product details:", error);
      }
    }
  }, [router.query.data]);

  useEffect(()=>{
    if(product){
      const sub = decryptData(localStorage.getItem('products')).filter(item=>item.subCategory===product.subCategory)
      setSubProduct(sub);
    }
  }, [product])

  return (
    <>
      <div>
        <Details product={product} />
      </div>
      <div className="mt-8 px-2">
        <Typography className="bg-color-1 text-center">
          You may alos intrested
        </Typography>
        <div className="md:flex grid grid-cols-2 flex-wrap gap-2 justify-between items-center my-4">
          {subProduct.map((item, index) => (
            <div key={index}>
              <ProductCard item={item} key={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
