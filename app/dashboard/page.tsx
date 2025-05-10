'use client';

import { useEffect, useState, useRef } from 'react';
import '../charts/setup';
import { Bar, Doughnut } from 'react-chartjs-2';
import { generatePDF } from '../utils/pdfExport';
import {
  AppointmentStats,
  ServiceStats,
  AppointmentChartData,
  ServiceChartData,
  AppointmentChartOptions,
  ServiceChartOptions
} from './types';

export default function Dashboard() {
  const [appointmentStats, setAppointmentStats] = useState<AppointmentStats | null>(null);
  const [serviceStats, setServiceStats] = useState<ServiceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch monthly appointments
        const appointmentsRes = await fetch('/api/dashboard/appointments');
        const appointmentsData = await appointmentsRes.json();
        setAppointmentStats(appointmentsData);

        // Fetch service distribution
        const servicesRes = await fetch('/api/dashboard/services');
        const servicesData = await servicesRes.json();
        setServiceStats(servicesData);

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadCSV = () => {
    if (!appointmentStats || !serviceStats) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Add appointments data
    csvContent += 'Monthly Appointments\n';
    csvContent += 'Month,Count\n';
    appointmentStats.labels.forEach((month, index) => {
      csvContent += `${month},${appointmentStats.data[index]}\n`;
    });
    
    // Add service distribution data
    csvContent += '\nService Distribution\n';
    csvContent += 'Service Type,Count\n';
    serviceStats.labels.forEach((service, index) => {
      csvContent += `${service},${serviceStats.data[index]}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'dashboard-stats.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = async () => {
    if (!appointmentStats || !serviceStats) return;
    
    try {
      await generatePDF(appointmentStats, serviceStats, barChartRef, doughnutChartRef);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
    setDropdownOpen(false);
  };

  const handleCSVDownload = () => {
    downloadCSV();
    setDropdownOpen(false);
  };

  const appointmentChartData: AppointmentChartData = {
    labels: appointmentStats?.labels || [],
    datasets: [
      {
        label: 'Number of Appointments',
        data: appointmentStats?.data || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const serviceChartData: ServiceChartData = {
    labels: serviceStats?.labels || [],
    datasets: [
      {        data: serviceStats?.data || [],                      backgroundColor: [
                        'rgba(16, 185, 129, 0.5)',   // Green - Sports Rehabilitation
                        'rgba(236, 72, 153, 0.5)',   // Pink - Speech Therapy
                        'rgba(59, 130, 246, 0.5)',   // Blue - Occupational Therapy
                        'rgba(245, 158, 11, 0.5)',   // Yellow - Physical Therapy
                      ],
                      borderColor: [
                        'rgb(16, 185, 129)',        // Green - Sports Rehabilitation
                        'rgb(236, 72, 153)',        // Pink - Speech Therapy
                        'rgb(59, 130, 246)',        // Blue - Occupational Therapy
                        'rgb(245, 158, 11)',        // Yellow - Physical Therapy
                      ],
        borderWidth: 1,
      },
    ],
  };
  const appointmentChartOptions: AppointmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Appointment Distribution',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Appointments'
        }
      },
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  const serviceChartOptions: ServiceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Service Distribution',
        font: {
          size: 16
        }
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rehabilitation Dashboard</h1>
        <div className="dropdown-container relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
          >
            <span>Export</span>
            <svg
              className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  onClick={handleCSVDownload}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={downloadPDF}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {appointmentStats && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">My Monthly Appointments</h2>
            <p className="text-gray-600 mb-4">Your rehabilitation appointments scheduled per month</p>
            <div className="h-[400px]">
              <Bar
                ref={barChartRef}
                data={appointmentChartData}
                options={appointmentChartOptions}
              />
            </div>
          </div>
        )}
        {serviceStats && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">My Service Distribution</h2>
            <p className="text-gray-600 mb-4">Breakdown of your appointments by rehabilitation service type</p>
            <div className="h-[400px]">
              <Doughnut
                ref={doughnutChartRef}
                data={serviceChartData}
                options={serviceChartOptions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
