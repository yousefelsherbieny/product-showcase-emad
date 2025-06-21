// lib/firebase/storage.ts
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  UploadResult,
  UploadTask,
  StorageReference,
} from "firebase/storage"
import { storage } from "./config"

// Upload File with Progress
export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const storageRef: StorageReference = ref(storage, path)
    
    if (onProgress) {
      // Use resumable upload for progress tracking
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, file)
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            onProgress(progress)
          },
          (error) => {
            reject(new Error(error.message || "Upload failed"))
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              resolve(downloadURL)
            } catch (error: any) {
              reject(new Error(error.message || "Failed to get download URL"))
            }
          }
        )
      })
    } else {
      // Simple upload without progress tracking
      const snapshot: UploadResult = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload file")
  }
}

// Upload Multiple Files
export const uploadMultipleFiles = async (
  files: File[],
  basePath: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const filePath = `${basePath}/${Date.now()}_${file.name}`
      return uploadFile(
        file,
        filePath,
        onProgress ? (progress) => onProgress(index, progress) : undefined
      )
    })
    
    const downloadURLs = await Promise.all(uploadPromises)
    return downloadURLs
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload multiple files")
  }
}

// Delete File
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef: StorageReference = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete file")
  }
}

// Delete Multiple Files
export const deleteMultipleFiles = async (paths: string[]): Promise<void> => {
  try {
    const deletePromises = paths.map((path) => deleteFile(path))
    await Promise.all(deletePromises)
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete multiple files")
  }
}

// Get File Metadata
export const getFileMetadata = async (path: string) => {
  try {
    const storageRef: StorageReference = ref(storage, path)
    const metadata = await getMetadata(storageRef)
    return metadata
  } catch (error: any) {
    throw new Error(error.message || "Failed to get file metadata")
  }
}

// Update File Metadata
export const updateFileMetadata = async (
  path: string,
  newMetadata: { [key: string]: string }
) => {
  try {
    const storageRef: StorageReference = ref(storage, path)
    const metadata = await updateMetadata(storageRef, {
      customMetadata: newMetadata,
    })
    return metadata
  } catch (error: any) {
    throw new Error(error.message || "Failed to update file metadata")
  }
}

// List Files in Directory
export const listFiles = async (path: string) => {
  try {
    const storageRef: StorageReference = ref(storage, path)
    const result = await listAll(storageRef)
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const downloadURL = await getDownloadURL(itemRef)
        const metadata = await getMetadata(itemRef)
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          downloadURL,
          metadata,
        }
      })
    )
    
    return files
  } catch (error: any) {
    throw new Error(error.message || "Failed to list files")
  }
}

// Generate File Path with Timestamp
export const generateFilePath = (
  basePath: string,
  fileName: string,
  userId?: string
): string => {
  const timestamp = Date.now()
  const userPrefix = userId ? `${userId}/` : ""
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_")
  return `${basePath}/${userPrefix}${timestamp}_${cleanFileName}`
}

// Validate File Type
export const validateFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type)
}

// Validate File Size
export const validateFileSize = (
  file: File,
  maxSizeInMB: number
): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

// Common file type validators
export const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]

export const DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]

export const VIDEO_TYPES = [
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/webm",
]

export { storage }

