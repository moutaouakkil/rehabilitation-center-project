'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  appointments?: Array<{
    id: string;
    date: string;
    time: string;
    status: string;
    service: {
      name: string;
      price: string;
    };
  }>;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: string;
  serviceId: number;
  userId: string;
  service: {
    name: string;
    price: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'appointments'>('users');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/admin');
      return;
    }

    if (session.user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    async function fetchData() {
      try {
        const [usersResponse, appointmentsResponse] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/appointments')
        ]);

        if (!usersResponse.ok || !appointmentsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [usersData, appointmentsData] = await Promise.all([
          usersResponse.json(),
          appointmentsResponse.json()
        ]);

        setUsers(usersData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getAppointmentsForUser = (userId: string) => {
    return appointments.filter(app => app.userId === userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Appointments
            </button>
          </nav>
        </div>

        {activeTab === 'users' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <>
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'STAFF' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {selectedUser === user.id ? 'Hide Details' : 'Show Details'}
                        </button>
                      </td>
                    </tr>
                    {selectedUser === user.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <h4 className="font-semibold">User Appointments</h4>
                            {getAppointmentsForUser(user.id).length > 0 ? (
                              <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Service</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Time</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {getAppointmentsForUser(user.id).map((appointment) => (
                                      <tr key={appointment.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">{appointment.service.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-500">{appointment.time}</td>
                                        <td className="px-4 py-2 text-sm text-gray-500">
                                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                          }`}>
                                            {appointment.status}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No appointments found for this user.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.user.name}</div>
                      <div className="text-sm text-gray-500">{appointment.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
