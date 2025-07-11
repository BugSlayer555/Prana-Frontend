import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Calendar, DollarSign, Download, Filter } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const reports = [
    {
      id: 'overview',
      title: 'Hospital Overview',
      description: 'Key performance indicators and statistics',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-primary-500'
    },
    {
      id: 'patients',
      title: 'Patient Analytics',
      description: 'Patient demographics and trends',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-secondary-500'
    },
    {
      id: 'appointments',
      title: 'Appointment Reports',
      description: 'Scheduling and attendance analysis',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-accent-500'
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      description: 'Revenue, expenses, and billing analysis',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-primary-600'
    }
  ];

  const stats = [
    { label: 'Total Patients', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Appointments Today', value: '45', change: '+8%', trend: 'up' },
    { label: 'Revenue This Month', value: '$125K', change: '+15%', trend: 'up' },
    { label: 'Staff on Duty', value: '28', change: '-2%', trend: 'down' }
  ];

  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="section-spacing">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600 text-responsive">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <select 
              className="input-field"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="btn-primary inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedReport === report.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${report.color} text-white`}>
                  {report.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Content */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {reports.find(r => r.id === selectedReport)?.title}
            </h3>
            <div className="flex items-center space-x-2">
              <button className="btn-outline inline-flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="btn-primary inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Placeholder Chart */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Chart Visualization</h4>
            <p className="text-gray-600">
              Interactive charts and graphs will be displayed here based on the selected report type.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Data</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="table-header">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { date: '2024-01-25', metric: 'Patient Visits', value: '45', change: '+12%' },
                    { date: '2024-01-24', metric: 'Revenue', value: '$12,450', change: '+8%' },
                    { date: '2024-01-23', metric: 'Appointments', value: '38', change: '+5%' },
                    { date: '2024-01-22', metric: 'Staff Hours', value: '168', change: '-2%' }
                  ].map((row, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell text-sm text-gray-900">{row.date}</td>
                      <td className="table-cell text-sm text-gray-900">{row.metric}</td>
                      <td className="table-cell text-sm font-medium text-gray-900">{row.value}</td>
                      <td className="table-cell">
                        <span className="text-sm text-green-600">{row.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
