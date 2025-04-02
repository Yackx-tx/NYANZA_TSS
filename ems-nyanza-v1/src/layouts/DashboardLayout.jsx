"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  BarChart2,
  LogOut,
  Bell,
  Search,
  User,
} from "lucide-react"

import { useAuth } from "../contexts/AuthContext"

export default function DashboardLayout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const navItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      path: "/dashboard/job-positions",
      name: "Job Positions",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      path: "/dashboard/applications",
      name: "Applications",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      path: "/dashboard/applicants",
      name: "Applicants",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/dashboard/reports",
      name: "Reports",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-30 flex flex-col h-full bg-blue-900 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-0 lg:w-20"
          } ${isMobile ? "left-0" : ""}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
          <div
            className={`flex items-center space-x-2 overflow-hidden ${!isSidebarOpen && !isMobile ? "lg:justify-center lg:w-full" : ""}`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-900 font-bold">
              HR
            </div>
            <h1
              className={`font-bold text-xl whitespace-nowrap transition-opacity duration-300 ${!isSidebarOpen && !isMobile ? "lg:opacity-0" : "opacity-100"}`}
            >
              HR Portal
            </h1>
          </div>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-blue-800 ${isActive ? "bg-blue-800" : ""
                      }`}
                  >
                    <div className={`${!isSidebarOpen && !isMobile ? "mx-auto" : ""}`}>{item.icon}</div>
                    <span
                      className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${!isSidebarOpen && !isMobile ? "lg:hidden" : ""}`}
                    >
                      {item.name}
                    </span>
                    {isActive && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-white animate-pulse"></div>}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-blue-800 ${!isSidebarOpen && !isMobile ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5" />
            <span className={`ml-2 transition-opacity duration-300 ${!isSidebarOpen && !isMobile ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-900 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 relative">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full text-gray-600 hover:text-blue-900 hover:bg-gray-100 focus:outline-none">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-sm text-gray-900">{currentUser?.email || "User"}</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

