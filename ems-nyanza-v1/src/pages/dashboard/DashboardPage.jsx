"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, Users, Briefcase, FileText, Clock } from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Applicants",
      value: "1,284",
      change: "+12.5%",
      isIncrease: true,
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-900",
    },
    {
      title: "Open Positions",
      value: "32",
      change: "+3.2%",
      isIncrease: true,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-blue-700",
    },
    {
      title: "Applications",
      value: "864",
      change: "+18.7%",
      isIncrease: true,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-600",
    },
    {
      title: "Time to Hire",
      value: "24 days",
      change: "-2.3%",
      isIncrease: false,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-blue-500",
    },
  ]

  const recentApplications = [
    { id: 1, name: "John Smith", position: "Frontend Developer", date: "2023-07-15", status: "Interview" },
    { id: 2, name: "Sarah Johnson", position: "UX Designer", date: "2023-07-14", status: "Screening" },
    { id: 3, name: "Michael Brown", position: "Product Manager", date: "2023-07-13", status: "Applied" },
    { id: 4, name: "Emily Davis", position: "Backend Developer", date: "2023-07-12", status: "Offer" },
    { id: 5, name: "David Wilson", position: "Data Analyst", date: "2023-07-11", status: "Rejected" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Interview":
        return "bg-yellow-100 text-yellow-800"
      case "Screening":
        return "bg-blue-100 text-blue-800"
      case "Applied":
        return "bg-gray-100 text-gray-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.isIncrease ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.isIncrease ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Applications Over Time</h2>
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500">Chart visualization goes here</p>
            {/* We'll use a placeholder instead of Recharts for online-only version */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Application Status</h2>
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500">Chart visualization goes here</p>
            {/* We'll use a placeholder instead of Recharts for online-only version */}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <a href="/dashboard/applications" className="text-blue-900 hover:underline text-sm">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{application.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{application.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-900 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}