import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const booking = await prisma.booking.create({
    data,
  });

  return NextResponse.json(booking);
}

export async function GET() {
  const bookings = await prisma.booking.findMany();

  return NextResponse.json(bookings);
}