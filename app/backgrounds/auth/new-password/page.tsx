"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic
    window.location.href = "/auth/login"
  }

  // Password validation
  const hasMinLength = formData.newPassword.length >= 8
  const hasCapitalLetter = /[A-Z]/.test(formData.newPassword)
  const hasNumber = /\d/.test(formData.newPassword)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome Kits, Corporate Gifts, Event Swag — All Customized For Your Brand.</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md p-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/auth/forgot-password" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-600">English</span>
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h1>
          <p className="text-gray-600 mb-8">Just Create A New Password To Get Back Into Your Swagifyy Account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
            >
              Change Password
            </Button>
          </form>

          {/* Password Requirements */}
          <div className="mt-6 text-left">
            <p className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {hasMinLength ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className={`text-sm ${hasMinLength ? "text-green-600" : "text-gray-600"}`}>
                  Minimum 8 Characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasCapitalLetter ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${hasCapitalLetter ? "text-green-600" : "text-gray-600"}`}>
                  At Least One Capital Letter
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasNumber ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className={`text-sm ${hasNumber ? "text-green-600" : "text-gray-600"}`}>At Least One Number</span>
              </div>
              <div className="flex items-center gap-2">
                {hasSpecialChar ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className={`text-sm ${hasSpecialChar ? "text-green-600" : "text-gray-600"}`}>
                  At Least One Special Character (# $ % & !)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          By Clicking "Continue With Email Or Phone Number," You Will Read Your Account Password. Having Trouble?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Us
          </Link>{" "}
          — We'd Be Happy To Help.
        </div>
      </div>
    </div>
  )
}
