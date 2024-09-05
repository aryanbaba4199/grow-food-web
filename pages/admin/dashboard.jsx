import React, { useEffect, useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Createproduct from "../../Component/Admin/products/createproduct";
import Orders from "../../Component/Admin/Orders/orders";
import CreateBrand from "../../Component/Admin/createBrand";
import CreateCategory from "../../Component/Admin/createCategory/createCategory";
import Analytics from "@/Component/Admin/Analytics";
import { FaDatabase } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { BiSolidCategoryAlt } from "react-icons/bi";

import { useSelector } from "react-redux";
import { decryptData } from "@/Context/userFunction";

const Dashboard = () => {
  const [index, setIndex] = useState("");
  const [user, setUser] = useState(null);


  useEffect(()=>{
    const user = decryptData(localStorage.getItem("user"));
    setUser(user);
  }, [])

  return (
    <>
      <Analytics/>

      <div className="flex md:flex-row flex-col gap-2 flex-wrap items-center container px-8 py-4 ">
        <div
          onClick={() => setIndex(0)}
          className={`flex-1 md:w-auto w-full hover:cursor-pointer shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex py-2 gap-4 justify-center items-center`}
        >
          <MdOutlineProductionQuantityLimits className="text-3xl text-orange-400" />
          <span className="text-xl">Create Product</span>
        </div>
        <div
          onClick={() => setIndex(1)}
          className={`flex-1 hover:cursor-pointer md:w-auto w-full shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex py-2 gap-4 justify-center items-center`}
        >
          <FaDatabase className="text-3xl text-orange-400" />
          <span className="text-xl">Orders</span>
        </div>
        <div
          onClick={() => setIndex(2)}
          className={`flex-1  hover:cursor-pointer md:w-auto w-full shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex py-2 gap-4   justify-center items-center`}
        >
          <SiBrandfolder className="text-3xl text-orange-400" />
          <span className="text-xl">Create Brand</span>
        </div>
        <div
          onClick={() => setIndex(3)}
          className={`flex-1 hover:cursor-pointer md:w-auto w-full shadow-sm shadow-black hover:shadow-md  hover:border-2 active:bg-green-600  h-28 bg-[#1e4426] text-white rounded-md flex py-2 gap-4  justify-center items-center`}
        >
          <BiSolidCategoryAlt className="text-3xl text-orange-400" />
          <span className="text-xl">Create Category</span>
        </div>
      </div>
      <div>
        {index === 0 ? (
          <Createproduct setIndex = {setIndex} user={user.user}/>
        ) : index === 1 ? (
          <Orders user = {user.user}/>
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

export default Dashboard;
