import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const BookingSchema = z.object({
  roomSlug: z.string().min(1),
  roomName: z.string().min(1),
  guestName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20),
  specialReq: z.string().optional().nullable(),
  totalAmount: z.number().int().min(0),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid booking data" },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // prevent check-out before check-in
    if (new Date(data.checkOut) <= new Date(data.checkIn)) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        roomSlug: data.roomSlug,
        roomName: data.roomName,
        guestName: data.guestName,
        email: data.email,
        phone: data.phone,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adults: data.adults,
        children: data.children,
        specialReq: data.specialReq ?? null,
        totalAmount: data.totalAmount,
        status: "confirmed",
      },
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        message: "Booking confirmed. Our reservations team will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Unable to process booking. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const where = email ? { email } : {};
    const bookings = await db.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
