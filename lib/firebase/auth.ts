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
import { auth, db } from "./config"
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore"

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

    const user = userCredential.user

    if (displayName && user) {
      await updateProfile(user, { displayName })
    }

    if (user) {
      await sendEmailVerification(user)

      // ✅ Create user document in Firestore
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      // ✅ Create empty purchases subcollection for the user
      const purchasesRef = doc(collection(userRef, "purchases"))
      await setDoc(purchasesRef, {
        createdAt: serverTimestamp(),
        initialized: true,
      })
    }

    return user
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

    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

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
