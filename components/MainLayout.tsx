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
        <main className="flex h-screen bg-black">
        <SideNavigation />
        <section className="w-full">
          <header className="p-3 fixed z-10 left-60 bg-black border-b right-0">
            <div className="container flex justify-between items-center">
              <div>
                <NavigationHeading />
              </div>
              <div className="flex gap-6 justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-white" asChild>
                    <Button variant={"outline"} className="bg-white text-white"><PlusIcon className="mr-2"/> Create</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white" align="end">
                    <Link href={"/admin/projects/create"}>
                      <DropdownMenuItem className="hover:text-black text-gray-500 hover:bg-gray-300 cursor-pointer">
                        Project
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/admin/blogs/create"}>
                      <DropdownMenuItem className="hover:text-black text-gray-500 hover:bg-gray-300 cursor-pointer">
                        Blog
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {user?.email && user.email[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end">
                    <DropdownMenuItem className="text-gray-500">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <form action={signOut}>
                      <button className="py-2 px-2 text-sm block hover:bg-gray-300 rounded-md no-underline bg-btn-background w-full text-left">
                        Logout
                      </button>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <div className="absolute left-60 p-9 right-0 bottom-0 top-24 right-5">
            <div className="container">
              {children}
            </div>
          </div>
          {/* <div className="p-5 mt-20 max-w-6xl ml-auto mr-auto w-1/2"></div> */}
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