# Xai — Intelligence Workspace Landing Page

An interactive, high-performance web application showcasing **Xai Systems**, an enterprise intelligence workspace designed for real-time signal analysis, automated reasoning loops, and decision automation.

---

## Project Overview & Technical Approach

### **Overview**
The application is built to deliver a premium, responsive visual experience with real-time interactive 3D graphics, physics-backed canvas animations, sticky stage scroll observers, and an inline workspace UI.

### **Technical Approach**
- **Strict Component-Based Architecture**: Avoids monolithic files by decomposing each page section into single-responsibility sub-components under `src/components/pages/home/`.
- **Modular Section Breakdown**:
  - `DashboardSection`: 12 sub-components handling workspace top bars, sidebars, KPI cards, SVG trend charts, confidence bars, table rows, signals, automations, and ⌘K search modals.
  - `InsightFlowSection`: 6 sub-components managing sticky scroll observation, stage pills, and dynamic SVG pipeline diagrams (`Ingest`, `Analyze`, `Generate`).
  - `BentoSection`: 7 sub-components isolating spotlight cursor-tracking cards and interactive SVG visuals (`Streams`, `Trace`, `Spark`, `Brief`, `Automate`).
  - `SignatureSection`: 3D engine canvas split into `CoreMesh` (icosahedron wireframe), `OrbitStreams` (particle rings), and `SignatureCanvas`.
  - `shared`: Modular navigation header and footer blocks.
- **Design System Tokens**: Custom OKLCH color palettes, custom scrollbars, and grid background utilities integrated seamlessly with Tailwind CSS v4 in `globals.css`.

---

## Technology Stack Used

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | **Next.js 15** (App Router, Turbopack), **React 18**, **TypeScript 5** |
| **3D & Canvas** | **Three.js**, **React Three Fiber** (`@react-three/fiber`), **HTML5 2D Canvas** |
| **Styling & Design System** | **Tailwind CSS v4** (`@tailwindcss/postcss`), **OKLCH Design Tokens**, **Ant Design** (`antd`) |
| **Animations & Interactions** | **Framer Motion 12**, **Lenis Smooth Scroll** |
| **State & Icons** | **Redux Toolkit**, **Lucide React**, **Google Fonts** (`Sora`, `Inter`, `JetBrains Mono`) |

---

## Instructions to Run the Project Locally

### **Prerequisites**
Ensure you have **Node.js 18.x or higher** and **npm** installed on your machine.

### **1. Install Dependencies**
Open your terminal in the project directory and run:
```bash
npm install
```

### **2. Start Development Server**
Run the development server with Next.js Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### **3. Production Build & Verification**
To test or deploy the optimized production build:
```bash
npm run build
```
To run the production server locally after building:
```bash
npm run start
```

---

## Key Animation & Interaction Decisions

### **Public Walkthrough Video Link**
> **Watch Video Walkthrough**: `[https://drive.google.com/file/d/1D5IzUvMJ3HBIbKY5edaAtqfyauqBG-0N/view?usp=sharing]`
