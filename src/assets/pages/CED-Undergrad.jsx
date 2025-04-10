"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { ChevronDown, X, BookOpen, Upload, FileText, GraduationCap, School, Users, Baby, Brain } from "lucide-react"

const CEDUndergrad = () => {
  // Undergraduate programs for CED
  const programs = [
    {
      id: 1,
      name: "Bachelor of Elementary Education (BEEd)",
      icon: School,
      color: "from-blue-600 to-blue-800",
      description:
        "The Bachelor of Elementary Education (BEEd) program prepares students to become effective elementary school teachers. The curriculum focuses on child development, teaching methodologies, curriculum design, and classroom management. Students will develop the skills to create engaging learning environments and implement effective teaching strategies for young learners.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
        2005: "/placeholder.svg?height=800&width=600",
        2003: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 2,
      name: "Bachelor of Secondary Education (BSEd)",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-700",
      description:
        "The Bachelor of Secondary Education (BSEd) program prepares students to teach at the secondary school level. Students specialize in specific subject areas such as Mathematics, Science, English, or Social Studies. The curriculum includes educational psychology, teaching methodologies, assessment strategies, and subject-specific content knowledge.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 3,
      name: "Bachelor of Physical Education (BPE)",
      icon: Users,
      color: "from-blue-400 to-blue-600",
      description:
        "The Bachelor of Physical Education (BPE) program focuses on physical fitness, sports science, and health education. Students learn about human anatomy, physiology, sports psychology, coaching techniques, and physical education teaching methodologies. Graduates are prepared to teach physical education in schools or work in sports and fitness-related fields.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 4,
      name: "Bachelor of Early Childhood Education (BECEd)",
      icon: Baby,
      color: "from-blue-500 to-blue-700",
      description:
        "The Bachelor of Early Childhood Education (BECEd) program focuses on the education and development of children from birth to eight years old. Students learn about child development, early literacy, play-based learning, and developmentally appropriate teaching practices. Graduates are prepared to work in preschools, kindergartens, and early elementary settings.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 5,
      name: "Bachelor of Special Education (BSPEd)",
      icon: Brain,
      color: "from-blue-600 to-blue-800",
      description:
        "The Bachelor of Special Education (BSPEd) program prepares students to work with children and youth with diverse learning needs and disabilities. The curriculum covers inclusive education practices, individualized education planning, assistive technologies, and specialized teaching methodologies. Graduates are equipped to support learners with special needs in various educational settings.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
  ]

  const [programsState, setProgramsState] = useState(programs)
  const [showCurriculumUpload, setShowCurriculumUpload] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedYear, setSelectedYear] = useState("2023")
  const [showCurriculumViewer, setShowCurriculumViewer] = useState(false)

  // Handle curriculum file upload
  const handleCurriculumUpload = (file) => {
    if (!file) return

    // In a real app, this would upload the file to a server
    // For now, we'll simulate it with a placeholder

    // Create a copy of the programs state
    const updatedPrograms = [...programsState]

    // Update the curriculum file for the selected program
    updatedPrograms[selectedProgram].curriculumFiles["2023"] = "/placeholder.svg?height=800&width=600"

    // Update state
    setProgramsState(updatedPrograms)

    // Close the upload modal
    setShowCurriculumUpload(false)

    // Show success message
    alert("Curriculum file uploaded successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            {/* CED Logo */}
            <div className="w-24 h-24 bg-white rounded-full p-1 flex-shrink-0 mb-6">
              <img src="/images/ced-logo.png" alt="CED Logo" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">College of Education</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our undergraduate programs designed to prepare you for success in the field of education, shaping
              the minds of future generations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Undergraduate Programs</h2>

        {/* Programs List */}
        <div className="space-y-8">
          {programsState.map((program, programIndex) => (
            <ProgramCard
              key={program.id}
              program={program}
              programIndex={programIndex}
              setSelectedProgram={setSelectedProgram}
              setSelectedYear={setSelectedYear}
              setShowCurriculumUpload={setShowCurriculumUpload}
              setShowCurriculumViewer={setShowCurriculumViewer}
            />
          ))}
        </div>
      </div>

      {/* Curriculum Upload Modal */}
      {showCurriculumUpload && selectedProgram !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-blue-700">Upload Curriculum File</h3>
                <button
                  onClick={() => setShowCurriculumUpload(false)}
                  className="text-gray-400 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-gray-700">
                  Uploading curriculum for: <span className="font-semibold">{programsState[selectedProgram].name}</span>
                </p>
              </div>

              <div className="space-y-5">
                {/* Curriculum File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">Drag and drop your curriculum file here</p>
                    <p className="text-gray-500 text-sm mb-4">or</p>
                    <label
                      htmlFor="curriculumFile"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Browse Files
                    </label>
                    <input
                      type="file"
                      id="curriculumFile"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleCurriculumUpload(e.target.files[0])
                        }
                      }}
                    />
                    <p className="mt-3 text-xs text-gray-500">Supported formats: JPG, PNG, PDF (max 10MB)</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCurriculumUpload(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-3 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Viewer Modal */}
      {showCurriculumViewer && selectedProgram !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b">
              <div>
                <h3 className="text-xl font-bold text-blue-700">Program Curriculum</h3>
                <p className="text-sm text-gray-600">
                  {programsState[selectedProgram].name} - {selectedYear}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowCurriculumUpload(true)
                    setShowCurriculumViewer(false)
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload New
                </button>
                <button
                  onClick={() => setShowCurriculumViewer(false)}
                  className="text-gray-400 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              <div className="flex justify-center">
                <img
                  src={programsState[selectedProgram].curriculumFiles[selectedYear] || "/placeholder.svg"}
                  alt={`${programsState[selectedProgram].name} Curriculum ${selectedYear}`}
                  className="max-w-full h-auto shadow-md rounded-md"
                />
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Click the download button to save this curriculum file</div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  onClick={() => alert("In a real application, this would download the curriculum file.")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Updated ProgramCard component with direct upload button
const ProgramCard = ({
  program,
  programIndex,
  setSelectedProgram,
  setSelectedYear,
  setShowCurriculumUpload,
  setShowCurriculumViewer,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showDescription, setShowDescription] = useState(false)
  const Icon = program.icon

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  // Handle curriculum year selection
  const handleCurriculumYearSelect = (year) => {
    setSelectedProgram(programIndex)
    setSelectedYear(year)
    setShowCurriculumViewer(true)
    setActiveDropdown(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-visible border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-md mr-4`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{program.name}</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Description Button */}
            <button
              onClick={() => setShowDescription(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center text-sm shadow-sm hover:shadow-md flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Description
            </button>

            {/* Upload Curriculum File Button - Direct action, no dropdown */}
            <button
              onClick={() => {
                setSelectedProgram(programIndex)
                setSelectedYear("2023") // Default to current year
                setShowCurriculumUpload(true)
              }}
              className="px-5 py-2.5 rounded-lg bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-1 text-sm shadow-sm hover:shadow-md"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Curriculum File
            </button>

            {/* View Curriculum Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={() => toggleDropdown("view-curriculum")}
                className="px-5 py-2.5 rounded-lg bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-1 text-sm shadow-sm hover:shadow-md"
              >
                View Curriculum
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeDropdown === "view-curriculum" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "view-curriculum" && (
                <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1">
                    {["2019", "2022", "2024"].map((year) => (
                      <li key={year}>
                        <Link
                          to="#"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                          onClick={() => {
                            handleCurriculumYearSelect(year)
                            setActiveDropdown(null)
                          }}
                        >
                          {year}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-700">Program Description</h3>
                <button
                  onClick={() => setShowDescription(false)}
                  className="text-gray-400 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-lg mb-2">{program.name}</h4>
                <p className="text-gray-700 leading-relaxed">{program.description}</p>

                <div className="mt-6">
                  <h5 className="font-bold text-md mb-2">Program Objectives:</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Develop competent and effective educators for diverse learning environments</li>
                    <li>Build a strong foundation in educational theory and teaching methodologies</li>
                    <li>Cultivate critical thinking and problem-solving skills for educational challenges</li>
                    <li>Prepare students for the evolving landscape of education</li>
                    <li>Foster ethical awareness and professional responsibility in education</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h5 className="font-bold text-md mb-2">Career Opportunities:</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Classroom Teacher</li>
                    <li>Curriculum Developer</li>
                    <li>Educational Administrator</li>
                    <li>Instructional Coordinator</li>
                    <li>Educational Consultant</li>
                    <li>School Counselor</li>
                    <li>Educational Technology Specialist</li>
                    <li>Special Education Teacher</li>
                    <li>Education Policy Analyst</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CEDUndergrad

