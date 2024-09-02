import React, {useEffect, useState} from 'react'
import Details from '@/Component/product/Details'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import CryptoJS from "crypto-js";
import axios from 'axios';

import ProductCard from '@/Component/Home/productCard';
import { getProductbySubCategory } from '@/Api';
const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [subProduct, setSubProduct] = useState([]);

    const router = useRouter();


    

    useEffect(() => {

        const encryptedData = router.query.thegrowfood;
    
        if (encryptedData) {
          try {
    
            const bytes = CryptoJS.AES.decrypt(
              decodeURIComponent(encryptedData),
              "2468"
            );
            const decryptedProduct = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            setProduct(decryptedProduct);
            getSubCategoriesProduct(decryptedProduct.subCategory);
          } catch (error) {
            console.error("Failed to decrypt product details:", error);
          }
          
        }
      }, [router.query.data]);

      const getSubCategoriesProduct = async(subCategory)=>{
        console.log("subCate", subCategory)
        try{
            const res = await axios.get(`${getProductbySubCategory}/${subCategory}`);
        if(res.status===200){
            setSubProduct(res.data);
        }
        }catch (error) {
            console.error("Failed to load products by category:", error);
        }
        
      }


  return (
    <>
        <div>
            <Details product={product}/>
        </div>
        <div className='mt-8 px-2'>
            <Typography className='bg-color-1 text-center'>You may alos intrested</Typography>
            <div className='flex flex-wrap gap-2 justify-between items-center my-4'>
                {subProduct.map((item, index)=>(
                    <div>
                    <ProductCard item={item} key={index}/>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default ProductDetails