// Upload file to Google Drive using fetch API (browser-compatible)
export const uploadFileToDrive = async (file, accessToken, folderId = null) => {
  try {
    // Use the default folder ID if none is provided
    const targetFolderId = folderId || getDefaultFolderId()

    console.log("Uploading file to folder ID:", targetFolderId)

    // Step 1: Create a metadata request to create the file
    const metadata = {
      name: file.name,
      mimeType: file.type,
    }

    // Add the folder ID to the parents array
    if (targetFolderId) {
      metadata.parents = [targetFolderId]
    }

    // Create the file metadata first
    const metadataResponse = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    })

    if (!metadataResponse.ok) {
      throw new Error(`Failed to create file metadata: ${metadataResponse.statusText}`)
    }

    const fileData = await metadataResponse.json()
    const fileId = fileData.id

    // Step 2: Upload the file content
    const contentResponse = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    })

    if (!contentResponse.ok) {
      throw new Error(`Failed to upload file content: ${contentResponse.statusText}`)
    }

    // Step 3: Make the file publicly accessible
    const permissionResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "reader",
        type: "anyone",
      }),
    })

    if (!permissionResponse.ok) {
      throw new Error(`Failed to set file permissions: ${permissionResponse.statusText}`)
    }

    // Step 4: Get the file's web view link
    const getFileResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,webContentLink,name`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!getFileResponse.ok) {
      throw new Error(`Failed to get file details: ${getFileResponse.statusText}`)
    }

    const fileDetails = await getFileResponse.json()

    return {
      id: fileId,
      name: fileDetails.name || file.name,
      link: fileDetails.webContentLink || `https://drive.google.com/uc?export=view&id=${fileId}`,
      viewLink: fileDetails.webViewLink || `https://drive.google.com/file/d/${fileId}/view`,
    }
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error)
    throw error
  }
}

// Create a folder in Google Drive
export const createFolder = async (folderName, accessToken) => {
  try {
    const metadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    }

    const response = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    })

    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.statusText}`)
    }

    const folderData = await response.json()
    return folderData.id
  } catch (error) {
    console.error("Error creating folder in Google Drive:", error)
    throw error
  }
}

// Get folder details
export const getFolderDetails = async (folderId, accessToken) => {
  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}?fields=name,id,mimeType`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get folder details: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting folder details:", error)
    throw error
  }
}

// Helper to extract file ID from Google Drive URL
export const getFileIdFromUrl = (url) => {
  if (!url) return ""
  const matches = url.match(/[-\w]{25,}/)
  return matches ? matches[0] : ""
}

// Get a direct view URL for a Google Drive file
export const getViewUrl = (url) => {
  const fileId = getFileIdFromUrl(url)
  if (!fileId) return url

  // For PDFs
  if (url.includes(".pdf") || url.includes("application/pdf")) {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  // For images
  if (url.includes("image/") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".png")) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }

  // Default view
  return `https://drive.google.com/file/d/${fileId}/view`
}

// Set default folder ID
export const setDefaultFolderId = (folderId) => {
  if (folderId) {
    localStorage.setItem("csuOcidFolderId", folderId)
    return true
  }
  return false
}

// Get default folder ID
export const getDefaultFolderId = () => {
  return localStorage.getItem("csuOcidFolderId") || "1qilGYdnZCNc9iYbKmTfU6ovEYEzSdHCW" // Your provided folder ID as default
}
