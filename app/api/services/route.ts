import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database and test connection
    console.log('API: Testing database connection...');
    await prisma.$connect();
    console.log('API: Database connected successfully');
    
    // Count services first
    const count = await prisma.service.count();
    console.log('API: Number of services:', count);
    
    // Create default services if none exist
    if (count === 0) {
      console.log('API: No services found, creating defaults...');
      const defaultServices = [
        {
          name: 'Physical Therapy',
          description: 'Expert physical therapy services to help you regain strength and mobility.',
          duration: '60 minutes',
          price: '$100'
        },
        {
          name: 'Occupational Therapy',
          description: 'Specialized therapy to help you return to daily activities and work.',
          duration: '45 minutes',
          price: '$90'
        },
        {
          name: 'Speech Therapy',
          description: 'Professional speech therapy for communication and swallowing disorders.',
          duration: '45 minutes',
          price: '$85'
        },
        {
          name: 'Sports Rehabilitation',
          description: 'Targeted rehabilitation programs for athletes and sports enthusiasts.',
          duration: '60 minutes',
          price: '$120'
        }
      ];
      
      const services = await Promise.all(
        defaultServices.map(service => 
          prisma.service.create({ data: service })
        )
      );
      console.log('API: Created default services:', JSON.stringify(services, null, 2));
      return NextResponse.json(services);
    }
    
    // Fetch all services
    const services = await prisma.service.findMany();
    console.log('API: Services found:', JSON.stringify(services, null, 2));
    
    if (!services || services.length === 0) {
      // Create default services if none exist
      const defaultServices = [
        {
          name: 'Physical Therapy',
          description: 'Expert physical therapy services to help you regain strength and mobility.',
          duration: '60 minutes',
          price: '$100'
        },
        {
          name: 'Occupational Therapy',
          description: 'Specialized therapy to help you return to daily activities and work.',
          duration: '45 minutes',
          price: '$90'
        },
        {
          name: 'Speech Therapy',
          description: 'Professional speech therapy for communication and swallowing disorders.',
          duration: '45 minutes',
          price: '$85'
        },
        {
          name: 'Sports Rehabilitation',
          description: 'Targeted rehabilitation programs for athletes and sports enthusiasts.',
          duration: '60 minutes',
          price: '$120'
        }
      ];

      const createdServices = await Promise.all(
        defaultServices.map(service => 
          prisma.service.create({ data: service })
        )
      );
      console.log('API: Created default services:', createdServices);
      return NextResponse.json(createdServices);
    }
    
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const service = await prisma.service.create({
      data: json,
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
