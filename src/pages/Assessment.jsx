import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Assessment() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [assessmentId, setAssessmentId] = useState(null)
  const [isStartingAssessment, setIsStartingAssessment] = useState(true)
  const [assessmentError, setAssessmentError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
const [submitError, setSubmitError] = useState("")

  const [answers, setAnswers] = useState({
    age: "",
    gender: "",
    state: "",
    district: "",
    income: "",
    occupation: "",
    education: "",
    student: "",
    category: "",
    disability: "",
    farmer: "",
    specialCategory: "",
  })

  const totalSteps = 6

  /*
   * Start or reuse an assessment for the logged-in user.
   *
   * We first try to find the user's latest assessment.
   * If there is no usable assessment, we create a new one.
   */
  useEffect(() => {
    const token = localStorage.getItem("sarkarYojnaToken")

    if (!token) {
      navigate("/login")
      return
    }

    const initializeAssessment = async () => {
      try {
        setIsStartingAssessment(true)
        setAssessmentError("")

        // First try to get the latest assessment
        const latestResponse = await fetch(
          "http://localhost:8080/api/assessments/latest",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (latestResponse.ok) {
          const latestAssessment = await latestResponse.json()

          if (latestAssessment.assessmentId) {
            setAssessmentId(latestAssessment.assessmentId)

            sessionStorage.setItem(
              "sarkarYojnaAssessmentId",
              String(latestAssessment.assessmentId)
            )

            return
          }
        }

        // No latest assessment available, so create one
        const startResponse = await fetch(
          "http://localhost:8080/api/assessments/start",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (startResponse.status === 401 || startResponse.status === 403) {
          localStorage.removeItem("sarkarYojnaToken")
          localStorage.removeItem("sarkarYojnaEmail")
          navigate("/login")
          return
        }

        if (!startResponse.ok) {
          throw new Error("Unable to start your assessment.")
        }

        const newAssessment = await startResponse.json()

        setAssessmentId(newAssessment.assessmentId)

        sessionStorage.setItem(
          "sarkarYojnaAssessmentId",
          String(newAssessment.assessmentId)
        )
      } catch (error) {
        console.error("Assessment initialization error:", error)

        setAssessmentError(
          error.message ||
            "Unable to connect to the assessment service."
        )
      } finally {
        setIsStartingAssessment(false)
      }
    }

    initializeAssessment()
  }, [navigate])

  const updateAnswer = (field, value) => {
    setAnswers((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((previous) => previous + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const previousStep = () => {
    if (step > 1) {
      setStep((previous) => previous - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

 const handleSubmit = async (event) => {
  event.preventDefault()

  console.log("=================================")
  console.log("ASSESSMENT SUBMIT STARTED")
  console.log("Assessment ID:", assessmentId)
  console.log("Answers:", answers)
  console.log("=================================")

  const token = localStorage.getItem("sarkarYojnaToken")

  if (!token) {
    console.log("No JWT token found")
    navigate("/login")
    return
  }

  if (!assessmentId) {
    console.log("No assessment ID found")
    setSubmitError(
      "Assessment could not be identified. Please try again."
    )
    return
  }

  try {
    setIsSubmitting(true)
    setSubmitError("")

    const answerPayload = [
      {
        questionId: 1,
        answerValue: String(answers.age),
      },
      {
        questionId: 2,
        answerValue: answers.gender,
      },
      {
        questionId: 3,
        answerValue: answers.state,
      },
      {
        questionId: 4,
        answerValue: answers.district,
      },
      {
        questionId: 5,
        answerValue: answers.income,
      },
      {
        questionId: 6,
        answerValue: answers.occupation,
      },
      {
        questionId: 7,
        answerValue: answers.education,
      },
      {
        questionId: 8,
        answerValue: answers.student,
      },
      {
        questionId: 9,
        answerValue: answers.category,
      },
      {
        questionId: 10,
        answerValue: answers.disability,
      },
      {
        questionId: 11,
        answerValue: answers.farmer,
      },
      {
        questionId: 12,
        answerValue: answers.specialCategory,
      },
    ]

    console.log("Number of answers:", answerPayload.length)
    console.log("Answer payload:", answerPayload)

    const response = await fetch(
      `http://localhost:8080/api/assessments/${assessmentId}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(answerPayload),
      }
    )

    console.log("API status:", response.status)

    const responseText = await response.text()

    console.log("API response:", responseText)

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("sarkarYojnaToken")
      localStorage.removeItem("sarkarYojnaEmail")
      navigate("/login")
      return
    }

    if (!response.ok) {
      throw new Error(
        responseText || "Unable to save your assessment answers."
      )
    }

    console.log("✅ ALL 12 ANSWERS SAVED SUCCESSFULLY")

    navigate("/recommendations")
  } catch (error) {
    console.error("❌ Assessment submission error:", error)

    setSubmitError(
      error.message ||
        "Unable to save your assessment. Please try again."
    )
  } finally {
    setIsSubmitting(false)
  }
}
  const progress = Math.round((step / totalSteps) * 100)

  const stepTitles = [
    "Basic information",
    "Location",
    "Income & occupation",
    "Education",
    "Social category",
    "Additional information",
  ]

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#00695c] text-white">
        <div className="max-w-7xl mx-auto px-5 py-14">

          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white text-[#00695c] flex items-center justify-center font-bold">
                01
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Eligibility Assessment
              </p>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Tell us about yourself
            </h1>

            <p className="mt-4 max-w-2xl text-teal-50 leading-relaxed text-lg">
              Answer a few questions about your circumstances so Sarkar Yojna
              can identify government schemes that may be relevant to you.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PROGRESS ================= */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 py-7">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Assessment progress
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Step {step} of {totalSteps}
              </h2>
            </div>

            <div className="md:text-right">
              <p className="text-sm font-semibold text-[#00695c]">
                {progress}% complete
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {stepTitles[step - 1]}
              </p>
            </div>

          </div>

          <div className="mt-5 h-2 bg-slate-200">
            <div
              className="h-2 bg-[#f57c00] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="mt-6 grid grid-cols-6 gap-2">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === step
              const isCompleted = stepNumber < step

              return (
                <div key={title} className="text-center">

                  <div
                    className={`mx-auto w-8 h-8 flex items-center justify-center text-xs font-bold border ${
                      isActive
                        ? "bg-[#00695c] text-white border-[#00695c]"
                        : isCompleted
                        ? "bg-[#1565c0] text-white border-[#1565c0]"
                        : "bg-white text-slate-400 border-slate-300"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>

                  <p
                    className={`hidden md:block mt-2 text-[11px] leading-tight ${
                      isActive
                        ? "text-[#00695c] font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {title}
                  </p>

                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="max-w-5xl mx-auto px-5 py-10">

        {/* Assessment connection status */}
        {isStartingAssessment && (
          <div className="mb-6 bg-[#eef7f5] border border-[#cce4df] p-4 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-[#00695c] rounded-full animate-spin" />

            <p className="text-sm text-slate-600">
              Preparing your assessment...
            </p>
          </div>
        )}

        {assessmentError && (
          <div className="mb-6 border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-700">
              Assessment service unavailable
            </p>

            <p className="mt-1 text-sm text-red-600">
              {assessmentError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#f57c00] font-bold">
                  Step 01
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Basic information
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Tell us some basic information about yourself.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={answers.age}
                    onChange={(event) =>
                      updateAnswer("age", event.target.value)
                    }
                    placeholder="Enter your age"
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Gender
                  </label>

                  <select
                    value={answers.gender}
                    onChange={(event) =>
                      updateAnswer("gender", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#00695c] focus:ring-1 focus:ring-[#00695c]/20"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>

                <div className="bg-[#fff8f0] border-l-4 border-[#f57c00] p-4">
                  <p className="text-sm text-slate-600">
                    Your information is used to identify potentially relevant
                    government schemes.
                  </p>
                </div>

              </div>
            </section>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#1565c0] font-bold">
                  Step 02
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Location
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Your state and district can affect scheme eligibility.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    State
                  </label>

                  <select
                    value={answers.state}
                    onChange={(event) =>
                      updateAnswer("state", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#1565c0] focus:ring-1 focus:ring-[#1565c0]/20"
                  >
                    <option value="">Select your state</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">
                      Madhya Pradesh
                    </option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    District
                  </label>

                  <input
                    type="text"
                    value={answers.district}
                    onChange={(event) =>
                      updateAnswer("district", event.target.value)
                    }
                    placeholder="Enter your district"
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 outline-none focus:border-[#1565c0] focus:ring-1 focus:ring-[#1565c0]/20"
                  />
                </div>

              </div>
            </section>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#2e7d32] font-bold">
                  Step 03
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Income and occupation
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  These details help identify financial and livelihood support
                  schemes.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual family income
                  </label>

                  <select
                    value={answers.income}
                    onChange={(event) =>
                      updateAnswer("income", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]/20"
                  >
                    <option value="">Select income range</option>
                    <option value="Below 1 Lakh">
                      Below ₹1 Lakh
                    </option>
                    <option value="1-2.5 Lakh">
                      ₹1 Lakh – ₹2.5 Lakh
                    </option>
                    <option value="2.5-5 Lakh">
                      ₹2.5 Lakh – ₹5 Lakh
                    </option>
                    <option value="5-8 Lakh">
                      ₹5 Lakh – ₹8 Lakh
                    </option>
                    <option value="Above 8 Lakh">
                      Above ₹8 Lakh
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Occupation
                  </label>

                  <select
                    value={answers.occupation}
                    onChange={(event) =>
                      updateAnswer("occupation", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]/20"
                  >
                    <option value="">Select occupation</option>
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Private Employee">
                      Private Employee
                    </option>
                    <option value="Government Employee">
                      Government Employee
                    </option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>
            </section>
          )}

          {/* ================= STEP 4 ================= */}
          {step === 4 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#7b1fa2] font-bold">
                  Step 04
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Education and student status
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Education information helps identify scholarship and
                  education-related schemes.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Highest education level
                  </label>

                  <select
                    value={answers.education}
                    onChange={(event) =>
                      updateAnswer("education", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#7b1fa2] focus:ring-1 focus:ring-[#7b1fa2]/20"
                  >
                    <option value="">Select education level</option>
                    <option value="Below 10th">Below 10th</option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">
                      Post Graduate
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Are you currently a student?
                  </label>

                  <select
                    value={answers.student}
                    onChange={(event) =>
                      updateAnswer("student", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#7b1fa2] focus:ring-1 focus:ring-[#7b1fa2]/20"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

              </div>
            </section>
          )}

          {/* ================= STEP 5 ================= */}
          {step === 5 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#1565c0] font-bold">
                  Step 05
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Social category and disability
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Some schemes have specific category or disability
                  requirements.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Social category
                  </label>

                  <select
                    value={answers.category}
                    onChange={(event) =>
                      updateAnswer("category", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#1565c0] focus:ring-1 focus:ring-[#1565c0]/20"
                  >
                    <option value="">Select category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Do you have a disability?
                  </label>

                  <select
                    value={answers.disability}
                    onChange={(event) =>
                      updateAnswer("disability", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#1565c0] focus:ring-1 focus:ring-[#1565c0]/20"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>

              </div>
            </section>
          )}

          {/* ================= STEP 6 ================= */}
          {step === 6 && (
            <section className="bg-white border border-slate-200 shadow-sm">

              <div className="border-b border-slate-200 px-6 md:px-8 py-7">
                <p className="text-xs uppercase tracking-wider text-[#f57c00] font-bold">
                  Step 06
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Additional information
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  A few additional details will help improve scheme matching.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-7">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Are you a farmer?
                  </label>

                  <select
                    value={answers.farmer}
                    onChange={(event) =>
                      updateAnswer("farmer", event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#f57c00] focus:ring-1 focus:ring-[#f57c00]/20"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Do you belong to any special category?
                  </label>

                  <select
                    value={answers.specialCategory}
                    onChange={(event) =>
                      updateAnswer(
                        "specialCategory",
                        event.target.value
                      )
                    }
                    required
                    className="w-full border border-slate-300 px-4 py-3.5 bg-white outline-none focus:border-[#f57c00] focus:ring-1 focus:ring-[#f57c00]/20"
                  >
                    <option value="">Select an option</option>
                    <option value="None">None</option>
                    <option value="Widow">Widow</option>
                    <option value="Single Parent">Single Parent</option>
                    <option value="Senior Citizen">
                      Senior Citizen
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="bg-[#eef7f5] border-l-4 border-[#00695c] p-5">
                  <div className="flex gap-4">

                    <div className="w-10 h-10 bg-[#00695c] text-white flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Your assessment is ready
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Review your information and continue to explore
                        government schemes that may be relevant to your
                        profile.
                      </p>

                      {assessmentId && (
                        <p className="mt-3 text-xs text-slate-500">
                          Assessment reference: #{assessmentId}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </section>
          )}
          {submitError && (
  <div className="mt-6 border border-red-200 bg-red-50 p-4">
    <p className="text-sm font-semibold text-red-700">
      Unable to save assessment
    </p>

    <p className="mt-1 text-sm text-red-600">
      {submitError}
    </p>
  </div>
)}

          {/* ================= NAVIGATION ================= */}
          <div className="mt-6 bg-white border border-slate-200 p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1}
              className={`px-6 py-3 border font-semibold transition ${
                step === 1
                  ? "border-slate-200 text-slate-300 cursor-not-allowed"
                  : "border-slate-300 text-slate-700 hover:border-[#00695c] hover:text-[#00695c]"
              }`}
            >
              ← Previous
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isStartingAssessment || !!assessmentError}
                className="px-7 py-3 bg-[#00695c] text-white font-semibold hover:bg-[#00574f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button
  type="submit"
  disabled={
    isStartingAssessment ||
    !!assessmentError ||
    isSubmitting
  }
  className="px-7 py-3 bg-[#f57c00] text-white font-semibold hover:bg-[#e66f00] transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting
    ? "Saving your assessment..."
    : "View My Recommendations →"}
</button>
            )}

          </div>

        </form>

        {/* ================= NOTICE ================= */}
        <div className="mt-8 bg-white border border-slate-200 p-5">

          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">
              Privacy and eligibility notice:
            </strong>{" "}
            The information provided in this assessment is used to identify
            potentially relevant government schemes. A recommendation does not
            guarantee official eligibility. Final eligibility is determined by
            the concerned government authority.
          </p>

        </div>

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

export default Assessment