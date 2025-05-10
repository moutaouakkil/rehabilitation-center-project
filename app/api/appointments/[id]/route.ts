import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const appointmentId = params.id;

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

    // Check if the appointment exists and belongs to the user
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    if (appointment.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Not authorized to cancel this appointment" },
        { status: 403 }
      );
    }

    // Delete the appointment
    await prisma.appointment.delete({
      where: { id: appointmentId }
    });

    return NextResponse.json(
      { message: "Appointment cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/appointments:', error);
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}
