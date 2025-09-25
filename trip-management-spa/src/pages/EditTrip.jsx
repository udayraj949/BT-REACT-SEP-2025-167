"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TripForm from "../components/TripForm"

const EditTrip = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load trip data from localStorage
    const loadTrip = () => {
      try {
        const trips = JSON.parse(localStorage.getItem("trips") || "[]")
        const foundTrip = trips.find((t) => t.id === Number.parseInt(id))

        if (foundTrip) {
          setTrip(foundTrip)
        } else {
          // Trip not found, redirect to dashboard
          navigate("/", { replace: true })
        }
      } catch (error) {
        console.error("Error loading trip:", error)
        navigate("/", { replace: true })
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [id, navigate])

  const handleUpdateTrip = async (tripData) => {
    setIsSubmitting(true)

    try {
      // Get existing trips from localStorage
      const existingTrips = JSON.parse(localStorage.getItem("trips") || "[]")

      // Update the specific trip
      const updatedTrips = existingTrips.map((t) =>
        t.id === Number.parseInt(id) ? { ...tripData, id: Number.parseInt(id) } : t,
      )

      // Save to localStorage
      localStorage.setItem("trips", JSON.stringify(updatedTrips))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Error updating trip:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Trip not found</h3>
        <p className="text-gray-500 mb-4">The trip you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    )
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
          <span className="text-gray-900">Edit Trip</span>
        </nav>
      </div>

      {/* Form */}
      <TripForm trip={trip} onSubmit={handleUpdateTrip} isEditing={true} isSubmitting={isSubmitting} />
    </div>
  )
}

export default EditTrip
