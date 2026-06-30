import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const msg = await db.contactMessage.create({ data: parsed.data });
    return NextResponse.json(
      { success: true, id: msg.id, message: "Thank you. We will get back to you soon." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to send message. Please try again." },
      { status: 500 }
    );
  }
}
