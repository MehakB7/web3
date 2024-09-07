import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/pinata";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request: NextRequest) {
  try {
    const nw = await fetch("https://api.pinata.cloud/data/pinList?hashContains=bafybeig45y5ekxollrdiqnflxw6mp56zfcxtozxi3hvichoglzg5yb57ru");
    const res = await nw.json();
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
