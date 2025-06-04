"use client";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FiShoppingBag, FiStar,  } from "react-icons/fi";
import {

  LogIn,
 
 
} from "lucide-react";
import Container from "./Container";
import { config } from "@/utils/config";
import { getData } from "@/lib";
import { CategoryProps, ProductProps } from "@/types";

import { store } from "@/lib/store";
import Link from "next/link";
import  ModeToggle  from "../../ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { cn, generateInitials } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
const navLinks = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
 
 
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {data:session,status}=useSession()
  const user=session?.user;
  const initials = generateInitials(user?.name??'User');
  const router=useRouter()
  const pathname=usePathname()
  async function handleLogout(){
    await signOut()
    router.push('/login')
  }
  
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartProduct, favoriteProduct, currentUser } = store();
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  return (
    <div className="w-full bg-whiteText md:sticky md:top-0 z-50">
      
      <header className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {/* <Microscope className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span> */}
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {navLinks.map((item, i) => {
            return (
              <Link
                key={i}
                href={item.link}
                className={cn(
                  " transition-colors hover:text-foreground/80",
                  pathname == item.link
                    ? " text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              {/* <Menu className="h-5 w-5" /> */}
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <Microscope className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.name}
              </span> */}
            </Link>
            <nav className="grid gap-6 text-lg font-medium">
              {navLinks.map((item, i) => {
                return (
                  <Link
                    key={i}
                    href={item.link}
                    className={cn(
                      "flex items-center gap-2 text-lg font-semibold transition-colors hover:text-foreground/80",
                      pathname == item.link
                        ? " text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SearchBar />
          <Link href={"/favorite"} className="relative block">
            <FiStar className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {favoriteProduct?.length > 0 ? favoriteProduct?.length : "0"}
            </span>
          </Link>
          <Link href={"/cart"} className="relative block">
            <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {cartProduct?.length > 0 ? cartProduct?.length : "0"}
            </span>
          </Link>
          <ModeToggle />
          {session && user && user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.image ? (
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href={"/login"}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </header>
      <div className="w-full bg-darkText text-whiteText">
        <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText">
              Select Category <FaChevronDown className="text-base mt-1" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50"
              >
                {categories.map((item: CategoryProps) => (
                  <MenuItem key={item?.id}>
                    <Link
                      href={`/category/${item?.id}`}
                      className="flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide"
                    >
                      <img
                        src={item?.imageUrl}
                        alt="categoryImage"
                        className="w-6 h-6 rounded-md"
                      />
                      {item?.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
          {navLinks.map(({ title, link }) => (
            <Link
              href={link}
              key={title}
              className="uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group"
            >
              {title}
              <span className="inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300" />
            </Link>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Header;
