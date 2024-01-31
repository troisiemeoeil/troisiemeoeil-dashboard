"use client";
// @ts-ignore
import { Editor, editorProps } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { useCallback, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Select, { MultiValue, OptionProps } from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import check from  "@app/assets/check.png"





export default function BlogForm({id}: {id : string}) {
  const router = useRouter()


const [blogForm, setBlogForm] = useReducer((prev: any, next: any)=> {
  return {...prev, ...next};
}, {
  title : "",
  content : "",
  description : "",
})
const [blogTitle, setBlogTitle] = useState("")  
const [blogContent, setBlogContent] = useState("")  


const updateContent = useCallback((data: editorProps) => {
  
  setBlogForm({content: data.getJSON()})

}, [])

const onSubmit = async () => {
  const req = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(blogForm) 
  })

  const response = await req.json()

  if (response?.data?.id) {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center ">
          <div className="flex-shrink-0 ">
            <Avatar  className="p-1">
              <AvatarImage src="https://onkeenjmkuvoigdvczqk.supabase.co/storage/v1/object/sign/troisiemeoeil-bucket/check2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cm9pc2llbWVvZWlsLWJ1Y2tldC9jaGVjazIucG5nIiwiaWF0IjoxNzA2NzI1OTU2LCJleHAiOjQ5MDEwNzI1OTU2fQ.XA7p1TvuhMUccHlq38D7Ku1tKk1jSCwbYAK99VPbLVE&t=2024-01-31T18%3A32%3A30.480Z" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
           
            <div className="ml-3 flex-1">
              <p className="text-md font-medium text-gray-900">
                Article was Successfully published
              </p>
             
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              router.push("/admin/blogs")
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            See All
          </button>
        </div>
      </div>
    ))
    // 
  }

  console.log(blogTitle, blogContent);
  
}
  return (
    <>
     <Toaster />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          type="text"
          placeholder="Insert the article title here"
          value={blogForm.title}
          onChange={(e)=> {
            setBlogForm({title: e.target.value})
          }}
        />
      </div>


      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <Input 
          type="text"
          placeholder="Insert the article description here"
          value={blogForm.description}
          onChange={(e)=> {
            setBlogForm({description: e.target.value})
          }}
        />
      </div>


      <div className="mt-5">
      <Label htmlFor="content">Content</Label>
      <Editor
      editorProps={{}}
      onDebouncedUpdate={updateContent}
      defaultValue={blogForm.content}
      disableLocalStorage
      className="border rounded pb-8 mt-2"
      />
      </div>

      <div className="mt-4 text-right">
        <Button variant={"secondary"}>Cancel</Button>
        <Button className="ml-5" onClick={onSubmit}>
          <CheckIcon className="mr-2 " />
          Save
        </Button>

      </div>
    </>
  );
}