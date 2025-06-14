"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CompanyRegistrationPage() {
  const [formData, setFormData] = useState({
    accountType: "business",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to user info page
    window.location.href = "/auth/user-info"
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="flex-1 bg-blue-600 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-sm">
          <h1 className="text-2xl font-bold mb-8">SWAGIFYY</h1>

          <div className="relative w-48 h-64 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-700 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-blue-500 rounded-2xl p-6 h-full flex flex-col items-center justify-center">
              <div className="w-24 h-32 bg-white rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute top-2 left-2 right-2 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 h-4 bg-black rounded"></div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Swag That Means Business</h2>
          <p className="text-blue-100 mb-6 text-sm">
            Swagifyy Made It Easy To Design Our Welcome Kits And Event Giveaways. The Real-Time 3D Preview Was A
            Game-Changer!
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Link href="/auth/signup" className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Step 1 Of 3</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600">English</span>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us More About Company</h2>
            <p className="text-gray-600 mb-8">
              Create An Account To Customize Branded Swag, Manage Bulk Orders, And Track Every Step — From Design To
              Doorstep.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Account Type</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={formData.accountType === "business"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Business</span>
                  </label>
                  <label className="flex-1 flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="accountType"
                      value="individual"
                      checked={formData.accountType === "individual"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Individual</span>
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Company Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  placeholder="For Example: hello@company-Domain"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="For Example: hello@company-Domain"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
              >
                Create Account
              </Button>
            </form>
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
    </div>
  )
}
