import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rehabilitation Center</h3>
            <p className="text-gray-300">
              Providing exceptional care and support for your rehabilitation journey.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/physical-therapy" className="text-gray-300 hover:text-white">
                  Physical Therapy
                </Link>
              </li>
              <li>
                <Link href="/services/occupational-therapy" className="text-gray-300 hover:text-white">
                  Occupational Therapy
                </Link>
              </li>
              <li>
                <Link href="/services/speech-therapy" className="text-gray-300 hover:text-white">
                  Speech Therapy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Rehabilitation Street</li>
              <li>Medical District, Warsaw, PL</li>
              <li>Phone: +48 111-111-111</li>
              <li>Email: info@rehabcenter.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} Rehabilitation Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 