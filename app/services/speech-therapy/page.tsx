import React from 'react';

export default function SpeechTherapyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Speech Therapy</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Speech Therapy Services</h2>
          <p className="text-gray-600 mb-4">
            Our speech therapy program is designed to help patients improve their communication skills, swallowing
            function, and overall quality of life. Our certified speech-language pathologists provide personalized
            care for patients of all ages with various communication and swallowing disorders.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Areas of Treatment</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Speech sound disorders</li>
            <li>Language disorders</li>
            <li>Voice disorders</li>
            <li>Swallowing difficulties (dysphagia)</li>
            <li>Stuttering</li>
            <li>Cognitive-communication disorders</li>
            <li>Social communication skills</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
          <p className="text-gray-600 mb-4">
            We use evidence-based techniques and the latest technology to provide effective speech therapy services.
            Our therapists work closely with patients and their families to develop individualized treatment plans
            that address specific communication goals.
          </p>
          <p className="text-gray-600">
            We believe in a collaborative approach, working with other healthcare professionals to ensure
            comprehensive care for our patients. Regular progress assessments help us adjust treatment plans
            to achieve the best possible outcomes.
          </p>
        </div>
      </div>
    </div>
  );
} 