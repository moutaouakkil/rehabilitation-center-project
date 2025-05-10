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

    // Get the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const appointments = await prisma.appointment.groupBy({
      by: ['date'],
      where: {
        date: {
          gte: sixMonthsAgo
        }
      },
      _count: true,
      orderBy: {
        date: 'asc'
      }
    });

    // Process data into monthly counts
    const monthlyData = appointments.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + curr._count;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      labels: Object.keys(monthlyData),
      data: Object.values(monthlyData)
    });
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
    return NextResponse.json(
      { error: "Failed to fetch monthly stats" },
      { status: 500 }
    );
  }
}
