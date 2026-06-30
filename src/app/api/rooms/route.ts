import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const rooms = await db.room.findMany({
      orderBy: { price: "asc" },
    });
    return NextResponse.json(
      rooms.map((r) => ({
        ...r,
        amenities: r.amenities ? r.amenities.split("|") : [],
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load rooms" },
      { status: 500 }
    );
  }
}
