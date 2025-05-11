import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const domainOrCert = searchParams.get("query");
const DOMAIN_REGEX = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|localhost(:\d+)?$/;

  if (!domainOrCert) {
    return NextResponse.json({ error: "no_query" }, { status: 400 });
  }

  const isDomain = DOMAIN_REGEX.test(domainOrCert);
  const url = isDomain
    ? `/service/certificate?domain=${domainOrCert}`
    : `/service/certificate/number?certNumber=${domainOrCert}`;

  try {
    const apiResp = await axios.get(process.env.DOMAIN + url);

    return NextResponse.json(apiResp.data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
