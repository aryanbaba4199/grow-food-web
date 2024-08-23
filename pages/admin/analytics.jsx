import React, { useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Createproduct from "../../Component/Admin/products/createproduct";
import Orders from "../../Component/Admin/Orders/orders";
import CreateBrand from "../../Component/Admin/createBrand";
import CreateCategory from "../../Component/Admin/createCategory/createCategory";

import { useSelector } from "react-redux";



const Admin = () => {
  const [index, setIndex] = useState(0);
  


  const {user} = useSelector((state)=>state.auth);
  
  return (
    <>
      
     
      <div className="grid gap-4 grid-cols-3 items-center container px-8 py-4 ">
        <div
          onClick={() => setIndex(0)}
          className="w-full hover:cursor-pointer shadow-sm shadow-black hover:shadow-md border-2 hover:border-2 border-black h-28 bg-blue-800 text-white rounded-md flex flex-col justify-center items-center"
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Product</span>
        </div>
        <div
          onClick={() => setIndex(1)}
          className="w-full hover:cursor-pointer shadow-sm shadow-black hover:shadow-md border-2 hover:border-2 border-black h-28 bg-blue-800 text-white rounded-md flex flex-col justify-center items-center"
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Orders</span>
        </div>
        <div
          onClick={() => setIndex(2)}
          className="w-full hover:cursor-pointer shadow-sm shadow-black hover:shadow-md border-2 hover:border-2 border-black h-28 bg-blue-800 text-white rounded-md flex flex-col justify-center items-center"
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Brand</span>
        </div>
        <div
          onClick={() => setIndex(3)}
          className="w-full hover:cursor-pointer shadow-sm shadow-black hover:shadow-md border-2 hover:border-2 border-black h-28 bg-blue-800 text-white rounded-md flex flex-col justify-center items-center"
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Category</span>
        </div>
      </div>
      <div>
        {index === 0 ? (
          <Createproduct />
        ) : index === 1 ? (
          <Orders />
        ) : index === 2 ? (
          <CreateBrand />
        ) : index ===3 ?(
          <CreateCategory/>) : (""
        )}
      </div>
    </>
  );
};

export default Admin;
