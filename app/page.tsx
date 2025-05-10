'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const servicesList = [
  {
    name: 'Physical Therapy',
    description: 'Specialized treatment to help you recover from injury or surgery.',
    href: '/services/physical-therapy'
  },
  {
    name: 'Occupational Therapy',
    description: 'Helping you regain independence in daily activities.',
    href: '/services/occupational-therapy'
  },
  {
    name: 'Speech Therapy',
    description: 'Improving communication and swallowing disorders.',
    href: '/services/speech-therapy'
  }
];

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to HealthTrack
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your journey to recovery starts here. Professional rehabilitation services tailored to your needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/booking"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Book Appointment
              </Link>
              {!session && (
                <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Comprehensive rehabilitation services for your recovery journey
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}