# 🍽️ Restaurant Explorer

A modern, responsive web application to explore restaurants, filter by availability and categories, view detailed restaurant information with interactive maps, and browse product offerings. Built as a demo and portfolio project with mock data generation using Faker.js and Mock Service Worker (MSW).

## ✨ Features

- **Restaurant Discovery**: Browse a collection of restaurants with detailed information
- **Smart Filtering**: Filter restaurants by:
  - Open/Closed status
  - Food category (Italian, Japanese, etc.)
  - Price range (Budget-friendly to Premium)
- **Restaurant Detail Page**: 
  - Restaurant information and ratings
  - Interactive map powered by Leaflet
  - Browse product offerings with images and ratings
  - Randomized operating hours for each restaurant
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Mock Data**: Uses Faker.js with seeded randomization for consistent demo data
- **Service Worker**: MSW handles all API requests in production builds

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| React | ^19.2.4 |
| TypeScript | ~6.0.2 |
| Vite | ^8.0.4 |
| React Router | ^7.14.1 |
| Leaflet | ^1.9.4 |
| Mock Service Worker | ^2.13.4 |
| Faker.js | ^10.4.0 |

## 📋 Prerequisites

- **Node.js**: v24.14.1 or higher
- **npm**: v11.11.0 or higher

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd restaurant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`

### 4. Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder with MSW enabled for mock data.

### 5. Preview Production Build
```bash
npm run preview
```
Test the production build locally at `http://localhost:4173/`

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeaderHomePage.tsx
│   ├── RestaurantCard.tsx
│   ├── RestaurantMap.tsx
│   └── ProductCard.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   └── RestaurantDetailPage.tsx
├── services/           # API service functions
│   └── restaurant.ts
├── mocks/              # Mock data and MSW setup
│   ├── browser.ts      # MSW worker configuration
│   ├── handlers.ts     # API request handlers
│   └── generator.ts    # Faker.js data generation
├── types/              # TypeScript interfaces
│   └── restaurant.ts
├── utils/              # Utility functions
│   └── price.ts
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point with MSW initialization
└── index.css           # Global styles

public/
├── mockServiceWorker.js # MSW service worker file

dist/                   # Production build output
```

## 📜 Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production with MSW enabled |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🎯 How It Works

1. **Mock Data Generation**: On app startup, Faker.js with seed(48) generates consistent restaurant and product data
2. **Service Worker**: Mock Service Worker intercepts all `/api/*` requests and serves mock data
3. **Routing**: React Router handles client-side navigation between home and detail pages
4. **Production Ready**: MSW is configured to work in both development and production builds, making this perfect for demos and portfolios

## 📝 Notes

- All API requests are intercepted by Mock Service Worker (MSW)
- Restaurant data includes randomized operating hours for realistic variation
- Product images and details are generated using Faker.js
- The app is fully functional without a backend server
- Responsive breakpoints: 1024px (tablet landscape), 768px (tablet portrait), 480px (mobile)
