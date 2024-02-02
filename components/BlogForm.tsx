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
import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";

type Variants = 'blogs' | 'projects'

interface BlogFormProps {
  id?: string,
  variant?: Variants,
  value?: {
    title: string,
    description: string,
    content: string,
    tags: string[],
    cover_url: string,
    author: string,
  }
}


export default function BlogForm({id, value, variant = 'blogs'}: BlogFormProps) {
  const router = useRouter()
  const thummbnailImage = "https://onkeenjmkuvoigdvczqk.supabase.co/storage/v1/object/public/troisiemeoeil-bucket/opengraph-image%20(1).png"

const [blogForm, setBlogForm] = useReducer((prev: any, next: any)=> {
  return {...prev, ...next};
}, {
  title : value?.title || "",
  content : value?.content || "",
  description : value?.description || "",
  tags: value?.tags || [],
  cover_url: value?.cover_url || thummbnailImage,
  author: "TROISIEME OEIL DIGITAL"

})

const blogTags = [
  {
    label: "Database",
    value: "Database",
    name: "Database"
  }, 
  {
    label: "Business Technology",
    value: "Business Technology",
    name: "Business Technology"
  },
  {
    label: "T3 Stack",
    value: "T3 Stack",
    name: "T3 Stack"
  }
]

const getDefaultValues = (value: string[]) => {
  if (value.length > 0) {
    return value.map((v) => {
      return {
        label: v,
        name: v,
        value: v,
      }
    })
  }
  return []
}

const uploadCoverImage = async (e: EventTarget) => {
  const file = e.target.files[0] 
  const response = await fetch(`/api/upload`, {
    method: "POST",
    headers: {
      "Content-type": file.type,
      "X-Vercel-Filename": file.name
    },
    body: JSON.stringify(blogForm) 
  }).then((res) => res.json())

  setBlogForm({
    cover_url : response.url
  })

}

const updateContent = useCallback((data: editorProps) => {
  setBlogForm({content: data.getJSON()})
}, [])

const onSubmitBlog = async () => {
  let req
  if (id) {
     req = await fetch(`/api/blogs?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(blogForm) 
    })
  }
  else {
     req = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(blogForm) 
    })
  }
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
              setTimeout(()=> {
                router.push("/admin/blogs")
              },1000)
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


}

const onSubmitProjects = async () => {
  let req
  if (id) {
     req = await fetch(`/api/projects?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(blogForm) 
    })
  }
  else {
     req = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(blogForm) 
    })
  }
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
                Project was Successfully published
              </p>
             
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              setTimeout(()=> {
                router.push("/admin/projects")
              },1000)
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


}


  return (
    <>
     <Toaster />
      <div>
        <Label htmlFor="title" className=" capitalize">{variant} Title</Label>
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
        <Label htmlFor="description" className=" capitalize">{variant} Description</Label>
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
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture" className=" capitalize">{variant} Cover</Label>
      <div className="max-w-[800px] ">
        {blogForm.cover_url && (
         <img src={blogForm.cover_url} alt="article cover image" className="w-full h-auto rounded-md" />
        )}
    
      </div>
      <Input id="picture" type="file"
        onChange={uploadCoverImage}
      />
      </div>
      </div>


      <div className="mt-5">
      <Label htmlFor="content" className=" capitalize"> {variant} Content</Label>
      <Editor
      editorProps={{}}
      onDebouncedUpdate={updateContent}
      defaultValue={blogForm.content}
      disableLocalStorage
      className="border rounded pb-8 mt-2"
      />
      </div>

      <div className="mt-5">
      <Label htmlFor="tags" className=" capitalize">{variant} Tags</Label>
      <Select
      defaultValue={getDefaultValues(blogForm.tags)}
      isMulti
      name="tags"
      options={blogTags}
      onChange={(value: { name: string }) => {
        const tags = value.map((v: { name: string }) => v?.name);
        setBlogForm({ tags: tags });
        }}
        className="basic-multi-select"
        classNamePrefix="select"
  />
      </div>

      <div className="mt-4 text-right">
        <Button variant={"secondary"} onClick={()=> {
          router.push(`/admin/${variant}`)
        }}>Cancel</Button>
        <Button className="ml-5" onClick={()=> {
            variant === 'blogs' ? onSubmitBlog() : onSubmitProjects()
        }}>
          <CheckIcon className="mr-2 " />
          Save
        </Button>

      </div>
    </>
  );
}