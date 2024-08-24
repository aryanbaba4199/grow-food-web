import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./productCard";
import { getProducts } from "@/Redux/actions/productActions";
import Banner from "./banner";
import Loader from "../helpers/loader";
import Slide from "./sliderMenu";
import { getBrands } from "@/Redux/actions/productActions";
import { getCategories } from "@/Redux/actions/productActions";

const Home = () => {
  const [filteredBrand, setFilteredBrand] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  
  const dispatch = useDispatch();
  const productContainerRef = useRef(null); // Create a ref for the product container

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.products.categories);
  const brands = useSelector((state) => state.products.brands);

  const handleBrandFilter = (brand) => {
    const brandView = products.filter((product) => product.brand === brand);
    setFilteredBrand(brandView);
    setIsFilter(true);
    productContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryFilter = (brand) => {
    const brandView = products.filter((product) => product.categories === brand);
    setFilteredBrand(brandView);
    setIsFilter(true);
    productContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mt-4">
            <Banner />
          </div>
          <div className=" mt-4">
            <Slide products={brands} title="Shop By Brand" timer={24} filter={handleBrandFilter}/>
          </div>
          <div className=" mt-8">
            <Slide
              products={categories}
              title="Shop By Categories"
              timer={24}
              filter={handleCategoryFilter}
            />
          </div>
          <div className="flex mt-8 justify-between rounded-sm py-1 bg-gradient-to-r from-[#5fd579] via-[#19a232] to-[#1e4426] ">
            <span className="font-bold text-lg px-8">Special Products</span>
          </div>
          <div
            id="product-container"
            ref={productContainerRef} // Attach the ref to the product container div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            {!isFilter ? (
              <>
                {products.map((item, index) => (
                  <ProductCard key={index} item={item} isCart={false} deleteCartItem={false} />
                ))}
              </>
            ) : (
              <>
                {filteredBrand.map((item, index) => (
                  <ProductCard key={index} item={item} isCart={false} deleteCartItem={false} />
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
