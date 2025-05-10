import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        service: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });    console.log('Fetched appointments:', appointments);
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error in GET /api/appointments:', error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const json = await request.json();
    console.log('Creating appointment with data:', { ...json, userId: user.id });

    // Validate input
    if (!json.serviceId || !json.date || !json.time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        serviceId: json.serviceId,
        date: new Date(json.date),
        time: json.time,
        status: json.status || 'PENDING',
        userId: user.id,
      },
      include: {
        service: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    console.log('Created appointment:', appointment);
    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error in POST /api/appointments:', error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}


