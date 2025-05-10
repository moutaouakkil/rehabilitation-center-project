import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

type AppointmentWithDate = {
  date: Date;
};

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Get appointments for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: sixMonthsAgo,
        },
        userId: session.user.id, // Only get current user's appointments
      },
      select: {
        date: true,
      },
    });

    // Group appointments by month
    const monthlyData = appointments.reduce((acc: { [key: string]: number }, appointment: AppointmentWithDate) => {
      const month = new Date(appointment.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});    // Sort months chronologically
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = new Date().getMonth();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      return months[monthIndex];
    }).reverse();

    // Create ordered data array
    const labels = last6Months;
    const data = labels.map(month => monthlyData[month] || 0);

    return NextResponse.json({ labels, data });
  } catch (error) {
    console.error('Error fetching appointment stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment statistics' },
      { status: 500 }
    );
  }
}
