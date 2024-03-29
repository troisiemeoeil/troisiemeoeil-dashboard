import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const bucketName = 'troisiemeoeil-bucket';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const file = await request.blob();
    const header = headers();
    const fileName = header.get("X-Vercel-Filename");

    if(fileName) {
        await supabase.storage.from(bucketName).upload(fileName, file, {
            cacheControl: '10', // The image will be cached for 5 minutes
            upsert: false
          });

        const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        return NextResponse.json({
            url: data.publicUrl
        })
    }

    return NextResponse.json({
        url: ''
    })
} 