"use client";

import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Avatar, Box, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import MenuUser from "../menu-user";

const Topbar = () => {
  const { user, setInformation } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Box
      bgcolor={theme.palette.common.white}
      py={2}
      boxShadow="1px 1px rgba(0,0,0,0.25)"
    >
      <Box
        maxWidth={1200}
        display="flex"
        width="100%"
        alignItems="center"
        marginX="auto"
      >
        <Image src="/noTextLogo.png" height={48} width={48} alt="Logo" />
        <Box
          gap={4}
          flex={1}
          display="flex"
          justifyContent="right"
          alignItems="center"
        >
          <IconButton>
            <Image
              alt="search"
              src="/icons/search.svg"
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton>
            <Image
              alt="notification"
              src="/icons/notification.svg"
              width={24}
              height={24}
            />
          </IconButton>
          <MenuUser user={user} />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
