import prisma from "@/lib/prisma";
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

  await fetch(
    "https://api.telegram.org/bot8843359933:AAE_EjODK5-PD6KTTuOJgWH5o2M7pgYD1xo/sendMessage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        chat_id: "8400365300",

        text:
          `🔥 Новая запись!\n\n` +
          `👤 Имя: ${data.name}\n` +
          `📞 Телефон: ${data.phone}\n` +
          `💅 Услуга: ${data.service}\n` +
          `📅 Дата: ${data.date}\n` +
          `⏰ Время: ${data.time}\n` +
          `📝 Комментарий: ${data.comment}`,
      }),
    }
  );

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