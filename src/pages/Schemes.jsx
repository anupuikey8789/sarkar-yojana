import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Schemes() {
  const schemes = [
    {
      name: "PM-KISAN",
      category: "Agriculture",
      department: "Ministry of Agriculture & Farmers Welfare",
      description:
        "Financial support for eligible farmer families to support their agricultural needs.",
      benefit: "Financial assistance",
      eligibility: "Eligible farmer families",
    },
    {
      name: "Post-Matric Scholarship",
      category: "Education",
      department: "Government Scholarship",
      description:
        "Financial assistance for eligible students pursuing education after matriculation.",
      benefit: "Educational financial support",
      eligibility: "Eligible students",
    },
    {
      name: "Pradhan Mantri Kaushal Vikas Yojana",
      category: "Skill Development",
      department: "Ministry of Skill Development",
      description:
        "Skill training and certification opportunities for eligible candidates.",
      benefit: "Skill training",
      eligibility: "Eligible candidates",
    },
    {
      name: "PMAY",
      category: "Housing",
      department: "Housing & Urban Affairs",
      description:
        "Government support related to housing for eligible beneficiaries.",
      benefit: "Housing support",
      eligibility: "Eligible households",
    },
    {
      name: "National Scholarship Scheme",
      category: "Education",
      department: "Government Scholarship",
      description:
        "Scholarship assistance for eligible students to support their education.",
      benefit: "Scholarship assistance",
      eligibility: "Eligible students",
    },
    {
      name: "Social Security Pension",
      category: "Social Welfare",
      department: "Social Welfare",
      description:
        "Social security support for eligible citizens under applicable welfare programs.",
      benefit: "Social security support",
      eligibility: "Eligible beneficiaries",
    },
  ]

  const categories = [
    "All",
    "Education",
    "Agriculture",
    "Employment",
    "Skill Development",
    "Housing",
    "Social Welfare",
  ]

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-slate-800">
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#063b5c] text-white">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
            Government Schemes
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Explore Government Schemes
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Discover government schemes, benefits and support programs
            available for citizens across different categories.
          </p>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="max-w-4xl">
            <label className="block text-sm font-semibold text-[#12344d] mb-2">
              Search schemes
            </label>

            <div className="flex flex-col sm:flex-row border border-slate-300 bg-white">
              <input
                type="text"
                placeholder="Search by scheme name, benefit or category..."
                className="flex-1 px-5 py-4 outline-none text-slate-700"
              />

              <button className="px-8 py-4 bg-[#e85d04] text-white font-semibold hover:bg-[#d94f00] transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-5 py-12">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
              Browse
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#12344d]">
              Government schemes
            </h2>

            <p className="mt-2 text-slate-600">
              Explore schemes based on different areas of support.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            {schemes.length} schemes available
          </p>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2.5 text-sm font-medium border transition ${
                index === 0
                  ? "bg-[#12344d] text-white border-[#12344d]"
                  : "bg-white text-slate-600 border-slate-300 hover:border-[#0b4f71] hover:text-[#0b4f71]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ================= SCHEME CARDS ================= */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <article
              key={scheme.name}
              className="bg-white border border-slate-200 hover:border-[#0b4f71] hover:shadow-lg transition flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-slate-100 text-[#0b4f71]">
                    {scheme.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    Government
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#12344d] leading-snug">
                  {scheme.name}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  {scheme.department}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-[#12344d] w-24">
                      Benefit
                    </span>

                    <span className="text-xs text-slate-600">
                      {scheme.benefit}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-[#12344d] w-24">
                      Eligibility
                    </span>

                    <span className="text-xs text-slate-600">
                      {scheme.eligibility}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-slate-100">
                <Link
                  to="/scheme-details"
                  className="text-sm font-semibold text-[#e85d04] hover:text-[#d94f00]"
                >
                  View scheme details →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ================= INFORMATION NOTE ================= */}
        <div className="mt-12 border border-slate-200 bg-white p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#12344d] text-white flex items-center justify-center font-bold shrink-0">
              i
            </div>

            <div>
              <h3 className="font-bold text-[#12344d]">
                Important information
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Scheme information is provided for discovery and
                informational purposes. Always verify the latest eligibility
                requirements, documents, deadlines and application process
                on the respective official government portal.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#082f49] text-slate-300">
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
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link to="/schemes" className="hover:text-white transition">
                Schemes
              </Link>

              <Link to="/about" className="hover:text-white transition">
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

export default Schemes