"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, FileText, Download, Eye, X, Check } from "lucide-react"

export default function ApplicationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [expandedApplication, setExpandedApplication] = useState(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Sample applications data
  const applications = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      position: "Frontend Developer",
      date: "2023-07-15",
      status: "Interview",
      resume: "#",
      experience: "5 years",
      skills: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      position: "UX Designer",
      date: "2023-07-14",
      status: "Screening",
      resume: "#",
      experience: "3 years",
      skills: ["Figma", "UI/UX", "Wireframing", "User Research"],
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      position: "Product Manager",
      date: "2023-07-13",
      status: "Applied",
      resume: "#",
      experience: "7 years",
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      position: "Backend Developer",
      date: "2023-07-12",
      status: "Offer",
      resume: "#",
      experience: "4 years",
      skills: ["Node.js", "Python", "SQL", "MongoDB"],
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      position: "Data Analyst",
      date: "2023-07-11",
      status: "Rejected",
      resume: "#",
      experience: "2 years",
      skills: ["SQL", "Excel", "Tableau", "Python"],
    },
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

  const toggleExpandApplication = (id) => {
    if (expandedApplication === id) {
      setExpandedApplication(null)
    } else {
      setExpandedApplication(id)
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || app.status === filterStatus

    return matchesSearch && matchesFilter
  })

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
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <button className="flex items-center justify-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm">
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 mr-2" />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpandApplication(application.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white">
                    {application.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.email}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Position:</span> {application.position}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Applied:</span> {application.date}
                  </div>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}
                  >
                    {application.status}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedApplication === application.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            </div>

            {expandedApplication === application.id && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Experience</h4>
                    <p className="text-sm">{application.experience}</p>

                    <h4 className="text-sm font-medium text-gray-500 mt-4 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {application.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <a href={application.resume} className="flex items-center text-blue-900 hover:text-blue-700">
                      <FileText className="w-5 h-5 mr-2" />
                      <span>Download Resume</span>
                    </a>

                    <div className="flex space-x-2 mt-4">
                      <button className="flex items-center justify-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredApplications.length}</span> of{" "}
          <span className="font-medium">{applications.length}</span> applications
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

