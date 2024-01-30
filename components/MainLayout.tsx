import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideNavigation from "./SideNavigation";
import { ReactNode } from "react";
import NavigationHeading from "./NavigationHeading";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


 interface MainLayoutProps {
  children : ReactNode
 }

export default async function MainLayout({children}: MainLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
   return redirect("/login")
  }
      return (
          <main className="flex bg-black h-screen ">
        <SideNavigation />
        <section className="w-full p-2  ">
        <header className="p-3  fixed z-10 left-60  border-b right-0">
          <div className="container flex justify-between items-center">
            <div>
             <NavigationHeading />
            </div>
            <div className="flex gap-6 justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}><PlusIcon className="mr-2"/> Create</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white" align="end">
                  <Link href={"/admin/projects/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Project
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Blog
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            <DropdownMenu >
      <DropdownMenuTrigger asChild>
            <Avatar className=" cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{user?.email && user.email[0]}</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-10 bg-white"  align="end">
      <DropdownMenuItem className=" cursor-pointer">
         {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
            </div>
          </div>
            </header>
         {children}
        </section>
          </main>
        )
  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );
}
