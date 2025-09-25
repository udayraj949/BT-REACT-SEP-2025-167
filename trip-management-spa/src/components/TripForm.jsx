"use client"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const TripForm = ({ trip, onSubmit, isEditing = false }) => {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: trip || {
      destination: "",
      startDate: "",
      endDate: "",
      price: "",
      status: "PLANNED",
    },
  })

  const watchStartDate = watch("startDate")

  const onFormSubmit = async (data) => {
    setSubmitError("")
    try {
      await onSubmit({
        ...data,
        price: Number.parseFloat(data.price),
        id: trip?.id || Date.now(),
      })
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Failed to save trip. Please try again.")
    }
  }

  const validateEndDate = (endDate) => {
    if (!watchStartDate || !endDate) return true
    const startDate = new Date(watchStartDate)
    const endDateObj = new Date(endDate)
    return endDateObj >= startDate || "End date must be after or equal to start date"
  }

  const validateStartDate = (startDate) => {
    if (!startDate) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(startDate)
    return selectedDate >= today || "Start date cannot be in the past"
  }

  const validatePrice = (price) => {
    const numPrice = Number.parseFloat(price)
    if (isNaN(numPrice)) return "Please enter a valid price"
    if (numPrice < 0) return "Price must be positive"
    if (numPrice > 100000) return "Price seems too high. Please check the amount"
    return true
  }

  const validateDestination = (destination) => {
    if (!destination) return "Destination is required"
    if (destination.length < 2) return "Destination must be at least 2 characters"
    if (destination.length > 100) return "Destination must be less than 100 characters"
    if (!/^[a-zA-Z\s,.-]+$/.test(destination))
      return "Destination can only contain letters, spaces, commas, periods, and hyphens"
    return true
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{isEditing ? "Edit Trip" : "Add New Trip"}</h2>
          <p className="text-gray-600 mt-2">
            {isEditing ? "Update your trip details below." : "Fill in the details for your new trip."}
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
              Destination *
            </label>
            <input
              id="destination"
              type="text"
              {...register("destination", {
                validate: validateDestination,
              })}
              className={`input-field ${errors.destination ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="e.g., Paris, France"
            />
            {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                  validate: validateStartDate,
                })}
                className={`input-field ${errors.startDate ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                id="endDate"
                type="date"
                {...register("endDate", {
                  required: "End date is required",
                  validate: validateEndDate,
                })}
                className={`input-field ${errors.endDate ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (USD) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", {
                  required: "Price is required",
                  validate: validatePrice,
                })}
                className={`input-field pl-7 ${errors.price ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              {...register("status", {
                required: "Status is required",
              })}
              className={`input-field ${errors.status ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="PLANNED">Planned</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            <p className="mt-1 text-sm text-gray-500">Choose the current status of your trip</p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 btn-primary flex items-center justify-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {isEditing ? "Update Trip" : "Create Trip"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
              className={`flex-1 btn-secondary ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TripForm
