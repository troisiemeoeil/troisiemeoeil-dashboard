"use client";
// @ts-ignore
import { Editor, editorProps } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Select, { MultiValue, OptionProps } from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";





export default function BlogForm() {
  const router = useRouter()

const [blogTitle, setBlogTitle] = useState("")  
const [blogContent, setBlogContent] = useState("")  


const updateContent = useCallback((data: editorProps) => {
  setBlogContent(data.getJSON())
}, [])

const onSubmit = async () => {
  const req = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: blogTitle,
      content: blogContent
    }) 
  })

  const response = await req.json()
  if (response?.data?.id) {
    router.push("/admin/blogs")
  }

  console.log(blogTitle, blogContent);
  
}
  return (
    <>
      <div>
        <Label htmlFor="text">Title</Label>
        <Input 
          type="text"
          placeholder="Insert your title here"
          value={blogTitle}
          onChange={(e)=> {
            setBlogTitle(e.target.value)
          }}
        />
      </div>


      <div className="mt-5">
      <Label htmlFor="email">Content</Label>
      <Editor
      editorProps={{}}
      onDebouncedUpdate={updateContent}
      defaultValue={blogContent}
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