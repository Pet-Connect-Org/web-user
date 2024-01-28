"use client";

import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { theme } from "./theme";
import PCTextField from "./components/textfield";
import MailIcon from "@mui/icons-material/Mail";
import PCRadioButton from "./components/radio-button";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import PCLink from "./components/link";

export default function Home() {
  const [isShowPassWord, setIsShowPassword] = useState(false);
  return (
    <Box
      borderRadius={2}
      bgcolor={theme.palette.common.white}
      px={5}
      py={4}
      maxWidth={500}
    >
      <Box display="flex" justifyContent="center" mb={2} width="100%">
        <Image src="/logo.png" width={175} height={60} alt="logo" />
      </Box>

      <PCTextField
        type="email"
        fullWidth
        InputProps={{
          startAdornment: <MailIcon sx={{ mr: 1 }} />,
        }}
        label="Email"
        placeholder="Email"
      />
      <PCTextField
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        fullWidth
        type={isShowPassWord ? "text" : "password"}
        InputProps={{
          startAdornment: <LockIcon sx={{ mr: 1 }} />,
          endAdornment: (
            <IconButton onClick={() => setIsShowPassword((prev) => !prev)}>
              {!isShowPassWord ? (
                <VisibilityOffIcon sx={{ fill: theme.palette.common.black }} />
              ) : (
                <VisibilityIcon sx={{ fill: theme.palette.common.black }} />
              )}
            </IconButton>
          ),
        }}
        label="Password"
        placeholder="Password"
      />
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <PCRadioButton value="isRemember" label="Remember me" />
        <Typography fontWeight={500} color={theme.palette.primary.main}>
          Forgot password?
        </Typography>
      </Box>
      <Button sx={{ mt: 4 }} fullWidth variant="contained">
        <Image src="/footprint.png" width={20} height={20} alt="Footprint" />
        <Typography ml={1}>Sign in</Typography>
      </Button>
      <Divider
        sx={{
          mt: 4,
          "&::before, &::after": {
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <Typography color={theme.palette.primary.light}>OR</Typography>
      </Divider>
      <Button
        startIcon={
          <Image
            src="/facebook.png"
            width={22}
            height={22}
            alt="Facebook Icon"
            style={{ marginRight: 8 }}
          />
        }
        sx={{ mt: 4 }}
        fullWidth
        variant="text"
      >
        <Typography>Continue with facebook</Typography>
      </Button>
      <Button
        startIcon={
          <Image
            src="/google.png"
            width={22}
            height={22}
            alt="Google Icon"
            style={{ marginRight: 8 }}
          />
        }
        sx={{ mt: 4 }}
        fullWidth
        variant="text"
      >
        <Typography>Continue with Google</Typography>
      </Button>

      <Box mt={4} textAlign="center">
        <Typography color={theme.palette.tertiary.main}>
          Dont have an account?
        </Typography>
        <PCLink href="#">
          <Typography fontWeight={500}>Sign up</Typography>
        </PCLink>
      </Box>
    </Box>
  );
}
