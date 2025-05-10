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

## Dashboard

The admin dashboard provides visualization of key metrics and data export functionality:

### Metrics

1. **Monthly Appointments**
   - Bar chart showing appointment count per month
   - Last 6 months of data
   - Helps track booking trends and capacity planning

2. **Service Distribution**
   - Doughnut chart showing appointment distribution by service type
   - Helps understand service demand and resource allocation

### Charts Implementation

- Built using Chart.js with react-chartjs-2 wrapper
- Responsive design with automatic resizing
- Interactive tooltips and legends
- Proper axis labels and titles

### Data Export

- PDF format export with high-quality charts
- Includes both metrics in a professional layout
- Downloadable with a single click
- Custom styling and branding

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Charts**: Chart.js & react-chartjs-2
- **PDF Export**: jsPDF
- **Testing**: Postman (API Testing)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/rehabilitation-center-project.git
   cd rehabilitation-center-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit http://localhost:3000 to see the application.

## Project Structure

```
/app
  /api            # API routes
    /admin        # Admin-only endpoints
    /appointments # Appointment management
    /auth         # Authentication endpoints
    /services     # Service endpoints
    /dashboard    # Dashboard statistics
  /auth           # Authentication pages
  /appointments   # Appointment management UI
  /booking        # Service booking
  /components     # Shared components
  /dashboard      # Dashboard UI
  /utils          # Utility functions
/lib
  auth.ts         # Authentication configuration
  prisma.ts       # Database client
/prisma
  schema.prisma   # Database schema
  migrations/     # Database migrations
/types            # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js routes

### Dashboard
- `GET /api/dashboard/stats/monthly-count` - Monthly appointment statistics
- `GET /api/dashboard/stats/by-service` - Service distribution statistics

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
