import { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Note: If you're using PrismaAdapter, you'll need to replace it with a custom adapter or remove it
  // adapter: PrismaAdapter(prismaClient) as Adapter, // Remove or replace with a custom adapter
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(
            "Authorize function called with credentials:",
            credentials
          );
          // Check if user credentials are provided
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          console.log("Pass 1 checked");

          // Fetch user from backend API instead of Prisma
          const response = await fetch(
            `${process.env.API_URL}/api/user/find?email=${encodeURIComponent(
              credentials.email
            )}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          const existingUser = await response.json();

          if (!response.ok || !existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 401 };
          }

          console.log("Pass 2 Checked");
          console.log(existingUser);

          let passwordMatch: boolean = false;
          // Check if password is correct
          if (existingUser && existingUser.password) {
            passwordMatch = await compare(
              credentials.password,
              existingUser.password
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");

          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };

          console.log("User Compiled");
          console.log(user);
          return user;
        } catch (error) {
          console.log("All Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
    // Add other providers like GoogleProvider, EmailProvider if needed
    // GoogleProvider({...}),
    // EmailProvider({...}),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Fetch user from backend API instead of Prisma
      const response = await fetch(
        `${process.env.API_URL}/api/user/find-first?email=${encodeURIComponent(
          token?.email ?? ""
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const dbUser = await response.json();

      if (!response.ok || !dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
      };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
