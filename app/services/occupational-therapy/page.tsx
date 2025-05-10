import React from 'react';

export default function OccupationalTherapyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Occupational Therapy</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Occupational Therapy Services</h2>
          <p className="text-gray-600 mb-4">
            Our occupational therapy program focuses on helping patients develop, recover, or maintain the daily living
            and work skills needed for independent living. Our occupational therapists work with patients to improve
            their ability to perform daily activities and enhance their quality of life.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Areas of Focus</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Activities of daily living (ADL) training</li>
            <li>Fine motor skills development</li>
            <li>Adaptive equipment training</li>
            <li>Home modification assessment</li>
            <li>Workplace ergonomics</li>
            <li>Cognitive rehabilitation</li>
            <li>Pediatric occupational therapy</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
          <p className="text-gray-600 mb-4">
            We take a holistic approach to occupational therapy, considering the physical, psychological, and social
            aspects of each patient's situation. Our therapists work closely with patients and their families to
            develop practical solutions for everyday challenges.
          </p>
          <p className="text-gray-600">
            Our goal is to help patients achieve maximum independence and improve their ability to participate in
            meaningful activities at home, work, and in the community.
          </p>
        </div>
      </div>
    </div>
  );
} 