import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function About() {
  return (
    <div className="min-h-screen bg-[#f5f7f9] text-slate-800">
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#063b5c] text-white">
        <div className="max-w-7xl mx-auto px-5 py-16">

          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
            About Sarkar Yojna
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Making government schemes easier to discover
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-300 leading-relaxed">
            Sarkar Yojna is a digital information and discovery platform
            designed to help citizens understand government schemes and
            identify programs that may be relevant to their circumstances.
          </p>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <main className="max-w-7xl mx-auto px-5 py-12">

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white border border-slate-200">

            <div className="px-6 md:px-8 py-6 border-b border-slate-200">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#e85d04]">
                Our purpose
              </p>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#12344d]">
                One place to understand government support
              </h2>

            </div>

            <div className="px-6 md:px-8 py-7">

              <p className="text-slate-600 leading-relaxed">
                Government schemes can provide support in areas such as
                education, agriculture, employment, housing and social
                welfare. However, information about these schemes can be
                spread across different government departments and portals.
              </p>

              <p className="mt-5 text-slate-600 leading-relaxed">
                Sarkar Yojna is designed to simplify the discovery process.
                Users can provide basic information about themselves and
                explore schemes that may be relevant to their profile.
              </p>

              <p className="mt-5 text-slate-600 leading-relaxed">
                The platform presents scheme information in a structured
                format so that users can understand benefits, eligibility
                requirements and application information more easily.
              </p>

            </div>

          </div>


          {/* Mission panel */}
          <div className="bg-[#12344d] text-white p-7 md:p-8">

            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Our focus
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Simpler access to information
            </h2>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              We aim to create a simple digital experience where citizens
              can explore government schemes without having to search
              through many different sources first.
            </p>

            <div className="mt-8 border-t border-white/15 pt-6">

              <p className="text-xs uppercase tracking-wide text-slate-400">
                Platform approach
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Discover → Understand → Verify → Apply
              </p>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="mt-10">

          <div className="mb-7">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#12344d]">
              A simple journey for citizens
            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-white border border-slate-200 p-7">

              <div className="w-11 h-11 bg-[#0b4f71] text-white flex items-center justify-center font-bold">
                01
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#12344d]">
                Share your details
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Provide basic information such as age, location, income,
                occupation and education.
              </p>

            </div>


            <div className="bg-white border border-slate-200 p-7">

              <div className="w-11 h-11 bg-[#0b4f71] text-white flex items-center justify-center font-bold">
                02
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#12344d]">
                Discover relevant schemes
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                The platform compares the information provided with scheme
                requirements to identify potentially relevant programs.
              </p>

            </div>


            <div className="bg-white border border-slate-200 p-7">

              <div className="w-11 h-11 bg-[#e85d04] text-white flex items-center justify-center font-bold">
                03
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#12344d]">
                Verify and explore
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Review scheme details and verify the latest information on
                the relevant official government portal.
              </p>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}
        <section className="mt-12">

          <div className="mb-7">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
              Platform features
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#12344d]">
              Built around the citizen's journey
            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-white border border-slate-200 p-7">

              <h3 className="text-lg font-bold text-[#12344d]">
                Personalized discovery
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Users can provide profile information and receive scheme
                recommendations based on the available eligibility rules.
              </p>

            </div>


            <div className="bg-white border border-slate-200 p-7">

              <h3 className="text-lg font-bold text-[#12344d]">
                Structured scheme information
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Scheme benefits, eligibility information, documents and
                application details are presented in an organized format.
              </p>

            </div>


            <div className="bg-white border border-slate-200 p-7">

              <h3 className="text-lg font-bold text-[#12344d]">
                Simple language
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                The platform is designed to make government scheme
                information easier to understand.
              </p>

            </div>


            <div className="bg-white border border-slate-200 p-7">

              <h3 className="text-lg font-bold text-[#12344d]">
                Official-source verification
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Users are encouraged to verify current requirements and
                application procedures through the relevant official
                government source.
              </p>

            </div>

          </div>

        </section>


        {/* ================= TECHNOLOGY ================= */}
        <section className="mt-12 bg-white border border-slate-200">

          <div className="px-6 md:px-8 py-6 border-b border-slate-200">

            <p className="text-xs font-semibold uppercase tracking-wider text-[#e85d04]">
              Project technology
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#12344d]">
              Technology behind Sarkar Yojna
            </h2>

          </div>

          <div className="px-6 md:px-8 py-7">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="border border-slate-200 p-4">
                <p className="text-xs text-slate-400 uppercase">
                  Frontend
                </p>
                <p className="mt-1 font-semibold text-[#12344d]">
                  React + Vite
                </p>
              </div>

              <div className="border border-slate-200 p-4">
                <p className="text-xs text-slate-400 uppercase">
                  Backend
                </p>
                <p className="mt-1 font-semibold text-[#12344d]">
                  Spring Boot
                </p>
              </div>

              <div className="border border-slate-200 p-4">
                <p className="text-xs text-slate-400 uppercase">
                  Database
                </p>
                <p className="mt-1 font-semibold text-[#12344d]">
                  MySQL
                </p>
              </div>

              <div className="border border-slate-200 p-4">
                <p className="text-xs text-slate-400 uppercase">
                  Authentication
                </p>
                <p className="mt-1 font-semibold text-[#12344d]">
                  JWT
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= DISCLAIMER ================= */}
        <section className="mt-10 bg-[#eef3f6] border border-slate-200">

          <div className="border-l-4 border-[#e85d04] p-6 md:p-7">

            <h3 className="font-bold text-[#12344d]">
              Important information
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Sarkar Yojna is an information and discovery platform. It is
              not a government department or official government portal.
              Scheme eligibility, benefits, documents, deadlines and
              application procedures may change. Users should always verify
              the latest information through the respective official
              government source before applying.
            </p>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="mt-10 bg-[#063b5c] text-white">

          <div className="px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-7">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Get started
              </p>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                Find schemes that may be relevant to you
              </h2>

              <p className="mt-3 text-sm text-slate-300">
                Complete the short eligibility assessment to explore
                potentially relevant government schemes.
              </p>

            </div>

            <Link
              to="/assessment"
              className="shrink-0 bg-[#e85d04] px-7 py-3.5 text-white font-semibold text-center hover:bg-[#d94f00] transition"
            >
              Start Assessment →
            </Link>

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

export default About