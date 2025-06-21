// lib/firebase/analytics.ts
import {
  logEvent,
  setUserProperties,
  setUserId,
  Analytics,
} from "firebase/analytics"
import { analytics } from "./config"

// Custom event types for better type safety
export interface CustomEventParams {
  [key: string]: string | number | boolean
}

// Log Custom Event
export const logCustomEvent = (
  eventName: string,
  parameters?: CustomEventParams
): void => {
  if (analytics) {
    logEvent(analytics, eventName, parameters)
  }
}

// Common Analytics Events
export const logPageView = (pageName: string, pageTitle?: string): void => {
  if (analytics) {
    logEvent(analytics, "page_view", {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    })
  }
}

export const logSignUp = (method: string): void => {
  if (analytics) {
    logEvent(analytics, "sign_up", {
      method,
    })
  }
}

export const logLogin = (method: string): void => {
  if (analytics) {
    logEvent(analytics, "login", {
      method,
    })
  }
}

export const logSearch = (searchTerm: string): void => {
  if (analytics) {
    logEvent(analytics, "search", {
      search_term: searchTerm,
    })
  }
}

export const logShare = (contentType: string, itemId?: string): void => {
  if (analytics) {
    logEvent(analytics, "share", {
      content_type: contentType,
      item_id: itemId || "",
    })
  }
}

export const logPurchase = (
  transactionId: string,
  value: number,
  currency: string = "USD",
  items?: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
): void => {
  if (analytics) {
    logEvent(analytics, "purchase", {
      transaction_id: transactionId,
      value,
      currency,
      items,
    })
  }
}

export const logAddToCart = (
  currency: string,
  value: number,
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
): void => {
  if (analytics) {
    logEvent(analytics, "add_to_cart", {
      currency,
      value,
      items,
    })
  }
}

export const logBeginCheckout = (
  currency: string,
  value: number,
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
): void => {
  if (analytics) {
    logEvent(analytics, "begin_checkout", {
      currency,
      value,
      items,
    })
  }
}

// User-specific events for Swagifyy
export const logCompanyDetailsSubmitted = (): void => {
  logCustomEvent("company_details_submitted")
}

export const logPersonalAssistantUsed = (feature: string): void => {
  logCustomEvent("personal_assistant_used", {
    feature,
  })
}

export const logGiftCodeRedeemed = (codeType: string): void => {
  logCustomEvent("gift_code_redeemed", {
    code_type: codeType,
  })
}

export const logOTPVerified = (method: string): void => {
  logCustomEvent("otp_verified", {
    verification_method: method,
  })
}

export const logPasswordReset = (): void => {
  logCustomEvent("password_reset_requested")
}

// Error tracking
export const logError = (error: string, context?: string): void => {
  logCustomEvent("error_occurred", {
    error_message: error,
    error_context: context || "unknown",
  })
}

// Performance tracking
export const logPerformance = (
  metric: string,
  value: number,
  unit: string = "ms"
): void => {
  logCustomEvent("performance_metric", {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
  })
}

export { analytics }
