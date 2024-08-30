import React, { useState, useEffect } from "react";
import ProductCard from "@/Component/Home/productCard";
import Loader from "@/Component/helpers/loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/Redux/actions/productActions";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  // Fetch products once on component mount
  useEffect(() => {
    setLoader(true); // Show loader while fetching products
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);

  // Update local state whenever the products from redux change
  useEffect(() => {
    if (products.length > 0) {
      setProductsData(products);
      setLoader(false); // Hide loader after products are loaded
    }
  }, [products]); // Add products as dependency

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
