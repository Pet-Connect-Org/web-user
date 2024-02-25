import { Box } from "@mui/material";
import { useGetSession } from "../hooks/useGetSession";
import Client from "../providers/ClientProvider";
import Topbar from "./_components/topbar";
import { notFound } from "next/navigation";
import { theme } from "../theme";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await useGetSession();

  if (!data?.user) {
    return notFound;
  }
  return (
    <Client data={data as any}>
      <Box
        height="100vh"
        maxHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <Topbar />
        <Box py={3} bgcolor="#F1F3F5" flex={1}>
          {children}
        </Box>
      </Box>
    </Client>
  );
}
