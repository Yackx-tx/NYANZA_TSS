import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900">NYANZA Technical Secondary School</h1>
          <p className="text-xl text-blue-800 mb-8">Recruitment Management System</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Login
            </Link>
            <Link
              to="/about"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Job Management</h3>
              <p className="text-sm text-muted-foreground">Create and manage job positions</p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground">
                Easily create job listings with detailed requirements, qualifications, and descriptions for different
                departments.
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Application Tracking</h3>
              <p className="text-sm text-muted-foreground">Track applicant progress</p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground">
                Monitor applications through different recruitment stages and get real-time updates on candidate
                progress.
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Reporting</h3>
              <p className="text-sm text-muted-foreground">Generate detailed reports</p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground">
                Access daily reports on application statuses and make informed decisions based on recruitment data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

