// lib/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"
import { auth } from "./config"

// Email and Password Authentication
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    
    // Update display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
    
    // Send email verification
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user)
    }
    
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message || "Failed to create account")
  }
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in")
  }
}

// Google Authentication
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider()
    // Add additional scopes if needed
    provider.addScope("profile")
    provider.addScope("email")
    
    const result: UserCredential = await signInWithPopup(auth, provider)
    return result.user
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in with Google")
  }
}

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(error.message || "Failed to send password reset email")
  }
}

// Update User Profile
export const updateUserProfile = async (
  user: User,
  updates: { displayName?: string; photoURL?: string }
): Promise<void> => {
  try {
    await updateProfile(user, updates)
  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile")
  }
}

// Update Password
export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const user = auth.currentUser
    if (!user || !user.email) {
      throw new Error("No authenticated user found")
    }

    // Re-authenticate user before updating password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
    
    // Update password
    await updatePassword(user, newPassword)
  } catch (error: any) {
    throw new Error(error.message || "Failed to update password")
  }
}

// Sign Out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out")
  }
}

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Auth State Observer
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback)
}

export { auth }
