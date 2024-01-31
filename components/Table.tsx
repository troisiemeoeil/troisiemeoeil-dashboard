
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from "next/link"
export default function DataTable({data }: any) {
 

    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-sm text-gray-700  uppercase bg-gray-300 h-[4rem]  ">
            <tr>
                <th scope="col" className="px-6  py-3">
                Cover Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                Description 
                </th>
                <th scope="col" className="px-6 py-3">
                    Tags
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
     {
           data.map((d: {title : string, id: string, description: string}) => (
            <tr className="bg-white border-b hover:bg-gray-100 " key={d?.id}>
                <th scope="row" className="px-6 py-4 flex ml-6 font-medium text-gray-900  whitespace-nowrap ">
                <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {d?.title}
                      </AvatarFallback>
                    </Avatar>
                </th>
                <td className="px-6 py-4">
                                       {d?.title}

                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4 text-right">
                <Link
          href={`/admin/blogs/${d.id}`}
          className="font-medium text-blue-600  hover:underline"
         >
            Edit
          </Link>
                </td>
            </tr>
        ))
     }
         
           
        </tbody>
    </table>
</div>

  )
}
