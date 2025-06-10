"use client"
import { AlarmClock, Bell,  Grid2X2, Home,  Mail, Package2,  Settings, User2, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Card } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { signOut, useSession } from "next-auth/react";
import { UserRole } from "@/types/next-auth";

export default  function Sidebar({role}:{role:UserRole}) {
//   const categories = (await getCategories()) || [];
const session=useSession()
const user=session.data?.user
const pathname=usePathname()

const roles = {
  VENDOR: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Promotions",
      path: "/dashboard/user/appointments",
      icon: AlarmClock,
    },
    {
      name: "Addresses",
      path: "/dashboard/user/inbox",
      icon: Mail,
    },
    {
      name: "orders",
      path: "/dashboard/user/settings",
      icon: Home,
    },
    {
      name: "Notifications",
      path: "/dashboard/user/settings",
      icon: Home,
    },
  ],
  ADMIN: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Promotion",
      path: "/dashboard/admin/promotions",
      icon: Users,
    },
    {
      name: "Categories",
      path: "/dashboard/admin/categories",
      icon: Users,
    },
    {
      name: "Products",
      path: "/dashboard/admin/products",
      icon: Users,
    },
    {
      name: "Users",
      path: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Shops",
      path: "/dashboard/admin/shop",
      icon: Users,
    },
    {
      name: "Orders",
      path: "/dashboard/admin/orders",
      icon: Grid2X2,
    },

    // {
    //   name:"Settings",
    //   path:"/dashboard/settings",
    //   icon:Settings
    // },
  ],
  CUSTOMER: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Inventory",
      path: "/dashboard/vendor/inventory",
      icon: AlarmClock,
    },
    {
      name: "Orders",
      path: "/dashboard/vendor/orders",
      icon: Users,
    },

    {
      name: "Products",
      path: "/dashboard/vendor/products",
      icon: Mail,
    },
    {
      name: "promotions",
      path: `/dashboard/vendor/promotions`,
      icon: User2,
    },
  ],
};
const router = useRouter();
let sideBarLinks=role? roles[role] : []
async function handleLogout() {
  await signOut();
  router.push("/");
}
return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Ethio Coffee Shop</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sideBarLinks?.map((item,i)=>{
                const Icon=item.icon
                return (
                  <Link
                  key={i}
                  href={item.path}
                  className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",pathname===item.path?"bg-muted text-primary":"")}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
                )
              })}
              
            
              
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle></CardTitle>
                <CardDescription>
                 
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button onClick={handleLogout} size="sm" className="w-full">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}