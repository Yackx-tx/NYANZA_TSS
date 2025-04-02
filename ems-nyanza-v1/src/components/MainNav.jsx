import { NavLink } from "react-router-dom"
import { cn } from "../utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/job-positions", label: "Job Positions" },
  { href: "/dashboard/applicants", label: "Applicants" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/reports", label: "Reports" },
]

const MainNav = () => {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default MainNav

