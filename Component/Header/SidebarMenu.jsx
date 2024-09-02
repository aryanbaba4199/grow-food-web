import React, { useState, useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { GrUserAdmin } from "react-icons/gr";
import { AdminMenu, sideBarData } from "@/constants";
import UserContext from "@/userContext";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";

const SidebarMenu = ({ collapse }) => {
  const { user, token } = useContext(UserContext);
  const router = useRouter();

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
    <Sidebar className="z-[2000]" collapsed={collapse}>
      <Menu className="">
        <div className="mt-4">
          {sideBarData.map((item, index) => (
            <>
              <MenuItem>
                <Link
                  href={`${item.path}`}
                  className="flex gap-4 px-2 rounded-md py-1"
                >
                  <span className="mt-1 txt-1 text-lg">{item.icon}</span>
                  <span className="txt-1">{item.name}</span>
                </Link>
              </MenuItem>
            </>
          ))}
        </div>
        <div>
          {user &&
            user?.user?.userType === "Admin" &&
            user?.user?.userStatus === "Verified" && (
              <SubMenu
                label="Admin"
                icon={<GrUserAdmin />}
                className="txt-1 flex flex-col justify-center "
              >
                {AdminMenu.map((item, index) => (
                  <MenuItem>
                    <Link
                      href={`${item.path}`}
                      className="flex gap-4 px-2 rounded-md"
                    >
                      <span className="mt-1 txt-1 text-lg">{item.icon}</span>
                      <span className="txt-1">{item.name}</span>
                    </Link>
                  </MenuItem>
                ))}
              </SubMenu>
            )}
          <MenuItem>
            {token ? (
              <span className="flex  gap-4 txt-1" onClick={handleSignOut}>
                <FaUser className="mt-1 ml-2" />
                <span className="">Log Out</span>{" "}
              </span>
            ) : (
              <span className="flex  gap-4 txt-1" onClick={()=>router.push("/auth")}>
                <span>
                  {" "}
                  <FaUser className="mt-1 ml-2" />
                </span>{" "}
                <span>Log In</span>
              </span>
            )}
          </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
