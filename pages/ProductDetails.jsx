import React, { useEffect, useState } from "react";
import Details from "@/Component/product/Details";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";

import ProductCard from "@/Component/Home/productCard";

import { decryptData } from "@/Context/userFunction";
import { getSubCategoriesProduct } from "@/Context/productFunction";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [subProduct, setSubProduct] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const encryptedData = router.query.thegrowfood;

    if (encryptedData) {
      try {
        const id = decryptData(encryptedData);

        const product = decryptData(localStorage.getItem("products")).find(
          (item) => item._id === id
        );
        setProduct(product);
        getSubCategoriesProduct(decryptData(product.subCategory));
      } catch (error) {
        console.error("Failed to decrypt product details:", error);
      }
    }
  }, [router.query.data]);

  useEffect(() => {
    if (product) {
      const sub = decryptData(localStorage.getItem("products")).filter(
        (item) => item.subCategory === product.subCategory
      );
      setSubProduct(sub);
    }
  }, [product]);
  console.log(product)

  return (
    <>
      <Head>
        <title>The Grow Food</title>
        <meta
          name="description"
          content="The Grow Food Is B2B solution for Restaurants"
        />
        <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
      </Head>
      <div id="container">
       
        <Details productData={product} />

      </div>
      <div className="mt-8 px-2">
        <Typography className="bg-color-1 text-center">
          You may alos intrested
        </Typography>
        <div className="md:flex grid grid-cols-2 flex-wrap gap-2 justify-between items-center my-4">
          {subProduct.map((item, index) => (
            <>
            {item.display!==false &&
            <div
              key={index}
              onClick={() => {
                setProduct(item);
                document
                  .getElementById("container")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ProductCard item={item} key={index} />
            </div>
}
</>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
