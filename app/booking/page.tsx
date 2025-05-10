'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Service {
  id: number
  name: string
  description: string
  duration: string
  price: string
  createdAt?: string
  updatedAt?: string
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {    async function fetchServices() {
      try {
        console.log('Fetching services...');
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Response status:', response.status);
        const text = await response.text();
        if (!text) {
          throw new Error('No data received from the server');
        }
        console.log('Response text:', text);
        const data = JSON.parse(text);
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of services but got: ' + typeof data);
        }
        console.log('Parsed data:', data);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/booking')
    }
  }, [session, router])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      router.push('/auth/login?callbackUrl=/booking')
      return
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please select a service, date, and time')
      return
    }

    try {
      console.log('Creating appointment with:', {
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime
      });
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          date: new Date(`${selectedDate}T${selectedTime}`).toISOString(),
          time: selectedTime,
          status: 'PENDING'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create appointment')
      }

      const appointment = await response.json()
      router.push('/appointments')
    } catch (error) {
      console.error('Error creating appointment:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Select a service and choose your preferred time
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          {/* Service Selection */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select a Service
            </label>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                    selectedService === service.id
                      ? 'border-indigo-600 ring-2 ring-indigo-600'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                      <p className="text-sm font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {service.description}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>{service.duration}</span>
                        <span className="mx-2">•</span>
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time
              </label>
              <div className="mt-2">
                <input
                  type="time"
                  name="time"
                  id="time"
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}