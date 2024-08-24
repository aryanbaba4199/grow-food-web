import React, { useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Createproduct from "../../Component/Admin/products/createproduct";
import Orders from "../../Component/Admin/Orders/orders";
import CreateBrand from "../../Component/Admin/createBrand";
import CreateCategory from "../../Component/Admin/createCategory/createCategory";
import Analytics from "@/Component/Admin/Analytics";

import { useSelector } from "react-redux";

const Admin = () => {
  const [index, setIndex] = useState("");

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Analytics/>



      <div className="flex gap-2 flex-wrap items-center container px-8 py-4 ">
        <div
          onClick={() => setIndex(0)}
          className={`flex-1 hover:cursor-pointer shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex flex-col justify-center items-center`}
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Product</span>
        </div>
        <div
          onClick={() => setIndex(1)}
          className={`flex-1 hover:cursor-pointer shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex flex-col justify-center items-center`}
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Orders</span>
        </div>
        <div
          onClick={() => setIndex(2)}
          className={`flex-1 hover:cursor-pointer shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex flex-col justify-center items-center`}
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Brand</span>
        </div>
        <div
          onClick={() => setIndex(3)}
          className={`flex-1 hover:cursor-pointer shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex flex-col justify-center items-center`}
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Category</span>
        </div>
      </div>
      <div>
        {index === 0 ? (
          <Createproduct setIndex = {setIndex}/>
        ) : index === 1 ? (
          <Orders />
        ) : index === 2 ? (
          <CreateBrand />
        ) : index === 3 ? (
          <CreateCategory />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Admin;
