import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const serviceStats = await prisma.appointment.groupBy({
      by: ['serviceId'],
      _count: true
    });

    // Get service names
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: serviceStats.map(stat => stat.serviceId)
        }
      }
    });

    // Map service IDs to names and counts
    const stats = serviceStats.map(stat => {
      const service = services.find(s => s.id === stat.serviceId);
      return {
        name: service?.name || 'Unknown Service',
        count: stat._count
      };
    });

    return NextResponse.json({
      labels: stats.map(s => s.name),
      data: stats.map(s => s.count)
    });
  } catch (error) {
    console.error('Error fetching service stats:', error);
    return NextResponse.json(
      { error: "Failed to fetch service stats" },
      { status: 500 }
    );
  }
}
