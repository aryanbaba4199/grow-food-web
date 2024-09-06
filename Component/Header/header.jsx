import React, { useContext, useEffect, useState } from "react";
import Search from "./search";
import {
  FaHome,
  FaLockOpen,
  FaLock,
  FaCartPlus,
  FaRegBell,
} from "react-icons/fa";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import { useRouter } from "next/router";
import Image from "next/image";

import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { MdMenu } from "react-icons/md";
import { Dialog, Drawer } from "@mui/material";
import { SiIfood } from "react-icons/si";
import Profile from "../user/profile";
import { gf_colors } from "@/constants";
import UserContext from "@/userContext";
import { CiMenuKebab, CiSettings } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { memoize } from "@/Context/productFunction";
import { getProducts } from "@/Context/productFunction";
import { GrUserAdmin } from "react-icons/gr";
import { fetchUserDetails } from "@/Context/userFunction";
const Header = ({ setCollapse, collapse }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token } = useContext(UserContext);

  const [showProfile, setShowProfile] = useState(false);
  const [bell, setBell] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // dispatch(getProducts());

    const getdetails = async () => {
      await memoize(fetchUserDetails, "me");
      const x = await memoize(getProducts, "products");
      setProducts(x.data);
    };

    getdetails();
    setIsMounted(true);
  }, [dispatch, token]);

  if (!isMounted) {
    return null;
  }

  const userDetails = user;


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

  return (
    <>
      <div className="bg-[#1e4426] text-white md:relative fixed z-[500] w-full">
        <div className="flex justify-between items-center px-4 text-sm">
          <div className="flex justify-start items-center w-full">
            <div className=" flex justify-start gap-3 items-center">
              <MdMenu
                onClick={() => setCollapse(!collapse)}
                className="text-3xl hover:cursor-pointer md:block hidden"
              />
              <MdMenu
                onClick={() => setOpen(!open)}
                className="text-3xl hover:cursor-pointer md:hidden block"
              />

              <Link href="/">
                <Image
                  src={Logo }
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
              <FaRegBell className="w-5 h-5 mt-2 ml-2" />
              {/* <span className="rounded-full -translate-y-2 -translate-x-1 text-lg font-semibold">{user?.cartLength}</span> */}
            </span>
            {token && (
              <img
                src={userDetails?.user?.image ?? "https://i.pinimg.com/1200x/5d/90/4b/5d904b9f3b2f1a21c7ef3d19729598a3.jpg"}
                className="w-8 h-8 hover:cursor-pointer rounded-full mr-4"
                onClick={() => setShowProfile(true)}
              />
            )}
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
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
                href="/products"
                onClick={() => setUserMenu(false)}
                className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%]"
              >
                <span>
                  <FaCartPlus className="mt-1 text-yellow-500" />
                </span>
                <span>Products</span>
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
                  className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                >
                  <span>
                    <FaLock className="mt-1 text-red-500" />
                  </span>
                  <span>Log In</span>
                </Link>
              )}

              {token && (
                <button
                  className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                  onClick={() => setShowProfile(true)}
                >
                  <span className="mt-1 text-yellow-600">
                    <MdAdminPanelSettings />
                  </span>
                  <span>Profile</span>
                </button>
              )}
              {user?.user?.userType === "Admin" ||
                (user?.user?.userType === "Vendor" && (
                  <button
                    className="flex gap-2 hover:bg-gray-200 px-10 py-1 hover:ease-in-out hover:transform hover:text-black w-[100%] "
                    onClick={() => router.push("/admin/dashboard")}
                  >
                    <span className="mt-1 text-yellow-600">
                      <GrUserAdmin />
                    </span>
                    <span>Admin</span>
                  </button>
                ))}
            </div>
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
