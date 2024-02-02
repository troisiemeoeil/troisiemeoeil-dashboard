'use client';

import Link from "next/link";
import { RocketIcon, ReaderIcon, HomeIcon, DashboardIcon } from '@radix-ui/react-icons'
import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const path = usePathname();

  return (
    <aside className="w-60 border-r border-gray-300 h-screen p-5 fixed left-0 bottom-0 top-0 ">
      <div>
        <Link href={"/admin"}>
          <h1 className="font-bold text-2xl uppercase space-x-3 px-4 text-gray-400">Portfolio</h1>
          <h1 className="font-normal text-sm text-gray-400 px-4">ADMIN</h1>
        </Link>
      </div>
      <div className="mt-5">
        <ul>
            <li className="mb-2">
                <Link href={"/admin"} className={`${path === "/admin" ? 'bg-gray-100' : ''} hover:bg-gray-100 px-3 py-2 rounded text-gray-400 font-semibold hover:text-gray-800 transition duration-200 ease-in-out flex items-center gap-2`}>
                    <DashboardIcon />
                    Dashboard
                </Link>
            </li>
            <li className="mb-2">
                <Link href={"/admin/projects"} className={`${path === "/admin/projects" ? 'bg-gray-100' : ''} hover:bg-gray-100 px-3 py-2 rounded font-semibold  text-gray-400 hover:text-gray-800 flex items-center gap-2 transition duration-200 ease-in-out `}>
                    <RocketIcon />
                    Projects
                </Link>
            </li>
            <li className="mb-2">
                <Link href={"/admin/blogs"} className={`${path === "/admin/blogs" ? 'bg-gray-100' : ''} hover:bg-gray-100 px-3 py-2 rounded text-gray-400 font-semibold  hover:text-gray-800 flex items-center gap-2 transition duration-200 ease-in-out `}>
                    <ReaderIcon />
                    Blogs
                </Link>
            </li>
        </ul>
      </div>
    </aside>
  );
}