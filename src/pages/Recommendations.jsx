import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Recommendations() {
  const recommendations = [
    {
      name: "PM-KISAN",
      category: "Agriculture",
      match: "High relevance",
      description:
        "Financial support for eligible farmer families under the applicable government requirements.",
      reasons: [
        "Occupation information may match",
        "Agriculture-related support",
      ],
    },
    {
      name: "Post-Matric Scholarship",
      category: "Education",
      match: "Potentially relevant",
      description:
        "Financial assistance for eligible students pursuing education after matriculation.",
      reasons: [
        "Education details may match",
        "Student support category",
      ],
    },
    {
      name: "Pradhan Mantri Kaushal Vikas Yojana",
      category: "Skill Development",
      match: "Potentially relevant",
      description:
        "Skill training and certification opportunities for eligible candidates.",
      reasons: [
        "Employment or skill-development support",
        "Candidate eligibility may apply",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-slate-800">
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#063b5c] text-white">
        <div className="max-w-7xl mx-auto px-5 py-14">

          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
            Personalized results
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold">
            Schemes for your profile
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Based on the information provided in your assessment, these
            government schemes may be relevant to your profile.
          </p>

        </div>
      </section>

      {/* ================= RESULT SUMMARY ================= */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 py-7">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="border-l-4 border-[#0b4f71] bg-[#f5f7f9] p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Assessment
              </p>

              <p className="mt-1 text-lg font-bold text-[#12344d]">
                Completed
              </p>
            </div>

            <div className="border-l-4 border-[#e85d04] bg-[#f5f7f9] p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Results found
              </p>

              <p className="mt-1 text-lg font-bold text-[#12344d]">
                {recommendations.length} schemes
              </p>
            </div>

            <div className="border-l-4 border-[#0b4f71] bg-[#f5f7f9] p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Next step
              </p>

              <p className="mt-1 text-lg font-bold text-[#12344d]">
                Review eligibility
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-5 py-12">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
              Recommended schemes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#12344d]">
              Schemes you may be eligible for
            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
              Review the information below and verify the official eligibility
              requirements before applying.
            </p>
          </div>

          <Link
            to="/assessment"
            className="text-sm font-semibold text-[#0b4f71] hover:text-[#e85d04]"
          >
            Retake assessment →
          </Link>

        </div>

        {/* ================= RECOMMENDATION CARDS ================= */}
        <div className="mt-10 space-y-5">

          {recommendations.map((scheme, index) => (
            <article
              key={scheme.name}
              className="bg-white border border-slate-200 hover:border-[#0b4f71] hover:shadow-md transition"
            >

              <div className="p-6 md:p-7">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                  {/* Scheme information */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="w-9 h-9 bg-[#12344d] text-white flex items-center justify-center text-xs font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="px-3 py-1.5 bg-slate-100 text-[#0b4f71] text-xs font-semibold uppercase tracking-wide">
                        {scheme.category}
                      </span>

                      <span className="px-3 py-1.5 border border-[#e85d04] text-[#e85d04] text-xs font-semibold">
                        {scheme.match}
                      </span>

                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-[#12344d]">
                      {scheme.name}
                    </h3>

                    <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">
                      {scheme.description}
                    </p>

                    {/* Why this appeared */}
                    <div className="mt-6">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Why this scheme appears
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {scheme.reasons.map((reason) => (
                          <span
                            key={reason}
                            className="px-3 py-2 bg-[#f1f5f7] text-sm text-slate-600"
                          >
                            {reason}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="lg:w-52 shrink-0 flex flex-col gap-3">

                    <Link
                      to="/scheme-details"
                      className="w-full text-center px-5 py-3 bg-[#0b4f71] text-white font-semibold hover:bg-[#083e59] transition"
                    >
                      View Details
                    </Link>

                    <button
                      className="w-full px-5 py-3 border border-slate-300 text-[#12344d] font-semibold hover:border-[#0b4f71] hover:bg-slate-50 transition"
                    >
                      Save Scheme
                    </button>

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* ================= IMPORTANT NOTICE ================= */}
        <section className="mt-10 bg-white border border-slate-200">

          <div className="border-l-4 border-[#e85d04] p-6 md:p-7">

            <h3 className="font-bold text-[#12344d]">
              Important eligibility notice
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              These recommendations are based on the information provided
              during the assessment. A recommendation does not mean that you
              are officially eligible for a scheme. Final eligibility is
              determined by the concerned government authority according to
              the latest applicable rules.
            </p>

          </div>

        </section>

        {/* ================= BOTTOM ACTIONS ================= */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">

          <Link
            to="/schemes"
            className="px-6 py-3 bg-[#12344d] text-white text-center font-semibold hover:bg-[#0b4f71] transition"
          >
            Browse All Schemes
          </Link>

          <Link
            to="/assessment"
            className="px-6 py-3 border border-slate-300 bg-white text-[#12344d] text-center font-semibold hover:border-[#0b4f71] transition"
          >
            Retake Assessment
          </Link>

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

export default Recommendations