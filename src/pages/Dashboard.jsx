import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Dashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("sarkarYojnaToken")

    // If there is no login token, send the user to login
    if (!token) {
      navigate("/login")
      return
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("sarkarYojnaToken")
          localStorage.removeItem("sarkarYojnaEmail")
          navigate("/login")
          return
        }

        if (!response.ok) {
          throw new Error("Unable to load your profile.")
        }

        const data = await response.json()

        setUser(data)
      } catch (error) {
        console.error("Dashboard profile error:", error)

        setError(
          error.message ||
            "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const getInitials = (name) => {
    if (!name) return "U"

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
  }

  const handleLogout = () => {
    localStorage.removeItem("sarkarYojnaToken")
    localStorage.removeItem("sarkarYojnaEmail")

    navigate("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] text-slate-800">
        <Navbar />

        <main className="max-w-7xl mx-auto px-5 py-20">
          <div className="bg-white border border-slate-200 p-10 text-center">
            <div className="w-10 h-10 mx-auto border-4 border-slate-200 border-t-[#00695c] rounded-full animate-spin"></div>

            <p className="mt-5 text-sm text-slate-500">
              Loading your dashboard...
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8faf9] text-slate-800">
        <Navbar />

        <main className="max-w-7xl mx-auto px-5 py-20">
          <div className="bg-white border border-red-200 p-8">
            <p className="text-sm font-semibold text-red-600">
              Dashboard Error
            </p>

            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Unable to load your profile
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#f57c00] text-white font-semibold hover:bg-[#e66f00] transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      {/* ================= DASHBOARD HEADER ================= */}
      <section className="bg-[#00695c] text-white">
        <div className="max-w-7xl mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Citizen Dashboard
              </p>

              <h1 className="mt-3 text-3xl md:text-4xl font-bold">
                Welcome, {user?.fullName || "Citizen"}
              </h1>

              <p className="mt-3 max-w-2xl text-teal-50 leading-relaxed">
                Manage your scheme discovery journey, complete your assessment
                and explore government benefits that may be relevant to you.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="self-start md:self-auto px-5 py-2.5 border border-white/40 text-white text-sm font-semibold hover:bg-white hover:text-[#00695c] transition"
            >
              Sign out
            </button>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-5 py-10">

        {/* ================= PROFILE / STATUS ================= */}
        <section className="bg-white border border-slate-200">
          <div className="p-6 md:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 bg-[#1565c0] text-white flex items-center justify-center text-xl font-bold">
                  {getInitials(user?.fullName)}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Citizen
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {user?.fullName || "Citizen"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {user?.email || "Email not available"}
                  </p>
                </div>

              </div>

              <div className="border-l-4 border-[#f57c00] bg-[#fff8f0] px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Assessment status
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  Not completed
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Complete your assessment to discover relevant schemes.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ================= PRIMARY ACTIONS ================= */}
        <section className="mt-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#f57c00]">
              Get started
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
              What would you like to do?
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Assessment */}
            <Link
              to="/assessment"
              className="group bg-white border border-slate-200 hover:border-[#00695c] hover:shadow-md transition"
            >
              <div className="p-6">

                <div className="w-11 h-11 bg-[#00695c] text-white flex items-center justify-center font-bold">
                  01
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Check My Eligibility
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Answer a few questions about yourself to find government
                  schemes that may be relevant to your profile.
                </p>

                <span className="inline-block mt-6 text-sm font-semibold text-[#f57c00] group-hover:translate-x-1 transition">
                  Start assessment →
                </span>

              </div>
            </Link>

            {/* Recommendations */}
            <Link
              to="/recommendations"
              className="group bg-white border border-slate-200 hover:border-[#1565c0] hover:shadow-md transition"
            >
              <div className="p-6">

                <div className="w-11 h-11 bg-[#1565c0] text-white flex items-center justify-center font-bold">
                  02
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  View Recommendations
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Review schemes identified from your assessment and check
                  their benefits and eligibility information.
                </p>

                <span className="inline-block mt-6 text-sm font-semibold text-[#f57c00] group-hover:translate-x-1 transition">
                  View recommendations →
                </span>

              </div>
            </Link>

            {/* Browse */}
            <Link
              to="/schemes"
              className="group bg-white border border-slate-200 hover:border-[#f57c00] hover:shadow-md transition"
            >
              <div className="p-6">

                <div className="w-11 h-11 bg-[#f57c00] text-white flex items-center justify-center font-bold">
                  03
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Browse Schemes
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Explore government schemes by education, agriculture,
                  employment, welfare and other categories.
                </p>

                <span className="inline-block mt-6 text-sm font-semibold text-[#f57c00] group-hover:translate-x-1 transition">
                  Browse schemes →
                </span>

              </div>
            </Link>

          </div>
        </section>

        {/* ================= QUICK STATUS ================= */}
        <section className="mt-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-white border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Assessment
              </p>

              <p className="mt-2 text-2xl font-bold text-[#00695c]">
                Not started
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Complete your profile assessment to get recommendations.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Recommendations
              </p>

              <p className="mt-2 text-2xl font-bold text-[#1565c0]">
                0
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Your personalized results will appear here after assessment.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Saved schemes
              </p>

              <p className="mt-2 text-2xl font-bold text-[#f57c00]">
                0
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Save useful schemes for easier access later.
              </p>
            </div>

          </div>

        </section>

        {/* ================= INFORMATION PANEL ================= */}
        <section className="mt-10 bg-[#eef7f5] border border-[#cfe5e1]">

          <div className="border-l-4 border-[#00695c] p-6 md:p-7">

            <h3 className="font-bold text-slate-900">
              How your dashboard works
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Start by completing the eligibility assessment. Sarkar Yojna
              will use the information you provide to identify government
              schemes that may be relevant to your profile. You can then
              review scheme details and official application information.
            </p>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#263238] text-slate-300">

        <div className="max-w-7xl mx-auto px-5 py-10">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>
              <h3 className="text-xl font-bold text-white">
                Sarkar Yojna
              </h3>

              <p className="mt-2 text-sm max-w-md leading-relaxed">
                Helping citizens discover government schemes and benefits
                through a simple digital experience.
              </p>
            </div>

            <div className="flex gap-8 text-sm">

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/schemes"
                className="hover:text-white transition"
              >
                Schemes
              </Link>

              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>

            </div>

          </div>

          <div className="border-t border-white/10 mt-8 pt-5 text-xs">
            © 2026 Sarkar Yojna. Information should be verified with
            official government sources.
          </div>

        </div>

      </footer>
    </div>
  )
}

export default Dashboard