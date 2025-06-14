"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to new password page
    window.location.href = "/auth/new-password"
  }

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
          <Link href="/auth/login" className="flex items-center text-gray-600 hover:text-gray-800">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Assistance</h1>
          <p className="text-gray-600 mb-8">
            Please Enter Email Address Or Mobile Number Associated With Your Account To Receive.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Email/Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Or Mobile Number"
                  className="w-full px-3 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
            >
              Continue
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
  )
}
