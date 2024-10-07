import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { Notice, DataSend } from "@interface/notice";

const API_KEY = process.env.NEWS_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const data: DataSend = await req.json();

    let query = "";
    let type = "";

    if (data.selected === true) {
      type = "everything";
      query = `q=${data.q}&language=${data.language}&sortBy=${data.sortBy}&from=${data.from}&to=${data.to}`;
    } else {
      type = "top-headlines";
      query = `country=${data.country}&category=${data.category}`;
    }

    if (!API_KEY) {
      throw new Error("API_KEY is not defined");
    }

    const url = `https://newsapi.org/v2/${type}?${query}&apiKey=${API_KEY}`;

    const response = await axios.get<Notice>(url);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error occurred");
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
