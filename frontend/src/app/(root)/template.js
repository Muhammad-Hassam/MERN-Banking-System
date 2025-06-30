"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMainContext } from "@/context/MainContext";
import Loader from "@/components/Loader";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setIsToggle, SidebarSlicePath } from "@/redux/slice/slidebarSlice";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { GiFalloutShelter } from "react-icons/gi";
const RootTemplate = ({ children }) => {
  const { user } = useMainContext();
  const router = useRouter();
  const isToggle = useSelector(SidebarSlicePath);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const CustomMenu = ({ link, text, Icon }) => {
    const pathName = usePathname();
    return (
      <MenuItem
        style={{
          backgroundColor: pathName === link ? "#C70036" : "#ffff",
          borderRadius: pathName === link ? "10px" : 0
        }}
        icon={<Icon className="text-2xl" />}
        className={`font-bold p-2 ${
          pathName === link ? "text-white" : "text-black"
        }`}
        component={<Link href={link} />}
      >
        {text}
      </MenuItem>
    );
  };
  return (
    <>
      <section className="flex items-start">
        <Sidebar
          breakPoint="lg"
          toggled={isToggle}
          onBackdropClick={() => dispatch(setIsToggle())}
        >
          <Menu className="!bg-white !min-h-screen lg:!min-h-[100vh]">
            <CustomMenu link={"/"} text={"Home"} Icon={MdDashboard} />
            <CustomMenu
              link={"/profile"}
              text={"Profile"}
              Icon={GiFalloutShelter}
            />
          </Menu>
        </Sidebar>
        <main className="px-1 md:px-3 w-full">{children}</main>
      </section>
    </>
  );
};

export default RootTemplate;
