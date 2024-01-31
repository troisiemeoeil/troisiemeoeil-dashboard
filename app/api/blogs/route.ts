import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {

//     return NextResponse.json(response)
// }

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    
    const response = await supabase.from("blogs").insert({
        title: data.title,
        content: data.content
    }).select().single();

    return NextResponse.json(response)   
}

// export async function PATCH(request: Request) {
//     const cookieStore = cookies();
//     const supabase = createClient(cookieStore);
//     const data = await request.json();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
    
//     const response = await supabase.from("blogs").update(data).eq('id', id).select().single();

//     return NextResponse.json(response)  
// }

// export async function DELETE(request: Request) {
//     const cookieStore = cookies();
//     const supabase = createClient(cookieStore);
//     const data = await request.json();
    
//     const response = await supabase.from("blogs").delete().eq('id', data.id);

//     return NextResponse.json(response) 
// }