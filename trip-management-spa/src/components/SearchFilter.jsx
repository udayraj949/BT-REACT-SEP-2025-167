"use client"

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const statuses = ["ALL", "PLANNED", "ONGOING", "COMPLETED"]
  const sortOptions = [
    { value: "destination", label: "Destination" },
    { value: "startDate", label: "Start Date" },
    { value: "endDate", label: "End Date" },
    { value: "price", label: "Price" },
  ]

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("ALL")
    setSortBy("destination")
    setSortOrder("asc")
  }

  const hasActiveFilters =
    searchTerm !== "" || statusFilter !== "ALL" || sortBy !== "destination" || sortOrder !== "asc"

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Clear All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Destination
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "ALL" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
            Sort Order
          </label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setSortOrder("asc")}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                sortOrder === "asc" ? "bg-primary-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                sortOrder === "desc" ? "bg-primary-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")} className="ml-1 text-primary-600 hover:text-primary-800">
                  ×
                </button>
              </span>
            )}
            {statusFilter !== "ALL" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("ALL")} className="ml-1 text-primary-600 hover:text-primary-800">
                  ×
                </button>
              </span>
            )}
            {(sortBy !== "destination" || sortOrder !== "asc") && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label} ({sortOrder === "asc" ? "↑" : "↓"})
                <button
                  onClick={() => {
                    setSortBy("destination")
                    setSortOrder("asc")
                  }}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilter
