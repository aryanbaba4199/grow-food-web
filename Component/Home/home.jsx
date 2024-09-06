import React, { useEffect, useState, useRef } from "react";

import ProductCard from "./productCard";

import Banner from "./banner";
import Loader from "../helpers/loader";
import Slide from "./sliderMenu";
import { useRouter } from "next/router";
import {
  getProducts,
  getBrands,
  getCategories,
  memoize,
} from "@/Context/productFunction";
import {
  decryptData,
  encryptData,
  fetchUserDetails,
} from "@/Context/userFunction";

const Home = () => {
  const [filteredBrand, setFilteredBrand] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const productContainerRef = useRef(null);

  useEffect(() => {
    callFunctions();
    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? decryptData(storedProducts) : [];
    setProducts(
      Array.isArray(products) && products.length !== 0 ? products : []
    );
    const storedBrands = localStorage.getItem("brands");
    const brands = storedBrands ? decryptData(storedBrands) : [];
    setBrands(Array.isArray(brands) ? brands : []);
    const storedCategories = localStorage.getItem("categories");
    const categories = storedCategories ? decryptData(storedCategories) : [];
    setCategories(Array.isArray(categories) ? categories : []);
  }, []);

  const callFunctions = async () => {
    const productData = await getProducts();
    const brandsData = await getBrands();
    const categoriesData = await getCategories();
    const fetchUserDetailsData = await fetchUserDetails();

    if (productData.response === true) {
      setProducts(productData.data);
    }
    if (brandsData.response === true) {
      setBrands(brandsData.data);
    }
    if (categoriesData.response === true) {
      setCategories(categoriesData.data);
    }
    setTimeout(async () => {
      await memoize(getProducts, "products");
      await memoize(getBrands, "brands");
      await memoize(getCategories, "categories");
    }, 3000);
  };

  const handleBrandFilter = (brand) => {
    const brandView = products.filter((product) => product.brand === brand);
    setFilteredBrand(brandView);
    setIsFilter(true);
    productContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryFilter = (brand) => {
    const brandView = products.filter(
      (product) => product.categories === brand
    );
    setFilteredBrand(brandView);
    setIsFilter(true);
    productContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!products && products.length === null && products.length === 0 ? (
        <Loader />
      ) : (
        <div className=" px-4 w-full md:mt-0 mt-14">
          <div className="flex justify-center items-center mt-4">
            <Banner />
          </div>
          <div className=" mt-4">
            <Slide
              products={brands}
              title="Shop By Brand"
              timer={24}
              filter={handleBrandFilter}
            />
          </div>
          <div className=" mt-8">
            <Slide
              products={categories}
              title="Shop By Categories"
              timer={24}
              filter={handleCategoryFilter}
            />
          </div>
          <div className="flex mt-8 justify-between rounded-r-none border-color-1 txt-1 border rounded-xl ">
            <span className="font-bold text-lg px-8 py-1">
              Special Products
            </span>
            <span
              onClick={() =>
                router.push({
                  pathname: "/products",
                  query: {
                    selectedProducts: JSON.stringify(products),
                  },
                })
              }
              className="bg-color-1 px-6 hover:cursor-pointer"
            >
              View All
            </span>
          </div>
          <div
            id="product-container"
            ref={productContainerRef} // Attach the ref to the product container div
            className="md:flex flex-row flex-wrap grid grid-cols-2 gap-4 mt-4"
          >
            {!isFilter ? (
              <>
                {products.map((item, index) => (
                  <div
                    className="flex-1"
                    key={index}
                    onClick={() => {
                      const id = encryptData(item._id);

                      router.push(
                        `/ProductDetails?thegrowfood=${encodeURIComponent(id)}`
                      );
                    }}
                  >
                    <ProductCard
                      key={index}
                      item={item}
                      isCart={false}
                      deleteCartItem={false}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {filteredBrand.map((item, index) => (
                  <ProductCard
                    key={index}
                    item={item}
                    isCart={false}
                    deleteCartItem={false}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
