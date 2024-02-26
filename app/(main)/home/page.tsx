"use client";

import React from "react";
import { Box } from "@mui/material";
import LeftSideBar from "../_components/left-sidebar";
import RightSidebar from "../_components/right-sidebar";
import MainContent from "../_components/main-content";

const HomePage = () => {
  return (
    <Box display="flex" height="100%" maxWidth={1920} mx="auto">
      <LeftSideBar />
      <MainContent sx={{ flex: 1 }} />
      <RightSidebar />
    </Box>
  );
};

export default HomePage;
