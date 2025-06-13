// authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
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

          // Call the login endpoint with POST request
          const response = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const loginResponse = await response.json();
          console.log("auth", loginResponse);

          if (!response.ok || !loginResponse) {
            console.log("Login failed");
            throw { error: "Invalid credentials", status: 401 };
          }

          console.log("Pass 2 Checked");
          console.log(loginResponse);

          // Verify password (if backend doesn't handle it)
          let passwordMatch = false;
          if (loginResponse.password) {
            passwordMatch = await compare(
              credentials.password,
              loginResponse.password
            );
          } else if (loginResponse.access_token) {
            // If backend returns a JWT, assume authentication is handled
            passwordMatch = true;
          }

          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");

          // Construct user object for NextAuth
          const user = {
            id: loginResponse.id || loginResponse.user?.id,
            name: loginResponse.name || loginResponse.user?.name,
            email: loginResponse.email || loginResponse.user?.email,
            role: loginResponse.role || loginResponse.user?.role,
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
      // If user is provided (initial sign-in), update token
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          picture: user.image,
        };
      }
      // For subsequent requests, fetch user data if needed
      const response = await fetch(
        `http://localhost:8000/users/by-email?email=${encodeURIComponent(
          token?.email ?? ""
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token || ""}`,
          },
        }
      );

      const {access_token,user:data} = await response.json();

      if (!response.ok || !data) {
        return token; // Fallback to existing token
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        picture: data.image,
        access_token
      };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.access_token=token.access_token
      }
      return session;
    },
  },
};
