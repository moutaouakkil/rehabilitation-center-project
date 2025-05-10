import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            We are dedicated to providing exceptional rehabilitation services to help our patients
            achieve their highest level of independence and quality of life.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-4">
            Our team consists of highly qualified healthcare professionals, including physical therapists,
            occupational therapists, speech therapists, and rehabilitation specialists who work together
            to provide comprehensive care.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Facilities</h2>
          <p className="text-gray-600 mb-4">
            Our state-of-the-art facilities are equipped with the latest technology and equipment
            to provide the best possible care for our patients. We maintain a comfortable and
            supportive environment to promote healing and recovery.
          </p>
        </div>
      </div>
    </div>
  );
} 