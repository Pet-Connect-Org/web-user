import { logIn, logOut } from "@/app/api/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PCConnectionInstance } from "../..";
import { getMe, getUserById } from "../../user";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const { data: account } = await logIn(credentials);

        if (!account) {
          throw new Error("Invalid credentials");
        }

        PCConnectionInstance.interceptors.request.use(
          (config) => {
            if (account.token) {
              config.headers.Authorization = `Bearer ${account.token}`;
            }
            return config;
          },
          (error) => error
        );

        const {
          data: { user },
        } = await getMe();

        console.log("User ~~ ", user);

        return {
          id: user.id, // Use userId instead of account Id
          name: user?.name,
          email: account.user?.email,
          sex: user.sex,
          address: user.address,
          birthday: user.birthday,
          role: account.user?.role,
          accessToken: account.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    signOut: async () => {
      await logOut();
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const {
        data: { user },
      } = await getUserById(token.sub);

      if (!user) return token;

      token.name = user.name;
      token.email = token.email;
      token.role = token.role;
      token.sex = user.sex;
      token.birthday = user.birthday;
      token.address = user.address;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.sex && session.user) {
        session.user.sex = token.sex;
      }
      if (token.address && session.user) {
        session.user.address = token.address;
      }
      if (token.birthday && session.user) {
        session.user.birthday = token.birthday;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      console.log("Session ~~ ", session);

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };