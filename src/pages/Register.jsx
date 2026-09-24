import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { requireSupabase } from "../lib/supabase.js"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setIsLoading(true)

      const { error } = await requireSupabase().auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: { full_name: formData.name.trim() },
          emailRedirectTo: window.location.origin,
        },
      })
      if (error) throw error
      navigate("/login", {
        state: { notice: "Account created. Check your email to confirm your address, then sign in." },
      })
    } catch (error) {
      console.error("Registration error:", error)

      setError(
        error.message ||
          "Unable to create your account. Check your Supabase configuration and try again."
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
          <section className="bg-[#00695c] text-white p-8 md:p-12 lg:p-14">
            <div className="max-w-md">

              <div className="w-14 h-14 bg-white text-[#00695c] flex items-center justify-center font-bold text-xl mb-8">
                SY
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Join Sarkar Yojna
              </p>

              <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
                Create your account
              </h1>

              <p className="mt-5 text-teal-50 leading-relaxed">
                Create an account to explore government schemes, complete your
                eligibility assessment and manage your saved schemes.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 bg-white/15 border border-white/20 flex items-center justify-center font-semibold">
                    01
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Create your account
                    </h3>

                    <p className="mt-1 text-sm text-teal-100">
                      Enter your basic information to get started.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 bg-white/15 border border-white/20 flex items-center justify-center font-semibold">
                    02
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Complete your profile
                    </h3>

                    <p className="mt-1 text-sm text-teal-100">
                      Provide information needed to discover relevant schemes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 bg-white/15 border border-white/20 flex items-center justify-center font-semibold">
                    03
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Discover schemes
                    </h3>

                    <p className="mt-1 text-sm text-teal-100">
                      Check schemes that may be relevant to your profile.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Right Side */}
          <section className="p-8 md:p-12 lg:p-14">
            <div className="max-w-md mx-auto">

              <p className="text-sm font-semibold text-[#00695c]">
                CREATE ACCOUNT
              </p>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
                Register with Sarkar Yojna
              </h2>

              <p className="mt-3 text-slate-500">
                Enter your details below to create your account.
              </p>

              {/* Error */}
              {error && (
                <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-slate-300 bg-white outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-slate-300 bg-white outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 pr-20 border border-slate-300 bg-white outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-[#00695c]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Password must contain at least 8 characters.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 pr-20 border border-slate-300 bg-white outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-[#00695c]"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#f57c00] text-white font-semibold hover:bg-[#e66f00] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

              </form>

              {/* Login Link */}
              <div className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#00695c] hover:text-[#004d40]"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-500 leading-relaxed">
                By creating an account, you can use Sarkar Yojna to organize
                your scheme discovery and eligibility information.
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

export default Register
