"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import {
  ChevronDown,
  X,
  BookOpen,
  Upload,
  FileText,
  TreesIcon as Tree,
  Leaf,
  Mountain,
  Recycle,
  CloudRain,
} from "lucide-react"
import { uploadFileToDrive, getViewUrl } from "../utils/googleDriveUtils"

const COFESUndergrad = () => {
  // Undergraduate programs for COFES
  const programs = [
    {
      id: 1,
      name: "Bachelor of Science in Forestry (BSF)",
      icon: Tree,
      color: "from-green-600 to-green-800",
      description:
        "The Bachelor of Science in Forestry (BSF) program focuses on sustainable forest management, conservation, and utilization of forest resources. Students learn about forest ecology, silviculture, forest protection, and forest policy. The program prepares graduates for careers in forest management, conservation, and environmental protection.",
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
      name: "Bachelor of Science in Environmental Science (BSES)",
      icon: Leaf,
      color: "from-green-500 to-green-700",
      description:
        "The Bachelor of Science in Environmental Science (BSES) program provides a comprehensive understanding of environmental systems, processes, and challenges. Students study ecology, environmental chemistry, pollution control, and environmental impact assessment. Graduates are prepared to address environmental issues and promote sustainable practices.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 3,
      name: "Bachelor of Science in Environmental Management (BSEM)",
      icon: Recycle,
      color: "from-green-400 to-green-600",
      description:
        "The Bachelor of Science in Environmental Management (BSEM) program focuses on the management of environmental resources and systems. Students learn about environmental policy, natural resource management, environmental economics, and sustainable development. The program prepares graduates for careers in environmental planning, policy development, and resource management.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 4,
      name: "Bachelor of Science in Agroforestry (BSAF)",
      icon: Mountain,
      color: "from-green-500 to-green-700",
      description:
        "The Bachelor of Science in Agroforestry (BSAF) program integrates forestry and agriculture to create sustainable land-use systems. Students study tree cultivation, crop production, soil conservation, and integrated farming systems. Graduates are equipped to develop and manage agroforestry systems that balance productivity with environmental conservation.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 5,
      name: "Bachelor of Science in Wildlife Management (BSWM)",
      icon: CloudRain,
      color: "from-green-600 to-green-800",
      description:
        "The Bachelor of Science in Wildlife Management (BSWM) program focuses on the conservation and management of wildlife populations and their habitats. Students learn about wildlife ecology, habitat management, conservation biology, and wildlife policy. The program prepares graduates for careers in wildlife conservation, research, and management.",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
        2014: "/placeholder.svg?height=800&width=600",
      },
    },
  ]

  const [programsState, setProgramsState] = useState(programs)
  const [showCurriculumUpload, setShowCurriculumUpload] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedYear, setSelectedYear] = useState("2023")
  const [showCurriculumViewer, setShowCurriculumViewer] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // Google login hook for file upload
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (fileToUpload && selectedProgram !== null) {
        try {
          setIsUploading(true)
          // Upload file to Google Drive
          const fileData = await uploadFileToDrive(
            fileToUpload,
            tokenResponse.access_token,
            "1qilGYdnZCNc9iYbKmTfU6ovEYEzSdHCW", // Add your folder ID here
          )

          // Update program state with the Google Drive link
          const updatedPrograms = [...programsState]
          updatedPrograms[selectedProgram].curriculumFiles[selectedYear] = fileData.link
          setProgramsState(updatedPrograms)

          setShowCurriculumUpload(false)
          setFileToUpload(null)
          alert("Curriculum file uploaded successfully to Google Drive!")
        } catch (error) {
          alert("Error uploading file: " + error.message)
        } finally {
          setIsUploading(false)
        }
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error)
      alert("Google login failed. Please try again.")
      setIsUploading(false)
    },
    scope: "https://www.googleapis.com/auth/drive.file",
  })

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0])
    }
  }

  // Handle curriculum file upload
  const handleCurriculumUpload = () => {
    if (!fileToUpload) {
      alert("Please select a file first")
      return
    }

    // Trigger Google login which will then upload the file
    login()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            {/* COFES Logo */}
            <div className="w-24 h-24 bg-white rounded-full p-1 flex-shrink-0 mb-6">
              <img src="/images/logos/cofes-logo.png" alt="COFES Logo" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">College of Forestry and Environmental Sciences</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our undergraduate programs designed to prepare you for success in forestry, environmental
              management, and sustainable resource conservation.
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
                <h3 className="text-xl font-bold text-green-700">Upload Curriculum File</h3>
                <button
                  onClick={() => setShowCurriculumUpload(false)}
                  className="text-gray-400 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-gray-700">
                  Uploading curriculum for: <span className="font-semibold">{programsState[selectedProgram].name}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Year: {selectedYear}</p>
              </div>

              <div className="space-y-5">
                {/* Curriculum File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      {fileToUpload ? fileToUpload.name : "Drag and drop your curriculum file here"}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">or</p>
                    <label
                      htmlFor="curriculumFile"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Browse Files
                    </label>
                    <input
                      type="file"
                      id="curriculumFile"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileSelect}
                    />
                    <p className="mt-3 text-xs text-gray-500">Supported formats: JPG, PNG, PDF (max 10MB)</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCurriculumUpload(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-3 hover:bg-gray-50 transition-all"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCurriculumUpload}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    disabled={!fileToUpload || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload to Google Drive
                      </>
                    )}
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
                <h3 className="text-xl font-bold text-green-700">Program Curriculum</h3>
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
                  className="text-gray-400 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              <div className="flex justify-center">
                {programsState[selectedProgram].curriculumFiles[selectedYear]?.includes("drive.google.com") ? (
                  // If it's a Google Drive file
                  <iframe
                    src={getViewUrl(programsState[selectedProgram].curriculumFiles[selectedYear])}
                    className="w-full h-[600px] border-0 shadow-md rounded-md"
                    title={`${programsState[selectedProgram].name} Curriculum ${selectedYear}`}
                    allowFullScreen
                  />
                ) : (
                  // If it's a regular image or placeholder
                  <img
                    src={programsState[selectedProgram].curriculumFiles[selectedYear] || "/placeholder.svg"}
                    alt={`${programsState[selectedProgram].name} Curriculum ${selectedYear}`}
                    className="max-w-full h-auto shadow-md rounded-md"
                  />
                )}
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Click the download button to save this curriculum file</div>
                <a
                  href={programsState[selectedProgram].curriculumFiles[selectedYear]}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
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
                </a>
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
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 text-center text-sm shadow-sm hover:shadow-md flex items-center"
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
              className="px-5 py-2.5 rounded-lg bg-white border border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center gap-1 text-sm shadow-sm hover:shadow-md"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Curriculum File
            </button>

            {/* View Curriculum Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={() => toggleDropdown("view-curriculum")}
                className="px-5 py-2.5 rounded-lg bg-white border border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center gap-1 text-sm shadow-sm hover:shadow-md"
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
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
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
                <h3 className="text-xl font-bold text-green-700">Program Description</h3>
                <button
                  onClick={() => setShowDescription(false)}
                  className="text-gray-400 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-gray-100"
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
                    <li>Develop expertise in sustainable forest and environmental management</li>
                    <li>Build a strong foundation in ecological principles and conservation practices</li>
                    <li>Cultivate problem-solving skills for environmental and resource challenges</li>
                    <li>Prepare students for careers in natural resource management and conservation</li>
                    <li>Foster ethical awareness and professional responsibility in environmental stewardship</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h5 className="font-bold text-md mb-2">Career Opportunities:</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Forest Manager</li>
                    <li>Environmental Scientist</li>
                    <li>Conservation Specialist</li>
                    <li>Wildlife Manager</li>
                    <li>Environmental Consultant</li>
                    <li>Natural Resource Planner</li>
                    <li>Sustainability Coordinator</li>
                    <li>Environmental Policy Analyst</li>
                    <li>Forestry Researcher</li>
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

export default COFESUndergrad
