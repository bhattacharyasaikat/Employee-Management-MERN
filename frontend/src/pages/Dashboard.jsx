import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-bold text-gray-800">Welcome to Admin Panel</h2>
        <p className="mt-2 text-lg text-gray-600">Manage your employees and data efficiently.</p>
      </div>
    </div>
  );
}

export default Dashboard;
