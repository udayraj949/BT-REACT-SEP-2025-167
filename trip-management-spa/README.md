# Trip Management System

A React.js Single Page Application (SPA) for managing trips with full CRUD functionality, search, filtering, pagination, and form validation.

## Features

- ✅ Display Trip List in table/card format
- ✅ Add New Trip with form validation
- ✅ Edit Trip Details
- ✅ Delete Trip functionality
- ✅ Search Trips by Destination
- ✅ Filter by Status (PLANNED, ONGOING, COMPLETED)
- ✅ Sort by Price / Start Date
- ✅ Client-side Pagination
- ✅ Form Validation using React Hook Form
- ✅ Responsive Design with Tailwind CSS
- ✅ Summary Dashboard Widget

## Tech Stack

- **Framework**: React 18+
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: useState + useEffect
- **Form Validation**: React Hook Form
- **Build Tool**: Vite

## Project Structure

\`\`\`
/src
    /components
        Navbar.jsx
        TripList.jsx
        TripForm.jsx
        SearchFilter.jsx
        Pagination.jsx
    /pages
        Dashboard.jsx
        AddTrip.jsx
        EditTrip.jsx
    /data
        trips.js (dummy data)
    App.jsx
    main.jsx
\`\`\`

## Installation & Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd trip-management-spa
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Dashboard
- View all trips in a responsive table/card layout
- Search trips by destination
- Filter trips by status (PLANNED, ONGOING, COMPLETED)
- Sort trips by price or start date
- Navigate through pages using pagination
- View summary statistics

### Add Trip
- Navigate to `/add` to create a new trip
- Fill in destination, dates, price, and status
- Form validation ensures data integrity

### Edit Trip
- Click edit button on any trip to modify details
- Navigate to `/edit/:id` with pre-filled form
- Save changes with validation

### Delete Trip
- Click delete button to remove a trip
- Confirmation dialog prevents accidental deletion

## Screenshots

[Add screenshots of your application here]

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created as part of a React assignment for Badkul Technology Pvt Ltd.
