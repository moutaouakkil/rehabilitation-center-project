const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seed...');
    
    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@healthtrack.com' },
      update: {},
      create: {
        email: 'admin@healthtrack.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', admin);

    // Create services
    console.log('Creating services...');
    const services = [
      {
        id: 1,
        name: 'Physical Therapy',
        description: 'Expert physical therapy services to help you regain strength and mobility.',
        duration: '60 minutes',
        price: '$100'
      },
      {
        id: 2,
        name: 'Occupational Therapy',
        description: 'Specialized therapy to help you return to daily activities and work.',
        duration: '45 minutes',
        price: '$90'
      },
      {
        id: 3,
        name: 'Speech Therapy',
        description: 'Professional speech therapy for communication and swallowing disorders.',
        duration: '45 minutes',
        price: '$85'
      },
      {
        id: 4,
        name: 'Sports Rehabilitation',
        description: 'Targeted rehabilitation programs for athletes and sports enthusiasts.',
        duration: '60 minutes',
        price: '$120'
      }
    ];

    for (const service of services) {
      const createdService = await prisma.service.upsert({
        where: { id: service.id },
        update: service,
        create: service
      });
      console.log('Service created:', createdService);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await prisma.$disconnect();
    } catch (e) {
      console.error('Error disconnecting from database:', e);
      process.exit(1);
    }
  });
