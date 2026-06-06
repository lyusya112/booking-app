import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      comment: data.comment,
    },
  });

  return NextResponse.json(booking);
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookings);
}