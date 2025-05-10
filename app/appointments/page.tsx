'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Service {
  id: number
  name: string
  description: string
  duration: string
  price: string
}

interface Appointment {
  id: string
  date: string
  time: string
  status: string
  serviceId: number
  service: Service
  notes?: string
  user: {
    name: string
    email: string
  }
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/appointments')
      return
    }

    async function fetchAppointments() {
      try {
        const response = await fetch('/api/appointments')
        if (!response.ok) throw new Error('Failed to fetch appointments')
        const data = await response.json()
        setAppointments(data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [session, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Appointments</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (              <li key={appointment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium text-indigo-600">
                        {appointment.service.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Duration: {appointment.service.duration} • Price: {appointment.service.price}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mb-2
                        ${appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {appointment.status.charAt(0) + appointment.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-2 text-sm text-gray-500">
                      Note: {appointment.notes}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
