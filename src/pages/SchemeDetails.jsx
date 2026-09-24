import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { getScheme } from "../lib/schemes.js"

function SchemeDetails() {
  const navigate = useNavigate()
  const { schemeId } = useParams()

  const [scheme, setScheme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // ================= FETCH SCHEME =================

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getScheme(schemeId)
        if (!data) throw new Error("Scheme not found.")
        setScheme(data)
      } catch (error) {
        console.error("Error fetching scheme:", error)

        setError(
          error.message || "Unable to load scheme details. Check the Supabase configuration."
        )
      } finally {
        setLoading(false)
      }
    }

    if (schemeId) {
      fetchScheme()
    }
  }, [schemeId])

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f9] text-slate-800">

        <Navbar />

        <main className="max-w-7xl mx-auto px-5 py-20">

          <div className="bg-white border border-slate-200 p-10 text-center">

            <div className="mx-auto w-8 h-8 border-4 border-slate-200 border-t-[#12344d] rounded-full animate-spin"></div>

            <p className="mt-4 text-sm text-slate-600">
              Loading scheme details...
            </p>

          </div>

        </main>

      </div>
    )
  }

  // ================= ERROR =================

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-[#f5f7f9] text-slate-800">

        <Navbar />

        <main className="max-w-7xl mx-auto px-5 py-20">

          <div className="bg-white border border-red-200 p-10 text-center">

            <h1 className="text-2xl font-bold text-[#12344d]">
              Scheme not found
            </h1>

            <p className="mt-3 text-sm text-red-600">
              {error || "The requested scheme could not be found."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/schemes")}
              className="mt-6 px-6 py-3 bg-[#12344d] text-white font-semibold hover:bg-[#0b4f71] transition"
            >
              ← Back to schemes
            </button>

          </div>

        </main>

      </div>
    )
  }

  // ================= BENEFITS =================

  const benefits = scheme.benefits
    ? scheme.benefits
        .split(/\r?\n|;/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : []

  // ================= DOCUMENTS =================

  const documents = scheme.requiredDocuments
    ? scheme.requiredDocuments
        .split(/\r?\n|;/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : []

  // ================= ELIGIBILITY =================

  const eligibility = []

  if (scheme.gender && scheme.gender !== "Any") {
    eligibility.push(`Gender: ${scheme.gender}`)
  }

  if (scheme.occupation && scheme.occupation !== "Any") {
    eligibility.push(`Occupation: ${scheme.occupation}`)
  }

  if (scheme.education && scheme.education !== "Any") {
    eligibility.push(`Education: ${scheme.education}`)
  }

  if (scheme.disabilityRequired === true) {
    eligibility.push("Disability requirement applies")
  }

  if (scheme.incomeLimit) {
    eligibility.push(
      `Annual income limit: ₹${Number(
        scheme.incomeLimit
      ).toLocaleString("en-IN")}`
    )
  }

  if (scheme.ageMin !== null && scheme.ageMin !== undefined) {
    eligibility.push(`Minimum age: ${scheme.ageMin} years`)
  }

  if (scheme.ageMax !== null && scheme.ageMax !== undefined) {
    eligibility.push(`Maximum age: ${scheme.ageMax} years`)
  }

  if (eligibility.length === 0) {
    eligibility.push(
      "Check the official government portal for the complete eligibility requirements."
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-slate-800">

      <Navbar />

      {/* ================= PAGE HEADER ================= */}

      <section className="bg-[#063b5c] text-white">

        <div className="max-w-7xl mx-auto px-5 py-10">

          <button
            type="button"
            onClick={() => navigate("/schemes")}
            className="text-sm text-slate-300 hover:text-white transition mb-8"
          >
            ← Back to schemes
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-3xl">

              <div className="flex flex-wrap gap-3">

                <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wide">
                  {scheme.category || "Government"}
                </span>

                <span className="px-3 py-1.5 bg-[#e85d04] text-white text-xs font-semibold uppercase tracking-wide">
                  {scheme.level || "Government"}
                </span>

              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                {scheme.schemeName}
              </h1>

              <p className="mt-4 text-lg text-slate-300">
                {scheme.ministry || "Government Department"}
              </p>

            </div>

            <div className="lg:text-right">

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Scheme information
              </p>

              <p className="mt-1 text-sm text-slate-300">
                Verify latest details before applying
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto px-5 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT CONTENT ================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* Overview */}

            <section className="bg-white border border-slate-200">

              <div className="px-6 md:px-8 py-5 border-b border-slate-200">

                <h2 className="text-xl font-bold text-[#12344d]">
                  Overview
                </h2>

              </div>

              <div className="px-6 md:px-8 py-7">

                <p className="text-slate-600 leading-relaxed">
                  {scheme.description ||
                    "Detailed description is available on the official government portal."}
                </p>

              </div>

            </section>

            {/* Benefits */}

            <section className="bg-white border border-slate-200">

              <div className="px-6 md:px-8 py-5 border-b border-slate-200">

                <h2 className="text-xl font-bold text-[#12344d]">
                  Benefits
                </h2>

              </div>

              <div className="px-6 md:px-8 py-7">

                {benefits.length > 0 ? (

                  <div className="space-y-5">

                    {benefits.map((benefit, index) => (

                      <div
                        key={`${benefit}-${index}`}
                        className="flex gap-4"
                      >

                        <div className="w-8 h-8 shrink-0 bg-[#0b4f71] text-white flex items-center justify-center text-xs font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <p className="text-slate-600 leading-relaxed pt-1">
                          {benefit}
                        </p>

                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="text-sm text-slate-600">
                    Benefit information is available on the official
                    government portal.
                  </p>

                )}

              </div>

            </section>

            {/* Eligibility */}

            <section className="bg-white border border-slate-200">

              <div className="px-6 md:px-8 py-5 border-b border-slate-200">

                <h2 className="text-xl font-bold text-[#12344d]">
                  Eligibility
                </h2>

              </div>

              <div className="px-6 md:px-8 py-7">

                <div className="space-y-4">

                  {eligibility.map((item, index) => (

                    <div
                      key={`${item}-${index}`}
                      className="flex gap-4"
                    >

                      <span className="mt-2 w-2 h-2 bg-[#e85d04] shrink-0" />

                      <p className="text-slate-600 leading-relaxed">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

                <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                  These details are based on the scheme information currently
                  stored in Sarkar Yojna. Always verify the complete eligibility
                  conditions with the concerned government authority.
                </p>

              </div>

            </section>

            {/* Documents */}

            <section className="bg-white border border-slate-200">

              <div className="px-6 md:px-8 py-5 border-b border-slate-200">

                <h2 className="text-xl font-bold text-[#12344d]">
                  Required Documents
                </h2>

              </div>

              <div className="px-6 md:px-8 py-7">

                {documents.length > 0 ? (

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

                    {documents.map((document, index) => (

                      <div
                        key={`${document}-${index}`}
                        className="flex items-center gap-3 border-b border-slate-100 pb-3"
                      >

                        <span className="text-xs font-bold text-[#0b4f71]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm text-slate-600">
                          {document}
                        </span>

                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="text-sm text-slate-600">
                    Required document information is available on the
                    official government portal.
                  </p>

                )}

              </div>

            </section>

            {/* Application Process */}

            <section className="bg-white border border-slate-200">

              <div className="px-6 md:px-8 py-5 border-b border-slate-200">

                <h2 className="text-xl font-bold text-[#12344d]">
                  Application Process
                </h2>

              </div>

              <div className="px-6 md:px-8 py-7">

                <p className="text-slate-600 leading-relaxed">
                  {scheme.applicationProcess ||
                    "Please visit the official government portal for the latest application process."}
                </p>

              </div>

            </section>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className="space-y-6">

            {/* Apply Card */}

            <div className="bg-[#12344d] text-white">

              <div className="p-6">

                <p className="text-xs uppercase tracking-wider text-slate-300">
                  Application
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Interested in this scheme?
                </h2>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Visit the official government source to verify the latest
                  eligibility requirements and application process.
                </p>

                {scheme.officialUrl && (

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full px-5 py-3.5 bg-[#e85d04] text-white font-semibold text-center hover:bg-[#d94f00] transition"
                  >
                    Visit Official Website →
                  </a>

                )}

                {scheme.applicationUrl &&
                  scheme.applicationUrl !== scheme.officialUrl && (

                    <a
                      href={scheme.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block w-full px-5 py-3.5 border border-white/30 text-white font-semibold text-center hover:bg-white/10 transition"
                    >
                      Application Portal →
                    </a>

                  )}

              </div>

            </div>

            {/* Scheme Information */}

            <div className="bg-white border border-slate-200">

              <div className="px-6 py-5 border-b border-slate-200">

                <h3 className="font-bold text-[#12344d]">
                  Scheme Information
                </h3>

              </div>

              <div className="p-6 space-y-5">

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {scheme.category || "Not specified"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Government Level
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {scheme.level || "Not specified"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 leading-relaxed">
                    {scheme.ministry || "Not specified"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    State
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {scheme.state || "All"}
                  </p>

                </div>

                {scheme.helpline && (

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Helpline
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {scheme.helpline}
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* Important Notice */}

            <div className="border-l-4 border-[#e85d04] bg-white border border-slate-200 p-5">

              <h3 className="font-bold text-[#12344d]">
                Important
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Scheme details may change. Always verify the latest
                information with the concerned government authority before
                applying.
              </p>

            </div>

          </aside>

        </div>

        {/* ================= BOTTOM NOTICE ================= */}

        <section className="mt-10 bg-[#eef3f6] border border-slate-200 p-6 md:p-8">

          <div className="flex gap-4">

            <div className="w-10 h-10 shrink-0 bg-[#0b4f71] text-white flex items-center justify-center font-bold">
              i
            </div>

            <div>

              <h3 className="font-bold text-[#12344d]">
                Information and eligibility notice
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Sarkar Yojna is an information and discovery platform.
                The information displayed here is intended to help users
                identify potentially relevant government schemes. Final
                eligibility, required documents and application decisions
                are determined by the concerned government authority.
              </p>

            </div>

          </div>

        </section>

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

              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:text-white transition"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigate("/schemes")}
                className="hover:text-white transition"
              >
                Schemes
              </button>

              <button
                type="button"
                onClick={() => navigate("/about")}
                className="hover:text-white transition"
              >
                About
              </button>

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

export default SchemeDetails
