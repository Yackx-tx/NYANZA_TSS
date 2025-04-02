"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const UserNav = ({ user }) => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center"
      >
        {user.username.charAt(0).toUpperCase()}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm">
              <p className="font-medium leading-none">{user.username}</p>
              <p className="text-xs leading-none text-muted-foreground mt-1">User ID: {user.id}</p>
            </div>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={() => {
                setIsDropdownOpen(false)
                navigate("/dashboard/profile")
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setIsDropdownOpen(false)
                navigate("/dashboard/settings")
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Settings
            </button>
            <div className="border-t border-gray-100"></div>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav

