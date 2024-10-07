import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { Notice } from "@interface/notice";

const API_KEY = process.env.NEWS_API_KEY;

export async function GET(req: NextRequest) {
  try {
    if (!API_KEY) {
      throw new Error("API_KEY is not defined");
    }
    const response = await axios.get<Notice>(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}