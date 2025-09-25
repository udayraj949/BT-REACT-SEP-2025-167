"use client"
import { useState } from "react"
import TripForm from "../components/TripForm"

const AddTrip = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTrip = async (tripData) => {
    setIsSubmitting(true)

    try {
      // Get existing trips from localStorage
      const existingTrips = JSON.parse(localStorage.getItem("trips") || "[]")

      // Create new trip with unique ID
      const newTrip = {
        ...tripData,
        id: Date.now(), // Simple ID generation for demo
      }

      // Add new trip to the beginning of the array
      const updatedTrips = [newTrip, ...existingTrips]

      // Save to localStorage
      localStorage.setItem("trips", JSON.stringify(updatedTrips))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Error adding trip:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-primary-600">
            Dashboard
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Add Trip</span>
        </nav>
      </div>

      {/* Form */}
      <TripForm onSubmit={handleAddTrip} isEditing={false} isSubmitting={isSubmitting} />
    </div>
  )
}

export default AddTrip
