import React, { useContext, useEffect, useState } from "react";
import Search from "./search";
import { FaHome, FaLockOpen, FaLock, FaCartPlus, FaRegBell } from "react-icons/fa";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import { useRouter } from "next/router";
import Image from "next/image";
import { logout, fetchUserDetails } from "@/Redux/actions/userAuthAction";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { MdMenu } from "react-icons/md";
import { Dialog, Drawer } from "@mui/material";
import { SiIfood } from "react-icons/si";
import Profile from "../user/profile";
import { gf_colors } from "@/constants";
import UserContext from "@/userContext";
import { CiMenuKebab } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";

import { getProducts } from "@/Redux/actions/productActions";

const Header = ({setCollapse, collapse}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token } = useContext(UserContext);

  const [showProfile, setShowProfile] = useState(false);
  const [bell, setBell] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    dispatch(getProducts());
    if (token) {
      dispatch(fetchUserDetails());
      
    }
    setIsMounted(true);
  }, [dispatch, token]);

  const products = useSelector((state) => state.products.products);

  
  if (!isMounted) {
    return null;
  }

  const userDetails = user;

  console.log("user header is", userDetails);

  return (
    <>
      <div className="bg-[#1e4426] text-white">
        <div className="flex justify-between items-center px-4 text-sm">
          <div className="flex justify-start items-center w-full">
            <div className=" flex justify-start gap-3 items-center">
              <MdMenu
                onClick={() => setCollapse(!collapse)}
                className="text-3xl hover:cursor-pointer"
              />

              <Link href="/">
                <Image
                  src={Logo}
                  className=" w-12 h-12 rounded-full p-1"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="md:w-[30%] w-[80%] md:ml-16 ml-2">
              <Search products={products} />
            </div>
          </div>
          
          <div className="flex gap-4">
            <span className="flex bg-color-1 h-8 w-8 rounded-md">
              
            <FaRegBell className="w-5 h-5 mt-2"/>
            {/* <span className="rounded-full -translate-y-2 -translate-x-1 text-lg font-semibold">{user?.cartLength}</span> */}
            </span>
              {token && (
                <img
                  src={userDetails?.user?.image}
                  className="w-8 h-8 hover:cursor-pointer rounded-full mr-4"
                  onClick={() => setShowProfile(true)}
                />
              )}
          </div>
        </div>
      </div>

      
      
      <Drawer
        anchor="right"
        open={showProfile}
        onClose={() => setShowProfile(false)}
      >
        <Profile />
      </Drawer>
    </>
  );
};

export default Header;
