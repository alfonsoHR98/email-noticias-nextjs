import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("/api/notices", { status: 200 });
}
