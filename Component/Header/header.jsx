import React, { useContext, useEffect, useState } from "react";
import Search from "./search";
import { FaHome, FaLockOpen, FaLock, FaCartPlus } from "react-icons/fa";
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

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {user, token } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails());
    }
    setIsMounted(true);
  }, [dispatch, token]);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userAddress");
      router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isMounted) {
    return null;
  }

 const userDetails =  user;

  

  console.log("user header is", userDetails);

  return (
    <>
      <div className="bg-[#1e4426] text-white">
        <div className="flex justify-between items-center px-4">
          <div className="md:w-[20%] w-[30%] flex justify-start gap-3 items-center">
            
            {userDetails?.user?.email  && (
              <MdMenu
                onClick={() => setUserMenu(!userMenu)}
                className="text-3xl hover:cursor-pointer md:hidden block"
              />
            )}

            <Link href="/">
              <Image
                src={Logo}
                className=" w-12 h-12 rounded-full p-1"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="md:w-[30%] w-[80%]">
            <Search />
          </div>
          <div>
          {userDetails?.user?.email === "aryanbaba4199@gmail.com" && (
              <CiMenuKebab
                onClick={() => setIsAdmin(!isAdmin)}
                className="text-3xl hover:cursor-pointer"
              />
            )}
          </div>
          <div className="md:flex hidden justify-start ml-12 items-center gap-12 w-[50%] ">
            <Link href="/" className="flex gap-2 ">
              <span>
                <FaHome className={`${gf_colors.primary_Icon_Color} mt-1`} />
              </span>
              <span>Home</span>
            </Link>
            <Link href="/cart" className="flex gap-2 ">
              <span>
                <FaCartPlus
                  className={`${gf_colors.primary_Icon_Color} mt-1`}
                />
              </span>
              <span>Cart</span>
            </Link>
            {token ? (
              <>
                <button onClick={handleSignOut} className="flex gap-2 ">
                  <span>
                    <FaLockOpen
                      className={`${gf_colors.primary_Icon_Color} mt-1`}
                    />
                  </span>
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <Link href="/auth" className="flex gap-2 ">
                <span>
                  <FaLock className="mt-1 text-red-500" />
                </span>
                <span>Log In</span>
              </Link>
            )}
            {userDetails?.user?.email === "aryanbaba4199@gmail.com" && (
              <Link href="/admin/analytics" className="flex gap-2 ">
                <span className={`${gf_colors.primary_Icon_Color} mt-1`}>
                  <MdAdminPanelSettings />
                </span>
                <span>Admin</span>
              </Link>
            )}
            <>
              {token && (
                <button
                  className="flex gap-2 "
                  onClick={() => setShowProfile(true)}
                >
                  <span className="mt-1 text-blue-800">
                    <MdAdminPanelSettings />
                  </span>
                  <span>Profile</span>
                </button>
              )}
            </>
          </div>
        </div>
      </div>

      <Drawer open={userMenu} onClose={() => setUserMenu(false)}>
        <div className="bg-[#1e4426] text-white h-full flex flex-col ">
          <div className="flex flex-col justify-center items-center mt-8 font-semibold">
            <SiIfood className="text-7xl" />
            <span className="text-lg">
              Grow <span className="text-green-400">Food</span>
            </span>
            <div className="flex flex-col gap-5 w-full mt-10">
              <Link
                href="/"
                onClick={() => setUserMenu(false)}
                className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%]"
              >
                <span>
                  <FaHome className="mt-1 text-yellow-500" />
                </span>
                <span>Home</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setUserMenu(false)}
                className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%]"
              >
                <span>
                  <FaCartPlus className="mt-1 text-yellow-500" />
                </span>
                <span>Cart</span>
              </Link>
              {token ? (
                <button
                  onClick={handleSignOut}
                  className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                >
                  <span onClick={() => setUserMenu(false)}>
                    <FaLockOpen className="mt-1 text-yellow-500" />
                  </span>
                  <span>Log out</span>
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setUserMenu(false)}
                  className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                >
                  <span>
                    <FaLock className="mt-1 text-red-500" />
                  </span>
                  <span>Log In</span>
                </Link>
              )}
              
                {token && 
                  <button
                    className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                    onClick={() => setShowProfile(true)}
                  >
                    <span className="mt-1 text-yellow-600">
                      <MdAdminPanelSettings />
                    </span>
                    <span>Profile</span>
                  </button>
}
          
            </div>
          </div>
        </div>
      </Drawer>

      <Drawer anchor="right" open={isAdmin} onClose={() => setIsAdmin(false)}>
        <div className="bg-[#1e4426] text-white h-full flex flex-col">
          <div className="flex flex-col justify-center items-center mt-8 font-semibold">
            <SiIfood className="text-7xl" />
            <span className="text-lg">
              Grow <span className="text-green-400">Food</span>
            </span>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-12"
          >
            <Link href={`/admin/analytics`} className="">
              Dashboard
            </Link>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4"
          >
            <Link href={`/admin/orders`} className="">
              Orders
            </Link>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4"
          >
            <Link href={`/admin/products`} className="">
              Products
            </Link>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4"
          >
            <Link href={`/admin/brands`} className="">
              Brands
            </Link>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4"
          >
            <Link href={`/admin/category`} className="">
              Category
            </Link>
          </div>
          <div
            onClick={() => setMenu(false)}
            className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4"
          >
            <Link href={`/admin/analytics`} className="">
              Analytics
            </Link>
          </div>
        </div>
      </Drawer>

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
