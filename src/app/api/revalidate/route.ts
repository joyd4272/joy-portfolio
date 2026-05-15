import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.text();

  if (!signature || !isValidSignature(body, signature, secret)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let payload: { _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const type = payload._type;
  if (!type) {
    return NextResponse.json({ message: "Missing _type" }, { status: 400 });
  }

  revalidateTag(type, "max");
  return NextResponse.json({ revalidated: true, type });
}
