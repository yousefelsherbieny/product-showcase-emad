// lib/firebase/index.ts
// Main Firebase exports for easy importing

// Core Firebase app and services
export { app, auth, db, storage, analytics } from "./config"

// Authentication functions
export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  resetPassword,
  updateUserProfile as updateAuthUserProfile,
  updateUserPassword,
  signOutUser,
  getCurrentUser,
  onAuthStateChanged,
} from "./auth"

// Storage functions
export {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  deleteMultipleFiles,
  getFileMetadata,
  updateFileMetadata,
  listFiles,
  generateFilePath,
  validateFileType,
  validateFileSize,
  IMAGE_TYPES,
  DOCUMENT_TYPES,
  VIDEO_TYPES,
} from "./storage"

// Analytics functions
export {
  logCustomEvent,
  logPageView,
  logSignUp,
  logLogin,
  logSearch,
  logShare,
  logPurchase,
  logAddToCart,
  logBeginCheckout,
  logCompanyDetailsSubmitted,
  logPersonalAssistantUsed,
  logGiftCodeRedeemed,
  logOTPVerified,
  logPasswordReset,
  logError,
  logPerformance,
} from "./analytics"

// Firestore functions
export {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  getDocumentsPaginated,
  createUserProfile,
  getUserProfile,
  updateUserProfile as updateUserProfileFirestore,
  createCompany,
  getCompany,
  getUserCompanies,
  addToArray,
  removeFromArray,
  incrementField,
  serverTimestamp,
  Timestamp,
} from "./firestore"

// Types (re-export from Firebase)
export type { User } from "firebase/auth"
export type { DocumentData } from "firebase/firestore"
