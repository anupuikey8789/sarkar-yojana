import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    // Check required fields
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.")
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      )

      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        )
      }

      // Backend returns the JWT token
      if (!data.token) {
        throw new Error("Login successful, but token was not received.")
      }

      // Store JWT token for later API requests
      localStorage.setItem("sarkarYojnaToken", data.token)

      // Store email for displaying user information later
      localStorage.setItem("sarkarYojnaEmail", formData.email)

      // Go to dashboard
      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)

      setError(
        error.message ||
          "Unable to connect to the server. Please make sure the backend is running."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-6xl bg-white border border-slate-200 shadow-sm grid lg:grid-cols-2 overflow-hidden">

          {/* Left Side */}
          <section className="bg-[#0b4f71] text-white p-8 md:p-12 lg:p-14">
            <div className="max-w-md">

              <div className="w-14 h-14 bg-white text-[#0b4f71] flex items-center justify-center font-bold text-xl mb-8">
                SY
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Sarkar Yojna
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
                Government schemes,
                <span className="block text-orange-400">
                  made easier to discover.
                </span>
              </h1>

              <p className="mt-5 text-sky-100 leading-relaxed">
                Sign in to continue your scheme discovery journey, review
                recommendations and manage your saved schemes.
              </p>

              <div className="mt-10 border-t border-white/15 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-200">
                  With Sarkar Yojna
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex gap-3">
                    <div className="w-7 h-7 shrink-0 bg-white/10 border border-white/15 flex items-center justify-center text-sm">
                      ✓
                    </div>

                    <p className="text-sm text-sky-100">
                      Discover relevant government schemes
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 shrink-0 bg-white/10 border border-white/15 flex items-center justify-center text-sm">
                      ✓
                    </div>

                    <p className="text-sm text-sky-100">
                      Check your potential eligibility
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 shrink-0 bg-white/10 border border-white/15 flex items-center justify-center text-sm">
                      ✓
                    </div>

                    <p className="text-sm text-sky-100">
                      Save schemes for later
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Right Side */}
          <section className="p-8 md:p-12 lg:p-14">
            <div className="max-w-md mx-auto">

              <p className="text-sm font-semibold text-orange-600">
                CITIZEN LOGIN
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-3 text-slate-500 leading-relaxed">
                Sign in to access your dashboard and personalized scheme
                recommendations.
              </p>

              {/* Error */}
              {error && (
                <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3.5 border border-slate-300 bg-white outline-none focus:border-[#0b4f71] focus:ring-1 focus:ring-[#0b4f71]"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-[#0b4f71] hover:text-orange-600"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 pr-20 border border-slate-300 bg-white outline-none focus:border-[#0b4f71] focus:ring-1 focus:ring-[#0b4f71]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-[#0b4f71]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#f57c00] text-white font-semibold hover:bg-[#e66f00] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>

              </form>

              {/* Register */}
              <div className="mt-8 border-t border-slate-200 pt-7 text-center">

                <p className="text-sm text-slate-500">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-3 block w-full border border-[#0b4f71] text-[#0b4f71] text-center py-3 font-semibold hover:bg-[#0b4f71] hover:text-white transition"
                >
                  Create an account
                </Link>

              </div>

            </div>
          </section>

        </div>
      </main>

      <footer className="bg-[#263238] text-slate-300">
        <div className="max-w-7xl mx-auto px-5 py-6 text-sm text-center">
          © 2026 Sarkar Yojna. Government scheme information and discovery
          platform.
        </div>
      </footer>
    </div>
  )
}

export default Login