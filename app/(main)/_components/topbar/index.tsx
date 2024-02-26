"use client";

import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Avatar, Box, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MenuUser from "../menu-user";
import PCTextField from "@/app/components/textfield";

const Topbar = () => {
  const { user } = useUser();
  const [showSearchBox, setShowSearchBox] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <Box bgcolor={theme.palette.common.white} py={2}>
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
          {!showSearchBox ? (
            <IconButton onClick={() => setShowSearchBox(true)}>
              <Image
                alt="search"
                src="/icons/search.svg"
                width={24}
                height={24}
              />
            </IconButton>
          ) : (
            <PCTextField
              autoFocus
              InputProps={{
                endAdornment: (
                  <Image
                    alt="search"
                    src="/icons/search.svg"
                    width={24}
                    height={24}
                  />
                ),
              }}
              placeholder="Search for users, pets,..."
              containerProps={{
                sx: { width: 300 },
              }}
              size="small"
              onBlur={() => showSearchBox && setShowSearchBox(false)}
            />
          )}
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
