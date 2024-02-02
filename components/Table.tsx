
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import toast, { Toaster } from 'react-hot-toast';
import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
  import {Button} from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react";
export default function DataTable({data, variant }: any) {
const [articles, setArticles] = useState(data);


 const deleteArticle = async (id: string) => {
    const res = await fetch(`/api/${variant}`, {
        method: "DELETE", 
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({id})
      });
      const response = await res.json()
      setArticles((prevArticles: any) =>
      prevArticles.filter((article : any) => article.id !== id))
      toast.success('Article Successfully Deleted!')
 }


    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Toaster />
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
                    Author
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
     {
           articles.map((d: {title : string, id: string, description: string, tags: string[], author: string, cover_url: string}) => (
            <tr className="bg-white border-b hover:bg-gray-100 " key={d?.id}>
                <th scope="row" className="px-6 py-4 flex ml-6 font-medium text-gray-900  whitespace-nowrap ">
                <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={d?.cover_url||"https://github.com/shadcn.png" }
                        alt="@shadcn"
                        style={{width:"100%", height: "100%"}}
                      />
                      <AvatarFallback>
                        {d?.title}
                      </AvatarFallback>
                    </Avatar>
                </th>
                <td className="px-6 py-4 capitalize">
                                       {d?.title}

                </td>
                <td className="px-6 py-4 capitalize w-[20rem]">
                {d?.description ? d?.description : "No available description"}

                </td>
                <td className="px-6 py-4">
                {d?.tags ? (
                    d?.tags.map((i: any) => (
                      <Badge className="m-1" key={i}>
                        {i}
                      </Badge>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </td>
                <td className="px-6 py-4 capitalize">
                {d?.author ? d?.author : "TROISIEME OEIL DIGITAL"}

                </td>
                <td className="px-6 py-4 text-right">

                <DropdownMenu>
                  <DropdownMenuTrigger  asChild>
                      <div className="w-[50%] flex items-center rounded  bg-white  shadow-sm hover:bg-accent hover:text-accent-foreground">
                    <Button variant={"custom"} className="w-full">
                       •••
                    </Button>
                      </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white" align="end">
                   
                      <Link
                            href={`/admin/${variant}/${d.id}`}
                            className="font-medium text-gray-400 w-full flex items-center gap-1 "
                            >
                                <Button variant={"ghost"} className=" hover:bg-gray-200 w-full flex justify-start">
                                <Pencil2Icon className="mr-2 h-4 w-4" /> Edit
                                </Button>
                            </Link>
                
                      <Dialog>
                            <DialogTrigger asChild>
                            <Button variant={"ghost"} className="text-red-500 hover:bg-gray-200 w-full flex justify-start">
                                
                            <TrashIcon className="mr-2 h-4 w-4" /> Delete
                            </Button>

                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                            <DialogTitle className="text-red-500">Remove Article</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete the following article: 
                                <br/>
                                <code className="ml-4">
                                {d?.title}
                                </code>
                            </DialogDescription>
                            </DialogHeader>
                            <div className="w-full flex justify-center">
                            <DialogFooter >
                            <Button className="hover:bg-red-500 hover:text-white" type="button" onClick={()=> {
                                deleteArticle(d?.id)
                            }}>Permenantly Delete?</Button>
                            </DialogFooter>
                            </div>
                        </DialogContent>
                        </Dialog>

                  </DropdownMenuContent>
                </DropdownMenu>
               
                </td>
            </tr>
        ))
     }
         
           
        </tbody>
    </table>
</div>

  )
}
