import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Avatar, Box, Button, Chip, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";

const MOCK_CHIPS = [
  "park for dogs",
  "happy cat",
  "meo meo",
  "how to train your cat",
];

const RightSidebar = () => {
  const { user } = useUser();

  const time = useMemo<string>(() => {
    const date = new Date().getHours();
    if (date < 12) return "morning";
    if (date < 18) return "afternoon";
    return "evening";
  }, []);

  if (!user) return;
  return (
    <Box p={2} width={350} sx={{ overflowY: "scroll" }} maxHeight="100%">
      <Typography variant="title2" fontWeight={600}>
        Hi {user.name}
      </Typography>
      <Typography mt={1}>Good {time}!</Typography>

      <Box
        my={3}
        bgcolor={theme.palette.secondary.main}
        borderRadius={5}
        p={3}
        boxShadow="inset 0 4px 4px 0 rgba(0,0,0,0.25)"
      >
        <Typography
          color={theme.palette.common.white}
          variant="title4"
          fontWeight={600}
        >
          Join our Animal Lovers Community
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            <Button
              size="small"
              variant="text"
              sx={{ bgcolor: theme.palette.common.white }}
            >
              Join now
            </Button>
          </Box>
          <Image
            height={110}
            width={130}
            style={{ marginTop: -10 }}
            alt="animal lovers"
            src="/animalLover.svg"
          />
        </Box>
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="title2">Top trending tags</Typography>

        <Box mt={3} display="flex" gap={1.5} sx={{ flexWrap: "wrap" }}>
          {MOCK_CHIPS.map((chip) => (
            <Chip label={chip} key={chip} />
          ))}
        </Box>
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="title2">Suggested user</Typography>

        <Box mt={3}>
          {Array.from({ length: 3 }).map((suggestedUser, index) => (
            <Box
              mb={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              key={1 * index}
            >
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: theme.palette.primary.light }}>N</Avatar>
                <Typography ml={2}>Harry James</Typography>
              </Box>
              <Button size="small" variant="contained" color="primary">
                Follow
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;
