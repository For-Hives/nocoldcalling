import NextAuth, { AuthOptions, DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prismaClient } from "@/lib/prisma";
import { compare } from "bcryptjs";

const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<DefaultUser | null> {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
        } satisfies DefaultUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


