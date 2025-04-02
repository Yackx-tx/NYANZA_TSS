"use client"

import { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react"

// Create the auth context with default values
export const AuthContext = createContext({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
  isAuthenticated: false,
})

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock users for demo purposes
const MOCK_USERS = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
]

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user // Derived state instead of separate state

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem("auth-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (e) {
        console.error("Failed to parse stored user", e)
        localStorage.removeItem("auth-user")
      }
    }
  }, [])

  const login = useCallback(async (username, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (!user) {
      throw new Error("Invalid username or password")
    }

    const userData = {
      id: user.id,
      username: user.username,
    }

    localStorage.setItem("auth-user", JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("auth-user")
    setUser(null)
  }, [])

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated,
  }), [user, login, logout, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}