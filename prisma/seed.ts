import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@healthtrack.com' },
    update: {},
    create: {
      email: 'admin@healthtrack.com',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  })
  // Create services
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
  ]
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service
    })
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    try {
      await prisma.$disconnect()
    } catch (e) {
      console.error('Error disconnecting from database:', e)
      process.exit(1)
    }
  })
