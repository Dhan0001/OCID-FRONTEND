"use client"
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"

const CAAUndergrad = () => {
  // Undergraduate programs for CAA
  const programs = [
    {
      id: 1,
      name: "Bachelor of Science in Agriculture (BSA)",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2022: "https://drive.google.com/file/d/1KvvNyQ4H3B0nEohCLQD_XenpoCYm4xXS/view?usp=sharing",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 2,
      name: "Bachelor of Science in Agricultural Economics (BSAEC)",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 3,
      name: "Bachelor of Science in Animal Science (BSAS)",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 4,
      name: "Bachelor of Science in Development Communication (BSDC)",
      curriculumFiles: {
        2023: "/placeholder.svg?height=800&width=600",
        2020: "/placeholder.svg?height=800&width=600",
      },
    },
    {
      id: 5,
      name: "Bachelor of Science in Agribusiness (BSAB)",
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

          // Hardcoded folder ID for CAA Undergrad
          const targetFolderId = "1qilGYdnZCNc9iYbKmTfU6ovEYEzSdHCW" // Replace with actual folder ID

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
          setFolderStatus("Creating file...")

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
