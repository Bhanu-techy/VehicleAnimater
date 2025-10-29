## Title

***Vehicle Movement on a Map***

## 1. Objective

The primary goal of this assignment is to build a single-page, frontend-only web application that simulates a vehicle's journey along a predefined route.

The application must:

1. **Display a Map:** Integrate a modern interactive map using a React-compatible library.
2. **Show the Route:** Draw the entire route path on the map.
3. **Simulate Movement:** Display a vehicle marker that moves from point to point along the route in a simulated real-time manner.
4. **Provide Controls:** Allow the user to start and stop the simulation.
5. **Display Metadata:** Show the current location coordinates and other relevant data (like speed or elapsed time).

## 2. Technical Requirements
To successfully complete this project, the following stack will be used:

-----------------------------------------------------------------------------------------------------------------------------
|Category	        | Tool / Technology	 | Purpose                                                                          |
-----------------------------------------------------------------------------------------------------------------------------
|Frontend Framework | React.js	         | Building the user interface using components and state management.               |
-----------------------------------------------------------------------------------------------------------------------------
|Development Setup	| Node.js & Vite/CRA | Project scaffolding and managing dependencies.                                   |
-----------------------------------------------------------------------------------------------------------------------------
|Styling	        | Tailwind CSS	     | To quickly build a clean, usable, and responsive user interface.                 |
-----------------------------------------------------------------------------------------------------------------------------
|Mapping Library	| React-Leaflet	     | The dedicated React wrapper for the Leaflet library, simplifying map integration.|
-----------------------------------------------------------------------------------------------------------------------------
|Data Format	    | JSON             	 | To store the dummy route data (dummy-route.json).                                |
-----------------------------------------------------------------------------------------------------------------------------

## 3. Step-by-Step Instructions (Using React and React-Leaflet)
This guide assumes you are using npm or yarn and have initialized a standard React project (e.g., via Vite or Create React App).
Phase 1: Project Setup and Data Creation
Step 1.1: Initialize React Project and Install Dependencies
Create Project: Use a modern tool to create your React project (e.g., npm create vite@latest vehicle-tracker-app -- --template react-ts or npx create-react-app vehicle-tracker-app).
Install Map Dependencies: Install React-Leaflet, Leaflet itself, and Tailwind CSS.
npm install leaflet react-leaflet
npm install -D tailwindcss postcss autoprefixer # If using Tailwind

### Step 1.2: Create Dummy Location Data (`public/dummy-route.json`)

Place this file in the `public/` directory so it can be fetched easily in a development environment.

**Action:** Populate `dummy-route.json` with an array of objects.

**Example Code Snippet (public/dummy-route.json):**

[
  { "latitude": 17.385044, "longitude": 78.486671, "timestamp": "2024-07-20T10:00:00Z" },
  { "latitude": 17.385200, "longitude": 78.486800, "timestamp": "2024-07-20T10:00:10Z" },
  { "latitude": 17.385450, "longitude": 78.487100, "timestamp": "2024-07-20T10:00:20Z" },
  // ... continue with 15-20 more points
  { "latitude": 17.386000, "longitude": 78.488000, "timestamp": "2024-07-20T10:01:00Z" }
]

### Phase 2: React Component Setup and Data Fetching

### Step 2.1: Create the Main Map Component (`src/VehicleMap.jsx`)

Create a functional component (`VehicleMap`) to handle all map logic, markers, and state.

### Step 2.2: Fetch Route Data (Using `useEffect`)

Use the `useEffect` hook to fetch the data when the component mounts.

**Action:** Implement asynchronous data fetching within `useEffect`.

### Phase 3: Map Initialization and Rendering

### Step 3.1: Map and Full Route Rendering

Use React-Leaflet components (`MapContainer`, `TileLayer`, `Polyline`) to render the map and the full route.

**Action:** Structure the JSX to include the map elements and the full route polyline.

**Example Code Snippet (Map Setup and Full Route):**

### Phase 4: Simulated Movement and State Management

### Step 4.1: Implement Simulation State and Logic

Use `useState` for the vehicle's current position and `useRef` to hold the interval ID, ensuring simulation control outside of the render cycle.

**Action:** Set up state for movement index, play/pause status, and use `useEffect` to manage the `setInterval` loop.

### Step 4.2: Dynamic Route and Vehicle Marker

Update the marker and the dynamic polyline based on the `currentIndex` state.

**Action:** Use the `Marker` and `Polyline` components, slicing the `routeData` array to show only the traveled path.

### Phase 5: Interface and Features

### Step 5.1: Create UI Controls and Metadata Display

Implement a separate component (or inline JSX) for the control panel, using Tailwind CSS for responsiveness.

**Action:** Use the `currentPosition` state and button handlers to create the UI.

## 4. Project Structure (React):

This structure is typical for a modern React application.
vehicle-tracker-app/
├── node_modules/       (Dependencies)
├── public/
│   └── dummy-route.json (Static route data file)
├── src/
│   ├── components/     (Optional: for smaller components like Controls)
│   ├── App.jsx         (Main wrapper component)
│   └── VehicleMap.jsx  (The core map and simulation logic component)
├── package.json
└── tailwind.config.js

## 5. Example Codes (React/JSX and Utility Functions)

### A. The `calculateSpeed` Utility Function

This function should be placed outside of the `VehicleMap` component or in a separate utility file (`src/utils.js`).

## 6. Node.js Backend Integration (Optional Enhancement)

The original assignment is frontend-only, but using Node.js provides a robust way to serve the static data or potentially implement a real-time WebSocket connection for a more realistic simulation (e.g., using Socket.IO).

### A. Purpose of Node.js

Node.js would be used primarily as a **backend server** to:

1. Serve the React application (using Express).
2. Serve the `dummy-route.json` data via a dedicated API endpoint (`/api/route`).

B. Setup Steps
  Initialize Node Project:

    npm init -y
    npm install express


### C. Frontend Change for Data Fetching

If using the Node.js backend, the React fetch call would change to target the server endpoint.

### Submission Instructions
1. Deploy the frontend project using a platform such as:
○ Netlify
○ Vercel
○ GitHub Pages