import React from 'react';

export default function PhysicalTherapyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Physical Therapy</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Physical Therapy Services</h2>
          <p className="text-gray-600 mb-4">
            Our physical therapy program is designed to help patients recover from injuries, manage chronic conditions,
            and improve overall physical function. Our experienced physical therapists work closely with each patient
            to develop personalized treatment plans.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Treatment Areas</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Orthopedic rehabilitation</li>
            <li>Sports injury recovery</li>
            <li>Post-surgical rehabilitation</li>
            <li>Balance and fall prevention</li>
            <li>Pain management</li>
            <li>Mobility improvement</li>
            <li>Strength training</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
          <p className="text-gray-600 mb-4">
            We combine evidence-based techniques with personalized care to ensure the best outcomes for our patients.
            Our state-of-the-art equipment and facilities allow us to provide comprehensive physical therapy services
            in a comfortable and supportive environment.
          </p>
          <p className="text-gray-600">
            Each treatment plan is tailored to the individual's specific needs and goals, with regular progress
            assessments to ensure optimal recovery.
          </p>
        </div>
      </div>
    </div>
  );
} 