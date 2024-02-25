"use client";

import { useUser } from "@/app/hooks/useUser";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import LeftSideBar from "../_components/left-sidebar";
import { theme } from "@/app/theme";

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <LeftSideBar />
      {/* <MainContent /> */}
      {/* <RightSidebar /> */}
    </>
  );
};

export default HomePage;
