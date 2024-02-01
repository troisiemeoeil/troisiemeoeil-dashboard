"use client"


import DataTable from "@/components/Table";
import Link from "next/link";
import { useEffect, useReducer } from "react";

export default function BlogPage() {
  const [response, setResponse] = useReducer((prev: any, next: any)=> {
    return {...prev, ...next}
  }, {
    data: [],
    loading: true
  })


  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs", {
      method: "GET"
    })
    const response = await res.json()
    setResponse({
      loading: false,
      data: response.data
    })
  }

  useEffect(()=> {
 
    fetchBlogs()

  }, [])

  if(response.loading) {
    return (
      <div className="border xl:w-full shadow rounded-md p-4 max-w-sm w-full mx-auto">
  
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-100 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
    )
  }
  return (
   <>
      {response.data.length > 0 ? (
        <>
        <DataTable data={response.data}/>

        </>
      ) : (
        <h1>No Data Found!</h1>
      )
    }
   </>
  )
}
