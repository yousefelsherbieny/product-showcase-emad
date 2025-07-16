"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", ""])
  const [timeLeft, setTimeLeft] = useState(30)
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 2) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.join("").length === 3) {
      // Redirect to success page or dashboard
      window.location.href = "/"
    }
  }

  const handleResend = () => {
    setTimeLeft(30)
    setOtp(["", "", ""])
    inputRefs[0].current?.focus()
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
          <Link href="/auth/user-info" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Step 3 Of 3</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600">English</span>
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP Code</h1>
          <p className="text-gray-600 mb-8">
            Enter Code We Sent To Your Phone Number{" "}
            <Link href="/auth/user-info" className="text-blue-600 hover:underline">
              Name@Email.Com
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div className="flex justify-center gap-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-600 text-white"
                  maxLength={1}
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="mb-6">
              {timeLeft > 0 ? (
                <p className="text-gray-600">Resend Code After {timeLeft}s</p>
              ) : (
                <button type="button" onClick={handleResend} className="text-blue-600 hover:underline">
                  Resend Code
                </button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
              disabled={otp.join("").length !== 3}
            >
              Confirm
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
