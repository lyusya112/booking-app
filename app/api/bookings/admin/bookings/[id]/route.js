import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const data = await req.json();

  const booking = await prisma.booking.update({
    where: {
      id: Number(params.id),
    },
    data: {
      status: data.status,
    },
  });

  return NextResponse.json(booking);
}
