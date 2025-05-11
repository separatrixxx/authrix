import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.domain || !body.name) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const DOMAIN = process.env.DOMAIN;

    const apiResp = await axios.post(`${DOMAIN}/service/register`, {
      domain: body.domain,
      name: body.name,
    });

    return NextResponse.json(apiResp.data, { status: 200 });
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      const status = e.response?.status || 500;
      return NextResponse.json({ error: e.response?.data || 'register_service_error' }, { status });
    }

    return NextResponse.json({ error: 'register_service_error' }, { status: 500 });
  }
}
