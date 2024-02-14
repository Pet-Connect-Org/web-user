import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const useGetSession = async () => {
  return await getServerSession(authOptions);
};
