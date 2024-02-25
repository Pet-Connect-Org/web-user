import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  Icon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import ClassIcon from "@mui/icons-material/Class";
import Image from "next/image";

const LIST_LINK = [
  {
    label: "Home",
    link: "/home",
    icon: DoorBackIcon,
  },
  {
    label: "My pet",
    link: "/home",
    icon: "/icons/foot.svg",
  },
  {
    label: "Friends",
    link: "/home",
    icon: "/icons/friend.svg",
  },
  {
    label: "Knowledge",
    link: "/home",
    icon: ClassIcon,
  },
  {
    label: "Video",
    link: "/home",
    icon: VideocamIcon,
  },
];

const LeftSideBar = () => {
  const { user } = useUser();
  if (!user) return;
  return (
    <Box height="100%" width={300} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" px={2} pb={2}>
        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
          {user.name.charAt(0)}
        </Avatar>
        <Typography ml={1.5} fontWeight={600}>
          {user.name}
        </Typography>
      </Box>
      <MenuList sx={{ flex: 1 }}>
        {LIST_LINK.map((link) => (
          <MenuItem
            key={link.link}
            sx={{
              px: 3,
              py: 2,
            }}
          >
            {typeof link.icon === "string" ? (
              <Icon>
                <Image height={24} width={24} src={link.icon + ""} alt="icon" />
              </Icon>
            ) : (
              <Icon component={link.icon as any} />
            )}
            <Typography ml={2} fontWeight={500}>
              {link.label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
      <Box p={3} textAlign="center">
        <Typography variant="footnote" color={theme.palette.grey[500]}>
          Copyright © 2024 Pet Connect. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LeftSideBar;