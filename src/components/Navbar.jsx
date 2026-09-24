import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext.js"
import { requireSupabase } from "../lib/supabase.js"

function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await requireSupabase().auth.signOut()
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top government-style strip */}
      <div className="bg-[#063b5c] text-white text-xs">
        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
          <p>Government Scheme Information Portal</p>

          <div className="hidden md:flex items-center gap-5">
            <span>Skip to main content</span>
            <span>Accessibility</span>
            <span>English | हिन्दी</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#0b4f71] text-white flex items-center justify-center rounded-sm font-bold text-lg">
            SY
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#12344d] leading-tight">
  Sarkar Yojna
</h1>

            <p className="text-[11px] md:text-xs text-slate-500">
              Government Scheme Finder
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="text-[#12344d] hover:text-[#e85d04] transition"
          >
            Home
          </Link>

          <Link
            to="/schemes"
            className="text-slate-600 hover:text-[#e85d04] transition"
          >
            Schemes
          </Link>

          <Link
            to="/about"
            className="text-slate-600 hover:text-[#e85d04] transition"
          >
            About
          </Link>

          <button className="text-slate-600 hover:text-[#e85d04] transition">
            हिन्दी
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-[#e85d04]">Dashboard</Link>
              <button type="button" onClick={handleLogout} className="px-5 py-2.5 bg-[#e85d04] text-white rounded-sm hover:bg-[#d94f00] transition">Sign out</button>
            </>
          ) : (
            <Link to="/login" className="px-5 py-2.5 bg-[#e85d04] text-white rounded-sm hover:bg-[#d94f00] transition">Login</Link>
          )}
        </div>

        {/* Mobile Login */}
        {user ? (
          <button type="button" onClick={handleLogout} className="md:hidden px-4 py-2 bg-[#e85d04] text-white rounded-sm text-sm">Sign out</button>
        ) : (
          <Link to="/login" className="md:hidden px-4 py-2 bg-[#e85d04] text-white rounded-sm text-sm">Login</Link>
        )}
      </nav>
    </header>
  )
}

export default Navbar
