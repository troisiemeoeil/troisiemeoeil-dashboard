'use client';

import { usePathname } from "next/navigation"

export default function() {
    const path = usePathname();
    const pageNames = path.split("/");
    const heading = pageNames.length > 2 ? pageNames[2] : pageNames[1]
    
    return (
        <h1 className="text-lg text-gray-500 font-semibold capitalize">{heading}</h1>
    )
}