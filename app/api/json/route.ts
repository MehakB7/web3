import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/pinata";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const uploadData = await pinata.upload.json(data );
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
