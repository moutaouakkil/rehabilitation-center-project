# HealthTrack Rehabilitation Center

A modern web application for managing rehabilitation center services, appointments, and patient records, built with Next.js 14 and TypeScript.

## Features

- User authentication and profile management
- Service booking and appointment scheduling
- Comprehensive appointment management (create, view, cancel)
- Role-based access control (Admin, Staff, Patient)
- Responsive design with Tailwind CSS
- Server-side rendering with Next.js App Router
- Secure API endpoints with NextAuth.js
- SQLite database with Prisma ORM

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Testing**: Postman (API Testing)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moutaouakkil/rehabilitation-center-project.git
   cd rehabilitation-center-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Create a `.env.local` file in the root directory:
   ```
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /api              # API routes
    /admin         # Admin-only endpoints
    /appointments  # Appointment management
    /auth         # Authentication endpoints
    /services     # Service endpoints
  /auth           # Authentication pages
  /appointments   # Appointment management UI
  /booking        # Service booking
  /components     # Shared components
/lib
  auth.ts         # Authentication configuration
  prisma.ts       # Database client
/prisma
  schema.prisma   # Database schema
  migrations/     # Database migrations
/types           # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js routes

### Appointments
- `GET /api/appointments` - List user's appointments
- `POST /api/appointments` - Create new appointment
- `DELETE /api/appointments/{id}` - Cancel appointment
- `GET /api/admin/appointments` - List all appointments (admin only)

### Services
- `GET /api/services` - List available services
- `POST /api/services` - Add new service (admin only)

### Users
- `GET /api/admin/users` - List all users (admin only)
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user information

## Testing

The API can be tested using Postman:

1. Import the API collection
2. Set up environment variables:
   - `base_url`: http://localhost:3000
   - `auth_token`: (obtained after login)

3. Run the test scenarios:
   - Authentication flow
   - Appointment management
   - Service operations
   - User management

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure environment variables:
   ```
   DATABASE_URL="your-production-db-url"
   NEXTAUTH_SECRET="your-production-secret"
   NEXTAUTH_URL="https://your-domain.com"
   ```
4. Deploy and verify the endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
