import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

type AppointmentWithService = {
  service: {
    name: string;
  };
};

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: session.user.id, // Only get current user's appointments
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    // Count appointments by service type
    const serviceData = appointments.reduce((acc: { [key: string]: number }, appointment: AppointmentWithService) => {
      const serviceName = appointment.service.name;
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    // Convert to arrays for chart.js
    const labels = Object.keys(serviceData);
    const data = Object.values(serviceData);

    return NextResponse.json({ labels, data });
  } catch (error) {
    console.error('Error fetching service stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service statistics' },
      { status: 500 }
    );
  }
}
