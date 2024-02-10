import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const tableName = "projects"
export async function GET(request: Request) {
    let response
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const term = searchParams.get("term")

    if (id) {
    response = await supabase.from(tableName).select().eq("id", id).single()
    }
    else {
        response = await supabase.from(tableName).select().ilike('title', `%${term}%`).limit(15)
    }
    // const data = await request.json();
    
    return NextResponse.json(response)
}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    
    const response = await supabase.from(tableName).insert(data).select().single();

    return NextResponse.json(response)   
}

export async function PATCH(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    const response = await supabase.from(tableName).update(data).eq('id', id).select().single();

    return NextResponse.json(response)  
}

export async function DELETE(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    
    const response = await supabase.from(tableName).delete().eq('id', data.id);

    return NextResponse.json(response) 
}