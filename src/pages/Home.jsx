import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Home() {
  const categories = [
  {
    title: "Students",
    description: "Scholarships, education and student support",
    icon: "🎓",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Farmers",
    description: "Agriculture, farming and livelihood schemes",
    icon: "🌾",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Women",
    description: "Financial support, safety and empowerment",
    icon: "👩",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Employment",
    description: "Jobs, training and skill development",
    icon: "💼",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Persons with Disabilities",
    description: "Support, accessibility and empowerment",
    icon: "♿",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Senior Citizens",
    description: "Pension, healthcare and welfare support",
    icon: "👴",
    image:
      "https://images.unsplash.com/photo-1508963493744-76fce69379c6?auto=format&fit=crop&w=900&q=80",
  },
]

 const popularSchemes = [
  {
    name: "PM-KISAN",
    category: "Agriculture",
    description:
      "Financial support for eligible farmer families to support agricultural needs.",
  },
  {
    name: "Post-Matric Scholarship",
    category: "Education",
    description:
      "Financial assistance for eligible students pursuing education after matriculation.",
  },
  {
    name: "Pradhan Mantri Kaushal Vikas Yojana",
    category: "Skill Development",
    description:
      "Skill training and certification opportunities for eligible candidates.",
  },
]

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#062d46]/75" />

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto w-full px-5 py-20">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-4 py-2 mb-7 text-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Government Scheme Information Portal
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Find government schemes
              <span className="block text-orange-400">
                made for you.
              </span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
              Discover government schemes and benefits based on your age,
              income, occupation, education, location and other details.
            </p>

           {/* Search + Eligibility */}
<div className="mt-9 max-w-4xl">
  <div className="bg-white p-2 shadow-xl flex flex-col sm:flex-row">
    <input
      type="text"
      placeholder="Search schemes, scholarships, pensions, jobs..."
      className="flex-1 px-5 py-4 text-slate-800 outline-none"
    />

    <button className="mt-2 sm:mt-0 px-8 py-4 bg-[#e85d04] text-white font-semibold hover:bg-[#d94f00] transition">
      Search
    </button>
  </div>

  <div className="mt-4 flex flex-wrap items-center gap-3">
    <Link
      to="/assessment"
      className="px-6 py-3 bg-white text-[#12344d] font-semibold hover:bg-slate-100 transition"
    >
      Check My Eligibility →
    </Link>

    <span className="text-sm text-slate-300">
      Find schemes based on your profile
    </span>
  </div>

  <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
    <span className="text-slate-300">Popular:</span>

    <span className="border border-white/30 px-3 py-1.5 bg-white/10">
      Scholarships
    </span>

    <span className="border border-white/30 px-3 py-1.5 bg-white/10">
      Farmers
    </span>

    <span className="border border-white/30 px-3 py-1.5 bg-white/10">
      Women
    </span>

    <span className="border border-white/30 px-3 py-1.5 bg-white/10">
      Employment
    </span>
  </div>
</div>


            {/* Trending */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-300">Popular:</span>

              <span className="border border-white/30 px-3 py-1.5 bg-white/10">
                Scholarships
              </span>

              <span className="border border-white/30 px-3 py-1.5 bg-white/10">
                Farmers
              </span>

              <span className="border border-white/30 px-3 py-1.5 bg-white/10">
                Women
              </span>

              <span className="border border-white/30 px-3 py-1.5 bg-white/10">
                Employment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}
<section className="bg-slate-50 border-b border-slate-200">
  <div className="max-w-7xl mx-auto px-5 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <Link
        to="/assessment"
        className="group bg-white border border-slate-200 p-6 hover:border-[#0b4f71] hover:shadow-md transition"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#0b4f71] text-white flex items-center justify-center font-bold">
            01
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Personalized
            </p>

            <h3 className="mt-1 text-lg font-bold text-[#12344d]">
              Check My Eligibility
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Answer a few questions and discover schemes that may be
              relevant to you.
            </p>

            <span className="inline-block mt-4 text-sm font-semibold text-[#e85d04]">
              Start now →
            </span>
          </div>
        </div>
      </Link>

      <Link
        to="/schemes"
        className="group bg-white border border-slate-200 p-6 hover:border-[#0b4f71] hover:shadow-md transition"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#0b4f71] text-white flex items-center justify-center font-bold">
            02
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Explore
            </p>

            <h3 className="mt-1 text-lg font-bold text-[#12344d]">
              Browse All Schemes
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Explore government schemes by category, benefit and
              eligibility.
            </p>

            <span className="inline-block mt-4 text-sm font-semibold text-[#e85d04]">
              Explore schemes →
            </span>
          </div>
        </div>
      </Link>

      <div className="bg-[#12344d] text-white p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 border border-white/30 flex items-center justify-center font-bold">
            03
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Sarkar Yojna
            </p>

            <h3 className="mt-1 text-lg font-bold">
              Government benefits in one place
            </h3>

            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Understand scheme benefits, eligibility and application
              information in simple language.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



      {/* ================= CATEGORIES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
             <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
  Find schemes by category
</p>

<h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#12344d]">
  Explore schemes by category
</h2>

<p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
  Find government support based on your needs, profession,
  education and stage of life.
</p>
            </div>

            <Link
              to="/schemes"
              className="mt-5 md:mt-0 text-sm font-semibold text-[#0b4f71] hover:text-[#e85d04]"
            >
              View all schemes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Link
                to="/schemes"
                key={category.title}
                className="group relative h-72 overflow-hidden bg-slate-200"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                 <div className="w-11 h-11 mb-4 bg-white/15 border border-white/30 flex items-center justify-center text-sm font-bold">
  {category.title === "Students" && "ST"}
  {category.title === "Farmers" && "FA"}
  {category.title === "Women" && "WO"}
  {category.title === "Employment" && "EM"}
  {category.title === "Persons with Disabilities" && "PD"}
  {category.title === "Senior Citizens" && "SC"}
</div>
                  <h3 className="text-2xl font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-200">
                    {category.description}
                  </p>

                  <span className="inline-block mt-4 text-sm font-semibold">
                    Explore schemes →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-[#f4f7f9] py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
           <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
  How Sarkar Yojna works
</p>

<h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#12344d]">
  Find schemes in three simple steps
</h2>

<p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
  Tell us a little about yourself and we will help you discover
  government schemes that may be relevant to you.
</p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-14 h-14 bg-[#0b4f71] text-white flex items-center justify-center text-xl font-bold">
                01
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#12344d]">
                 Share your details
              </h3>
<p className="mt-2 text-slate-600 text-sm leading-relaxed">
  Answer a few simple questions about your age, state, income,
  occupation and education.
</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 bg-[#0b4f71] text-white flex items-center justify-center text-xl font-bold">
                02
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#12344d]">
                  Find relevant schemes
              </h3>

              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
  Our system compares your information with available scheme
  eligibility requirements.
</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 bg-[#e85d04] text-white flex items-center justify-center text-xl font-bold">
                03
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#12344d]">
                Explore your results
              </h3>

              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
  Explore potentially relevant schemes, their benefits, documents
  and official application information.
</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/assessment"
              className="inline-block px-8 py-3.5 bg-[#e85d04] text-white font-semibold hover:bg-[#d94f00] transition"
            >
              Start Eligibility Check
            </Link>
          </div>
        </div>
      </section>

      {/* ================= POPULAR SCHEMES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d04]">
                 Featured schemes
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#12344d]">
                Popular government schemes
              </h2>
            </div>

            <Link
              to="/schemes"
              className="hidden md:block text-sm font-semibold text-[#0b4f71]"
            >
              Browse all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularSchemes.map((scheme) => (
              <div
                key={scheme.name}
                className="border border-slate-200 bg-white p-7 hover:shadow-lg transition"
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#0b4f71] bg-slate-100 px-3 py-1">
                  {scheme.category}
                </span>

                <h3 className="mt-5 text-xl font-bold text-[#12344d]">
                  {scheme.name}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {scheme.description}
                </p>

                <Link
                  to="/scheme-details"
                  className="inline-block mt-6 text-sm font-semibold text-[#e85d04]"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#063b5c]">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="text-white max-w-2xl">
             <h2 className="text-3xl md:text-4xl font-bold">
  Find government schemes you may be eligible for
</h2>
             <p className="mt-4 text-slate-300 leading-relaxed">
  Answer a few simple questions about yourself and discover
  government schemes that may be relevant to your profile.
</p>
            </div>

            <Link
              to="/assessment"
              className="inline-block bg-[#e85d04] text-white px-8 py-4 font-semibold hover:bg-[#d94f00] transition whitespace-nowrap"
            >
              Check My Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <section className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <p className="text-xs text-slate-600 leading-relaxed">
           <strong>Important:</strong> Sarkar Yojna is an information and
            discovery platform. Eligibility information shown on this
            platform is intended to help users identify potentially relevant
            schemes. Applicants should verify the latest eligibility
            requirements, documents, deadlines and application process on
            the respective official government portal before applying.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#082f49] text-slate-300">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-white">
  Sarkar Yojna
</h3>

              <p className="mt-2 text-sm max-w-md">
                Helping citizens discover government schemes and benefits
                through a simple digital experience.
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <Link to="/schemes" className="hover:text-white">
                Schemes
              </Link>

              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-5 text-xs">
            © 2026 SchemeSetu. Information should be verified with official
            government sources.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home