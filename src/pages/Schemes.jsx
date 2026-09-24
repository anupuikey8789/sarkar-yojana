import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { listSchemes } from "../lib/schemes.js"

function Schemes() {
  const [schemes, setSchemes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // ================= FETCH SCHEMES FROM BACKEND =================

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true)
        setError("")

        setSchemes(await listSchemes())
      } catch (error) {
        console.error("Error fetching schemes:", error)
        setError(
          "Unable to load schemes. Check that Supabase is configured and the schema has been applied."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSchemes()
  }, [])

  // ================= CATEGORIES =================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        schemes
          .map((scheme) => scheme.category)
          .filter((category) => category)
      ),
    ]

    return ["All", ...uniqueCategories]
  }, [schemes])

  // ================= FILTER SCHEMES =================

  const filteredSchemes = useMemo(() => {
    const search = searchTerm.toLowerCase().trim()

    return schemes.filter((scheme) => {
      const matchesCategory =
        selectedCategory === "All" ||
        scheme.category === selectedCategory

      const matchesSearch =
        search === "" ||
        scheme.schemeName?.toLowerCase().includes(search) ||
        scheme.description?.toLowerCase().includes(search) ||
        scheme.benefits?.toLowerCase().includes(search) ||
        scheme.category?.toLowerCase().includes(search) ||
        scheme.ministry?.toLowerCase().includes(search)

      return matchesCategory && matchesSearch
    })
  }, [schemes, searchTerm, selectedCategory])

  // ================= HELPER =================

  const getEligibilityText = (scheme) => {
    const eligibilityParts = []

    if (scheme.gender && scheme.gender !== "Any") {
      eligibilityParts.push(`Gender: ${scheme.gender}`)
    }

    if (scheme.occupation && scheme.occupation !== "Any") {
      eligibilityParts.push(`Occupation: ${scheme.occupation}`)
    }

    if (scheme.education && scheme.education !== "Any") {
      eligibilityParts.push(`Education: ${scheme.education}`)
    }

    if (scheme.disabilityRequired === true) {
      eligibilityParts.push("Disability required")
    }

    if (scheme.incomeLimit) {
      eligibilityParts.push(
        `Income limit: ₹${Number(
          scheme.incomeLimit
        ).toLocaleString("en-IN")}`
      )
    }

    if (eligibilityParts.length === 0) {
      return "Check official eligibility requirements"
    }

    return eligibilityParts.join(" • ")
  }

  // ================= RENDER =================

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
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search by scheme name, benefit or category..."
                className="flex-1 px-5 py-4 outline-none text-slate-700"
              />

              <button
                type="button"
                className="px-8 py-4 bg-[#e85d04] text-white font-semibold hover:bg-[#d94f00] transition"
              >
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
            {filteredSchemes.length} schemes available
          </p>

        </div>

        {/* ================= CATEGORY FILTER ================= */}

        <div className="mt-8 flex flex-wrap gap-2">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 text-sm font-medium border transition ${
                selectedCategory === category
                  ? "bg-[#12344d] text-white border-[#12344d]"
                  : "bg-white text-slate-600 border-slate-300 hover:border-[#0b4f71] hover:text-[#0b4f71]"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* ================= LOADING ================= */}

        {loading && (

          <div className="mt-10 bg-white border border-slate-200 p-10 text-center">

            <div className="mx-auto w-8 h-8 border-4 border-slate-200 border-t-[#12344d] rounded-full animate-spin"></div>

            <p className="mt-4 text-sm text-slate-600">
              Loading government schemes...
            </p>

          </div>

        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (

          <div className="mt-10 border border-red-200 bg-red-50 p-6">

            <h3 className="font-bold text-red-700">
              Unable to load schemes
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

          </div>

        )}

        {/* ================= NO RESULTS ================= */}

        {!loading &&
          !error &&
          filteredSchemes.length === 0 && (

            <div className="mt-10 bg-white border border-slate-200 p-10 text-center">

              <h3 className="text-xl font-bold text-[#12344d]">
                No schemes found
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Try another search term or select a different category.
              </p>

            </div>

          )}

        {/* ================= SCHEME CARDS ================= */}

        {!loading &&
          !error &&
          filteredSchemes.length > 0 && (

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredSchemes.map((scheme) => (

                <article
                  key={scheme.schemeId}
                  className="bg-white border border-slate-200 hover:border-[#0b4f71] hover:shadow-lg transition flex flex-col"
                >

                  {/* Card Header */}

                  <div className="p-6 border-b border-slate-100">

                    <div className="flex items-start justify-between gap-3">

                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-slate-100 text-[#0b4f71]">
                        {scheme.category || "Government"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {scheme.level || "Government"}
                      </span>

                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[#12344d] leading-snug">
                      {scheme.schemeName}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {scheme.ministry || "Government Department"}
                    </p>

                  </div>

                  {/* Card Body */}

                  <div className="p-6 flex-1">

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {scheme.description ||
                        "Government scheme information is available through the official portal."}
                    </p>

                    <div className="mt-6 space-y-4">

                      {/* Benefit */}

                      <div className="flex gap-3">

                        <span className="text-xs font-semibold text-[#12344d] w-24 shrink-0">
                          Benefit
                        </span>

                        <span className="text-xs text-slate-600">
                          {scheme.benefits ||
                            "See official scheme details"}
                        </span>

                      </div>

                      {/* Eligibility */}

                      <div className="flex gap-3">

                        <span className="text-xs font-semibold text-[#12344d] w-24 shrink-0">
                          Eligibility
                        </span>

                        <span className="text-xs text-slate-600">
                          {getEligibilityText(scheme)}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Card Footer */}

                  <div className="px-6 py-4 border-t border-slate-100">

                    <Link
                      to={`/scheme-details/${scheme.schemeId}`}
                      className="text-sm font-semibold text-[#e85d04] hover:text-[#d94f00]"
                    >
                      View scheme details →
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

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

export default Schemes
