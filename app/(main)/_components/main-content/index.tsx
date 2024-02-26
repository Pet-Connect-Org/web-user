import PCTextField from "@/app/components/textfield";
import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

interface MainContentProps extends BoxProps {}

const BUTTON_ACTIONS = [
  {
    label: "Upload pictures",
    url: "/icons/camera.svg",
  },
  {
    label: "Your feeling",
    url: "/icons/faceSmile.svg",
  },
  {
    label: "Check-in",
    url: "/icons/mapPin.svg",
  },
];

const POST_ACTIONS = [
  {
    label: "Like",
    icon: PetsOutlinedIcon,
  },
  {
    label: "Comment",
    icon: TextsmsRoundedIcon,
  },
  {
    label: "Share",
    icon: ShareRoundedIcon,
  },
];

const MainContent = (props: MainContentProps) => {
  const { user } = useUser();

  if (!user) return;
  return (
    <Box sx={{ px: 3, overflowY: "scroll", pb: 3, ...props?.sx }}>
      <Box
        bgcolor={theme.palette.common.white}
        borderRadius={1.5}
        px={2}
        py={3}
        boxShadow="0 1px 1px rgba(0,0,0,0.25)"
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 3 }}>
            {user.name.charAt(0)}
          </Avatar>
          <PCTextField
            fullWidth
            name="share"
            placeholder={`Hey ${user.name.split(" ")[0]}, what are you doing?`}
          />
        </Box>
        <Divider sx={{ mt: 3, mb: 1.5 }} />

        <Box display="flex" gap={1} justifyContent="between">
          {BUTTON_ACTIONS.map((btn) => (
            <Button key={btn.label} variant="text" fullWidth>
              <Icon>
                <Image src={btn.url} width={24} height={24} alt="camera" />
              </Icon>
              <Typography ml={1} variant="title4">
                {btn.label}
              </Typography>
            </Button>
          ))}
        </Box>

        <Divider sx={{ mt: 1.5, mb: 3 }} />
        <Box display="flex" gap={2} alignItems="center">
          <Typography color={theme.palette.grey[500]}>With</Typography>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              key={1 * index}
              bgcolor={theme.palette.grey[200]}
              p={0.5}
              borderRadius={4}
              pr={1}
              sx={{
                cursor: "pointer",
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: theme.palette.primary.light,
                  }}
                >
                  <Typography variant="footnote">H</Typography>
                </Avatar>
                <Typography variant="footnote" ml={0.5}>
                  Harry James
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        mt={3}
        p={3}
        boxShadow="0 1px 1px 0 rgba(0,0,0,0.25)"
        bgcolor={theme.palette.common.white}
        borderRadius={1.2}
      >
        <Box>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: theme.palette.primary.light }}>N</Avatar>
            <Box ml={2} flex={1}>
              <Typography fontWeight={600}>Harry James</Typography>
              <Typography color={theme.palette.grey[600]}>1h ago</Typography>
            </Box>
            <IconButton>
              <MoreHorizRoundedIcon />
            </IconButton>
          </Box>
          <Typography mt={1}>I have something useful want to share </Typography>
          <Box position="relative" height={400} mt={1.5}>
            <Image
              src="/demoPost.png"
              fill
              alt="Post"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>

          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PetsOutlinedIcon />
              <Typography ml={1} variant="footnote">
                7,2k likes
              </Typography>
            </Box>

            <Typography variant="footnote">4,2k comments</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box display="flex">
            {POST_ACTIONS.map((action) => (
              <Box
                key={action.label}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <Icon component={action.icon} />
                </IconButton>
                <Typography
                  ml={1}
                  variant="footnote"
                  color={theme.palette.grey[500]}
                >
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="footnote" color={theme.palette.grey[600]}>
                See all comments
              </Typography>
              <IconButton>
                <TuneRoundedIcon />
              </IconButton>
            </Box>

            <Box display="flex" gap={2} mt={2}>
              <Avatar sx={{ bgcolor: theme.palette.primary.light }}>N</Avatar>
              <Box flex={1}>
                <Box p={2} borderRadius={1.5} bgcolor={theme.palette.grey[200]}>
                  <Typography fontWeight={600} mb={0.5}>
                    Bui Ngoc
                  </Typography>
                  <Typography>
                    Wonderful! Thank you so muchhh ❤ Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim{" "}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} mt={0.5}>
                  <Typography color={theme.palette.grey[600]}>
                    30 minute
                  </Typography>
                  <Typography color={theme.palette.grey[600]} fontWeight={600}>
                    Like
                  </Typography>
                  <Typography color={theme.palette.grey[600]} fontWeight={600}>
                    Relpy
                  </Typography>
                  <Typography color={theme.palette.grey[600]} fontWeight={600}>
                    Share
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;
