import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db/connection";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          console.log("🔍 Attempting to authenticate user:", credentials.email);
          
          // Find user by email
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .limit(1);

          if (!user.length) {
            console.log("❌ User not found:", credentials.email);
            return null;
          }

          const foundUser = user[0];
          console.log("✅ Found user:", foundUser.email, "ID:", foundUser.id);

          // Check if user has a password
          if (!foundUser.password) {
            console.log("❌ User has no password set:", credentials.email);
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            foundUser.password
          );

          if (!isPasswordValid) {
            console.log("❌ Invalid password for user:", credentials.email);
            return null;
          }

          console.log("✅ User authenticated successfully:", foundUser.email);
          return {
            id: foundUser.id.toString(),
            email: foundUser.email,
            name: foundUser.name,
          };
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔄 NextAuth redirect called:", { url, baseUrl });
      
      // If url is relative, make it absolute
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("✅ Relative URL redirect:", redirectUrl);
        return redirectUrl;
      }
      
      // If url is on the same origin, allow it
      try {
        const urlOrigin = new URL(url).origin;
        if (urlOrigin === baseUrl) {
          console.log("✅ Same origin redirect:", url);
          return url;
        }
      } catch (error) {
        console.log("❌ Invalid URL:", url, error);
      }
      
      // Default redirect to dashboard
      const defaultRedirect = `${baseUrl}/dashboard`;
      console.log("✅ Default redirect to dashboard:", defaultRedirect);
      return defaultRedirect;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/", // 退出后重定向到首页
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === 'development',
  // Use secure cookies in production
  useSecureCookies: process.env.NODE_ENV === 'production',
  // Trust host for production
  trustHost: process.env.NODE_ENV === 'production',
};
