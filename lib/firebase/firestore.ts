// lib/firebase/firestore.ts
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore"
import { db } from "./config"

// Generic CRUD Operations
export const createDocument = async (
  collectionName: string,
  data: DocumentData,
  docId?: string
): Promise<string> => {
  try {
    if (docId) {
      await setDoc(doc(db, collectionName, docId), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docId
    } else {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to create document")
  }
}

export const getDocument = async (
  collectionName: string,
  docId: string
): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to get document")
  }
}

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    throw new Error(error.message || "Failed to update document")
  }
}

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await deleteDoc(docRef)
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete document")
  }
}

// Query Operations
export const getDocuments = async (
  collectionName: string,
  conditions?: Array<{
    field: string
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "array-contains-any" | "not-in"
    value: any
  }>,
  orderByField?: string,
  orderDirection: "asc" | "desc" = "asc",
  limitCount?: number
): Promise<DocumentData[]> => {
  try {
    let q = collection(db, collectionName)
    let queryConstraints: any[] = []
    
    // Add where conditions
    if (conditions) {
      conditions.forEach((condition) => {
        queryConstraints.push(where(condition.field, condition.operator, condition.value))
      })
    }
    
    // Add ordering
    if (orderByField) {
      queryConstraints.push(orderBy(orderByField, orderDirection))
    }
    
    // Add limit
    if (limitCount) {
      queryConstraints.push(limit(limitCount))
    }
    
    const querySnapshot = await getDocs(query(q, ...queryConstraints))
    const documents: DocumentData[] = []
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    
    return documents
  } catch (error: any) {
    throw new Error(error.message || "Failed to get documents")
  }
}

// Pagination
export const getDocumentsPaginated = async (
  collectionName: string,
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot,
  conditions?: Array<{
    field: string
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "array-contains-any" | "not-in"
    value: any
  }>,
  orderByField: string = "createdAt",
  orderDirection: "asc" | "desc" = "desc"
): Promise<{
  documents: DocumentData[]
  lastDoc: QueryDocumentSnapshot | null
  hasMore: boolean
}> => {
  try {
    let queryConstraints: any[] = []
    
    // Add where conditions
    if (conditions) {
      conditions.forEach((condition) => {
        queryConstraints.push(where(condition.field, condition.operator, condition.value))
      })
    }
    
    // Add ordering
    queryConstraints.push(orderBy(orderByField, orderDirection))
    
    // Add pagination
    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc))
    }
    
    // Add limit (get one extra to check if there are more)
    queryConstraints.push(limit(pageSize + 1))
    
    const querySnapshot = await getDocs(query(collection(db, collectionName), ...queryConstraints))
    const documents: DocumentData[] = []
    let newLastDoc: QueryDocumentSnapshot | null = null
    
let index = 0
for (const doc of querySnapshot.docs) {
  if (index < pageSize) {
    documents.push({ id: doc.id, ...doc.data() })
    newLastDoc = doc
    index++
  } else {
    break
  }
}
    
    const hasMore = querySnapshot.docs.length > pageSize
    
    return {
      documents,
      lastDoc: newLastDoc,
      hasMore,
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to get paginated documents")
  }
}

// User-specific operations for Swagifyy
export const createUserProfile = async (
  userId: string,
  profileData: {
    email: string
    displayName?: string
    photoURL?: string
    companyName?: string
    role?: string
  }
): Promise<void> => {
  try {
    await createDocument("users", profileData, userId)
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user profile")
  }
}

export const getUserProfile = async (userId: string): Promise<DocumentData | null> => {
  try {
    return await getDocument("users", userId)
  } catch (error: any) {
    throw new Error(error.message || "Failed to get user profile")
  }
}

export const updateUserProfile = async (
  userId: string,
  updates: Partial<DocumentData>
): Promise<void> => {
  try {
    await updateDocument("users", userId, updates)
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user profile")
  }
}

// Company operations
export const createCompany = async (
  companyData: {
    name: string
    industry?: string
    size?: string
    website?: string
    description?: string
    ownerId: string
  }
): Promise<string> => {
  try {
    return await createDocument("companies", companyData)
  }
  catch (error: any) {
    throw new Error(error.message || "Failed to create company")
  }
}

export const getCompany = async (companyId: string): Promise<DocumentData | null> => {
  try {
    return await getDocument("companies", companyId)
  }
  catch (error: any) {
    throw new Error(error.message || "Failed to get company")
  }
}

export const getUserCompanies = async (userId: string): Promise<DocumentData[]> => {
  try {
    return await getDocuments("companies", [
      { field: "ownerId", operator: "==", value: userId }
    ])
  }
  catch (error: any) {
    throw new Error(error.message || "Failed to get user companies")
  }
}

// Array operations
export const addToArray = async (
  collectionName: string,
  docId: string,
  field: string,
  value: any
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      [field]: arrayUnion(value),
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    throw new Error(error.message || "Failed to add to array")
  }
}

export const removeFromArray = async (
  collectionName: string,
  docId: string,
  field: string,
  value: any
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      [field]: arrayRemove(value),
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    throw new Error(error.message || "Failed to remove from array")
  }
}

// Increment/Decrement operations
export const incrementField = async (
  collectionName: string,
  docId: string,
  field: string,
  value: number = 1
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      [field]: increment(value),
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    throw new Error(error.message || "Failed to increment field")
  }
}

export { db, serverTimestamp, Timestamp }
