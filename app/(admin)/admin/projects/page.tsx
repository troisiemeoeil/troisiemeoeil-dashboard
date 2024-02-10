"use client"


import DataTable from "@/components/Table";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useCallback, useEffect, useReducer } from "react";
import debounce from "lodash.debounce"



export default function ProjectsPage() {
  const [response, setResponse] = useReducer((prev: any, next: any)=> {
    return {...prev, ...next}
  }, {
    data: [],
    loading: true,
    searchTerm: "",

  })


  const fetchProjects = async (value: string = "") => {
    const res = await fetch(`/api/projects?term=${value}`, {
      method: "GET"
    })
    const response = await res.json()
    setResponse({
      loading: false,
      data: response.data
    })
  }

  useEffect(()=> {
 
    fetchProjects()

  }, [])
  const searchTerm = (e: HTMLInputElement) => {
    setResponse({searchTerm: e.target.value})
    debounceAPI(e.target.value)
  }
  
  const debounceAPI = useCallback(debounce((value: string)=> {
    fetchProjects(value), 10
  }), [])

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
      <div className="flex mb-8">
      <div className="relative">
        
        <MagnifyingGlassIcon className="absolute top-2.5 left-2 text-gray-400"/>
      <Input type="text" placeholder="Search Projects" className="pl-6" onChange={searchTerm} />
      </div>
      <div></div>
    </div>
      {response.data.length > 0 ? (
        <>
        <DataTable data={response.data} variant={"projects"}/>

        </>
      ) : (
        <h1>No Data Found!</h1>
      )
    }
   </>
  )
}
