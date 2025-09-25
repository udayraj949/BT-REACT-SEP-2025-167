"use client"
import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { initialTrips } from "../data/trips"
import TripList from "../components/TripList"
import SearchFilter from "../components/SearchFilter"
import Pagination from "../components/Pagination"
import SummaryWidget from "../components/SummaryWidget"

const Dashboard = () => {
  // State management
  const [trips, setTrips] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [sortBy, setSortBy] = useState("destination")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Load trips from localStorage or use initial data
  useEffect(() => {
    const savedTrips = localStorage.getItem("trips")
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips))
    } else {
      setTrips(initialTrips)
      localStorage.setItem("trips", JSON.stringify(initialTrips))
    }
  }, [])

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    if (trips.length > 0) {
      localStorage.setItem("trips", JSON.stringify(trips))
    }
  }, [trips])

  // Filter and sort trips
  const filteredAndSortedTrips = useMemo(() => {
    const filtered = trips.filter((trip) => {
      const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || trip.status === statusFilter
      return matchesSearch && matchesStatus
    })

    // Sort trips
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      // Handle different data types
      if (sortBy === "price") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      } else if (sortBy === "startDate" || sortBy === "endDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = aValue.toString().toLowerCase()
        bValue = bValue.toString().toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [trips, searchTerm, statusFilter, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTrips.length / itemsPerPage)
  const paginatedTrips = filteredAndSortedTrips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, sortBy, sortOrder])

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
  }

  // CRUD Operations
  const handleDeleteTrip = (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      const updatedTrips = trips.filter((trip) => trip.id !== tripId)
      setTrips(updatedTrips)

      // If current page becomes empty after deletion, go to previous page
      const newTotalPages = Math.ceil((filteredAndSortedTrips.length - 1) / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trip Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track all your trips</p>
        </div>
        <Link to="/add" className="btn-primary">
          <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Trip
        </Link>
      </div>

      {/* Summary Widget */}
      <SummaryWidget trips={trips} />

      {/* Search and Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600">
          {filteredAndSortedTrips.length === trips.length ? (
            <span>Showing all {trips.length} trips</span>
          ) : (
            <span>
              Showing {filteredAndSortedTrips.length} of {trips.length} trips
              {searchTerm && (
                <span className="ml-2">
                  matching "<span className="font-medium text-gray-900">{searchTerm}</span>"
                </span>
              )}
              {statusFilter !== "ALL" && (
                <span className="ml-2">
                  with status "<span className="font-medium text-gray-900">{statusFilter}</span>"
                </span>
              )}
            </span>
          )}
        </div>

        {filteredAndSortedTrips.length > 0 && (
          <div className="text-sm text-gray-500">
            Sorted by {sortBy} ({sortOrder === "asc" ? "ascending" : "descending"})
          </div>
        )}
      </div>

      {/* Trip List */}
      <TripList trips={paginatedTrips} onDeleteTrip={handleDeleteTrip} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedTrips.length}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  )
}

export default Dashboard
