# 🌦️ Weather Forecast Web App
A modern weather forecast website built with Next.js 15 (App Router), TypeScript, and TailwindCSS.
It provides city search with geocoding, a current/hourly/daily forecast, and a clean responsive UI.

## Features
Search by city name using [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).

Use current location (via browser geolocation).

Current weather (temperature, humidity, wind, summary) using [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs/historical-forecast-api).

24h hourly forecast with precipitation probability.

7-day daily forecast with sunrise/sunset.

Responsive UI with loading skeletons & error handling.

Edge API routes for low-latency data fetching.

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/hokhoa05/weather-forecast.git
cd weather-forecast
pnpm install
```

### 2. Run dev server
```bash
pnpm dev
```

## Tech stack
Next.js 15 (App router, Edge API Routes), TypeScript, TailwindCSS, React.

## Deployment
https://weather-forecast-unoc.vercel.app/

## Weather Icons

The weather icons in this project are from this repository [basmilius/weather-icons](https://github.com/basmilius/weather-icons) of [basmilius](https://github.com/basmilius).

## Roadmap Project
https://roadmap.sh/projects/weather-api-wrapper-service
