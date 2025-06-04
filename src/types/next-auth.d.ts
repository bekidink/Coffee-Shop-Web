import NextAuth from "next-auth";
export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR"
import type { User } from "next-auth";
import "next-auth/jwt";
type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
  }
}
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
    };
  }
}