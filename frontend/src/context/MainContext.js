"use client";
import Loader from "@/components/Loader";
import { axiosClient } from "@/utils/AxiosClient";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const mainContext = createContext({
  user: {},
  fetchUserProfile() {},
  logOutHandler() {}
});

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) return;
      const resp = await axiosClient.get("/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await resp?.data;
      setUser(data);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setUser(null);
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loader />
      </div>
    );
  }
  return (
    <mainContext.Provider value={{ user, fetchUserProfile, logOutHandler }}>
      {children}
    </mainContext.Provider>
  );
};
