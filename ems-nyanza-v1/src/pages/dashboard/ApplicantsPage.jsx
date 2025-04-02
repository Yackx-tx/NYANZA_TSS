"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Mail, Phone, MapPin, Download, Eye, Star, StarOff } from "lucide-react"

export default function ApplicantsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSkill, setFilterSkill] = useState("all")
  const [favorites, setFavorites] = useState([2, 4])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Sample applicants data
  const applicants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      experience: "5 years",
      education: "B.S. Computer Science, NYU",
      lastPosition: "Senior Frontend Developer at TechCorp",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      skills: ["Figma", "UI/UX", "Wireframing", "User Research"],
      experience: "3 years",
      education: "M.A. Design, RISD",
      lastPosition: "UX Designer at DesignHub",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      experience: "7 years",
      education: "MBA, University of Chicago",
      lastPosition: "Product Manager at InnovateCo",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      skills: ["Node.js", "Python", "SQL", "MongoDB"],
      experience: "4 years",
      education: "B.S. Computer Engineering, UT Austin",
      lastPosition: "Backend Developer at DataSystems",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      skills: ["SQL", "Excel", "Tableau", "Python"],
      experience: "2 years",
      education: "B.S. Statistics, University of Washington",
      lastPosition: "Data Analyst at AnalyticsPro",
    },
  ]

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterSkill === "all" || applicant.skills.some((skill) => skill.toLowerCase().includes(filterSkill.toLowerCase()))

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
        <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
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
            placeholder="Search applicants..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 mr-2" />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="all">All Skills</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="UI/UX">UI/UX</option>
            <option value="SQL">SQL</option>
          </select>
        </div>
      </div>

      {/* Applicants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-white text-lg font-semibold">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.lastPosition}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(applicant.id)}
                  className="text-gray-400 hover:text-yellow-500 focus:outline-none transition-colors duration-200"
                >
                  {favorites.includes(applicant.id) ? (
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{applicant.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{applicant.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredApplicants.length}</span> of{" "}
          <span className="font-medium">{applicants.length}</span> applicants
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

