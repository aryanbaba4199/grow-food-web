import React, { useState, useEffect } from "react";
import ProductCard from "@/Component/Home/productCard";
import Loader from "@/Component/helpers/loader";
import { decryptData, encryptData } from "@/Context/userFunction";
import { useRouter } from "next/router";
import Head from "next/head";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setProductsData(decryptData(localStorage.getItem("products")));
  }, []);

  return (
    <>
    <Head>
          <title>The Grow Food</title>
          <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
          <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
        </Head>
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 px-4">
          {productsData.map((item, index) => (
            <>
            {item.display!==false &&
            <div
            key={index}
              onClick={() => {
                const id = encryptData(item._id);

                router.push(
                  `/ProductDetails?thegrowfood=${encodeURIComponent(id)}`
                );
              }}
            >
              <ProductCard item={item} key={index} />
            </div>
            }
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
