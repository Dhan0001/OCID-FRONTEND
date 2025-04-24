"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import {
  ChevronDown,
  X,
  Upload,
  FileText,
  Calculator,
  ArrowLeft,
  GraduationCap,
  Microscope,
  Building2,
  Languages,
  BookText,
  Atom,
  Users,
} from "lucide-react"
import { getViewUrl } from "../utils/googleDriveUtils"

const CEDGraduate = () => {
  // Undergraduate programs for CED with updated icons
  const programs = [
    {
      id: 1,
      name: "Master of Science in Mathematics Education",
      icon: Calculator,
      color: "from-blue-600 to-blue-800",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1nOh1YUzBN614udXRADrk4UZRAp6JkGAK/view?usp=sharing",
      },
    },
    {
      id: 2,
      name: "Doctor of Philosophy in Mathematics Education (PhDMathEd)",
      icon: GraduationCap,
      color: "from-blue-700 to-blue-900",
      curriculumFiles: {
        2023: "hhttps://drive.google.com/file/d/1qqRnJXJz5xvidANpyjaBxt9FxFcBfjr5/view?usp=sharing",
      },
    },
    {
      id: 3,
      name: "Master of Science Education With specialization In Biology",
      icon: Microscope,
      color: "from-blue-500 to-blue-700",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/15gilWZWuwpV6OL13OUo0mrATz_09Pjpw/view?usp=sharing",
      },
    },
    {
      id: 4,
      name: "Doctor of Education Major in Educational Management",
      icon: Building2,
      color: "from-blue-700 to-blue-900",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1qAlJBtLeb3TN6JQbnWLjM1_TSQHp9jsR/view?usp=sharing",
      },
    },
    {
      id: 5,
      name: "Master of Arts in Educational Management Major in English Language Teaching",
      icon: Languages,
      color: "from-blue-500 to-blue-700",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1-EulxOSvl-tvUVb4UmQgkx0MLtnKuySe/view?usp=sharing",
      },
    },
    {
      id: 6,
      name: "Master of Arts in Education Major in Educational Management",
      icon: Users,
      color: "from-blue-600 to-blue-800",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1iza-xRmVn1DL1MvqS3JL9qtsRYtMnp-A/view?usp=sharing",
      },
    },
    {
      id: 7,
      name: "Master of Arts in Education (MAEd), Major in Teaching Reading and Literature (TRL)",
      icon: BookText,
      color: "from-blue-500 to-blue-700",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1Sx9qVjU0WtlKCq76PNDbk2OLAOjBq_m0/view?usp=sharing",
      },
    },
    {
      id: 8,
      name: "Doctor Of Philosophy in Science Education with Specialization in Physics (PhDScied Physics)",
      icon: Atom,
      color: "from-blue-700 to-blue-900",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1ctwpgtiJPz05TZ7h9dFB4YhaylfO2mBy/view?usp=sharing",
      },
    },
    {
      id: 9,
      name: "Master of Science Education with specialization in Physics",
      icon: Atom,
      color: "from-blue-500 to-blue-700",
      curriculumFiles: {
        2023: "https://drive.google.com/file/d/1w6KRmXAdwNpFvEjnvrl7UA-WqnkPDqPZ/view?usp=sharing",
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
  const [folderStatus, setFolderStatus] = useState("")

  // Google login hook for file upload
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (fileToUpload && selectedProgram !== null) {
        try {
          setIsUploading(true)
          setFolderStatus("Starting upload process...")

          // Hardcoded folder ID for CED Graduate
          // This is the folder ID where all files will be uploaded directly
          const targetFolderId = "1qilGYdnZCNc9iYbKmTfU6ovEYEzSdHCW" // Default folder ID

          // First verify we can access the folder
          try {
            setFolderStatus("Verifying folder access...")
            const folderCheckResponse = await fetch(
              `https://www.googleapis.com/drive/v3/files/${targetFolderId}?fields=id,name,mimeType`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              },
            )

            if (!folderCheckResponse.ok) {
              throw new Error(
                `Cannot access target folder: ${folderCheckResponse.status} ${folderCheckResponse.statusText}`,
              )
            }

            const folderData = await folderCheckResponse.json()
            setFolderStatus(`Uploading to folder: ${folderData.name}`)
          } catch (folderError) {
            console.error("Folder access error:", folderError)
            setFolderStatus("Cannot access target folder. Uploading to root instead.")
            // Continue with upload to root if folder is inaccessible
          }

          // Simple direct upload approach
          setFolderStatus("Uploading file...")

          // Create file metadata
          const metadata = {
            name: fileToUpload.name,
            mimeType: fileToUpload.type,
          }

          // Add the folder ID to parents if we have access
          if (targetFolderId) {
            metadata.parents = [targetFolderId]
          }

          // Step 1: Create the file metadata
          const metadataResponse = await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(metadata),
          })

          if (!metadataResponse.ok) {
            const errorData = await metadataResponse.json().catch(() => ({}))
            console.error("Metadata creation error:", errorData)
            throw new Error(`Failed to create file metadata: ${metadataResponse.status} ${metadataResponse.statusText}`)
          }

          const fileData = await metadataResponse.json()
          const fileId = fileData.id
          setFolderStatus("File created, uploading content...")

          // Step 2: Upload the file content
          const contentResponse = await fetch(
            `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
                "Content-Type": fileToUpload.type,
              },
              body: fileToUpload,
            },
          )

          if (!contentResponse.ok) {
            throw new Error(`Failed to upload file content: ${contentResponse.status} ${contentResponse.statusText}`)
          }

          setFolderStatus("Setting file permissions...")

          // Step 3: Set permissions to make the file accessible via link
          try {
            const permissionResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                role: "reader",
                type: "anyone",
                allowFileDiscovery: false,
              }),
            })

            if (!permissionResponse.ok) {
              console.warn("Permission setting warning:", await permissionResponse.text())
            }
          } catch (permError) {
            console.warn("Error setting permissions, but continuing:", permError)
          }

          // Step 4: Get the file's web view link
          const getFileResponse = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,name`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            },
          )

          let fileLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`

          if (getFileResponse.ok) {
            const fileDetails = await getFileResponse.json()
            fileLink = fileDetails.webViewLink || fileLink
          }

          // Update program state with the Google Drive link
          const updatedPrograms = [...programsState]
          updatedPrograms[selectedProgram].curriculumFiles[selectedYear] = fileLink
          setProgramsState(updatedPrograms)

          setShowCurriculumUpload(false)
          setFileToUpload(null)
          setFolderStatus("")
          alert("Curriculum file uploaded successfully to Google Drive!")
        } catch (error) {
          console.error("Upload error:", error)
          alert(`Error uploading file: ${error.message}`)
          setFolderStatus("")
        } finally {
          setIsUploading(false)
        }
      }
    },
    onError: (error) => {
      console.log("Google Login Failed:", error)
      alert("Google login failed. Please try again.")
      setIsUploading(false)
      setFolderStatus("")
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

  // Updated handleCurriculumYearSelect function to handle all years consistently
  const handleCurriculumYearSelect = (year, program, programIndex) => {
    const curriculumFile = program.curriculumFiles[year]

    // Check if the curriculum file is a Google Drive link
    if (curriculumFile && curriculumFile.includes("drive.google.com")) {
      try {
        // Get the file ID from the Google Drive URL
        const fileId = curriculumFile.match(/[-\w]{25,}/)?.[0]

        if (fileId) {
          // Use the format that requires authentication
          const authRequiredUrl = `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`

          // Open the link directly in a new tab
          window.open(authRequiredUrl, "_blank")
          return
        }
      } catch (error) {
        // If there's an error (like invalid URL format), show the curriculum viewer instead
        console.error("Error opening Google Drive link:", error)
      }
    }

    // For files that are not Google Drive links or if there was an error, show the curriculum viewer
    setSelectedProgram(programIndex)
    setSelectedYear(year)
    setShowCurriculumViewer(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Back Button */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-12 relative">
        {/* Back Button - Exactly matching CAA-Graduate placement and styling */}
        <div className="container mx-auto px-6 relative">
          <Link
            to="/colleges"
            className="absolute left-0 -top-6 inline-flex items-center text-blue-800 hover:text-blue-900 bg-white hover:bg-white/90 px-4 py-2 rounded-lg transition-all duration-200 shadow-md z-10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Colleges</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center relative">
            {/* CED Logo */}
            <div className="w-24 h-24 bg-white rounded-full p-1 flex-shrink-0 mb-6 shadow-lg">
              <img src="/images/ced-logo.png" alt="CED Logo" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">College of Education</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our graduate programs designed to advance your career in education, develop specialized expertise,
              and prepare you for leadership roles in educational institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Graduate Programs</h2>

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
              themeColor="blue"
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
                {folderStatus && <p className="text-sm text-gray-600 mt-2 italic">Status: {folderStatus}</p>}
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
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
                {programsState[selectedProgram].curriculumFiles[selectedYear]?.includes("drive.google.com") ? (
                  // If it's a Google Drive file, use the authentication-required URL format
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
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

// Update the ProgramCard component to match CAA-Graduate.jsx exactly
const ProgramCard = ({
  program,
  programIndex,
  setSelectedProgram,
  setSelectedYear,
  setShowCurriculumUpload,
  setShowCurriculumViewer,
  themeColor,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const Icon = program.icon

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  // Updated handleCurriculumYearSelect function to handle all years consistently
  const handleCurriculumYearSelect = (year) => {
    const curriculumFile = program.curriculumFiles[year]

    // Check if the curriculum file is a Google Drive link
    if (curriculumFile && curriculumFile.includes("drive.google.com")) {
      // Get the file ID from the Google Drive URL
      const fileId = curriculumFile.match(/[-\w]{25,}/)?.[0]

      if (fileId) {
        // Use this specific format that will require authentication
        // Adding the 'usp=drivesdk' parameter helps enforce authentication requirements
        const authRequiredUrl = `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`

        // Open the link directly in a new tab
        window.open(authRequiredUrl, "_blank")
      } else {
        // For files that are not Google Drive links, show the curriculum viewer
        setSelectedProgram(programIndex)
        setSelectedYear(year)
        setShowCurriculumViewer(true)
      }
    } else {
      // For files that are not Google Drive links, show the curriculum viewer
      setSelectedProgram(programIndex)
      setSelectedYear(year)
      setShowCurriculumViewer(true)
    }

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
                    {["2023"].map((year) => (
                      <li key={year}>
                        <Link
                          to="#"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                          onClick={() => {
                            handleCurriculumYearSelect(year)
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
    </div>
  )
}

export default CEDGraduate
