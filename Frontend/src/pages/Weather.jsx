import React, { useState } from "react";
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Compass,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sprout,
  ArrowLeft,
  Calendar,
  Info,
  Zap,
} from "lucide-react";

export default function Weather({ onBack }) {
  const [selectedDay, setSelectedDay] = useState(0);

  // Mock Real-Time Weather Data
  const currentWeather = {
    location: "Jaipur, Rajasthan",
    temp: 32,
    condition: "Partly Cloudy",
    humidity: 58,
    windSpeed: 14,
    windDir: "NW",
    uvIndex: "7 (High)",
    visibility: "8 km",
    pressure: "1008 hPa",
    soilTemp: "26°C",
    soilMoisture: "42%",
  };

  // 5-Day Forecast Data
  const forecast = [
    {
      day: "Today",
      date: "Sep 26",
      tempMax: 32,
      tempMin: 22,
      condition: "Partly Cloudy",
      rainChance: 20,
      icon: CloudSun,
    },
    {
      day: "Sun",
      date: "Sep 27",
      tempMax: 30,
      tempMin: 21,
      condition: "Moderate Rain",
      rainChance: 75,
      icon: CloudRain,
    },
    {
      day: "Mon",
      date: "Sep 28",
      tempMax: 29,
      tempMin: 20,
      condition: "Heavy Rain",
      rainChance: 85,
      icon: CloudRain,
    },
    {
      day: "Tue",
      date: "Sep 29",
      tempMax: 31,
      tempMin: 22,
      condition: "Sunny",
      rainChance: 10,
      icon: Sun,
    },
    {
      day: "Wed",
      date: "Sep 30",
      tempMax: 33,
      tempMin: 23,
      condition: "Clear",
      rainChance: 5,
      icon: Sun,
    },
  ];

  // Agricultural Advisories
  const advisories = [
    {
      id: 1,
      title: "Irrigation Management",
      type: "warning",
      desc: "Moderate to heavy rainfall expected over the next 48 hours. Postpone scheduled field irrigation to avoid soil waterlogging.",
    },
    {
      id: 2,
      title: "Pesticide & Fertilizer Spraying",
      type: "danger",
      desc: "Unfavorable spraying conditions due to predicted rain and wind speed (14 km/h). Spraying now risks chemical wash-off.",
    },
    {
      id: 3,
      title: "Harvesting & Storage",
      type: "info",
      desc: "Complete harvesting of ripe crops within the next 24 hours and transport harvested yield to moisture-proof storage facilities.",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-green-600"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Weather & Agricultural Advisory
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time weather parameters and crop-specific farming insights.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50/80 px-4 py-2 text-xs font-bold text-green-700 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600"></span>
          </span>
          Live Sync: {currentWeather.location}
        </div>
      </div>

      {/* CURRENT WEATHER HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 p-6 text-white shadow-xl sm:p-8">
        <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Main Temp Box */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-green-100">
              <Compass size={18} />
              <span className="text-sm font-semibold tracking-wide">
                {currentWeather.location}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <CloudSun size={72} className="text-amber-300 drop-shadow-md" />
              <div>
                <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
                  {currentWeather.temp}°C
                </h2>
                <p className="mt-1 text-lg font-medium text-green-100">
                  {currentWeather.condition}
                </p>
              </div>
            </div>
          </div>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-6">
            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Droplets size={16} />
                <span className="text-xs font-semibold">Humidity</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.humidity}%
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Wind size={16} />
                <span className="text-xs font-semibold">Wind</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.windSpeed} km/h
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Thermometer size={16} />
                <span className="text-xs font-semibold">Soil Temp</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.soilTemp}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Sprout size={16} />
                <span className="text-xs font-semibold">Soil Moisture</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.soilMoisture}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Zap size={16} />
                <span className="text-xs font-semibold">UV Index</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.uvIndex}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-green-200">
                <Eye size={16} />
                <span className="text-xs font-semibold">Visibility</span>
              </div>
              <p className="mt-1 text-lg font-bold">
                {currentWeather.visibility}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FARMING CONDITIONS SUITABILITY MATRIX */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <Info size={20} className="text-green-600" /> Suitable Farming
          Activities Today
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
            <XCircle size={28} className="shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-bold text-gray-900">
                Pesticide Spraying
              </p>
              <p className="text-xs text-red-700">Not Recommended (Rain Risk)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle size={28} className="shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-bold text-gray-900">Irrigation</p>
              <p className="text-xs text-amber-700">
                Hold (Rain expected soon)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
            <CheckCircle2 size={28} className="shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-bold text-gray-900">Sowing / Tillage</p>
              <p className="text-xs text-green-700">Optimal Soil Moisture</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-DAY WEATHER FORECAST */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Calendar size={20} className="text-green-600" /> 5-Day Agriculture
            Forecast
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {forecast.map((item, idx) => {
            const IconComponent = item.icon;
            const isSelected = selectedDay === idx;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(idx)}
                className={`flex flex-col items-center rounded-2xl border p-4 text-center transition-all ${
                  isSelected
                    ? "border-green-600 bg-green-50/80 shadow-md ring-2 ring-green-600/20"
                    : "border-gray-200 bg-white hover:border-green-300 hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-bold text-gray-800">{item.day}</p>
                <p className="text-xs text-gray-400">{item.date}</p>

                <IconComponent
                  size={32}
                  className={`my-3 ${
                    item.rainChance > 50 ? "text-blue-500" : "text-amber-500"
                  }`}
                />

                <p className="text-sm font-extrabold text-gray-900">
                  {item.tempMax}° / {item.tempMin}°
                </p>

                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                  <Droplets size={12} /> {item.rainChance}% Rain
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* REAL-TIME FARMER ADVISORIES */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
          <AlertTriangle size={20} className="text-amber-500" /> Actionable
          Farmer Advisories
        </h3>

        <div className="space-y-4">
          {advisories.map((adv) => (
            <div
              key={adv.id}
              className={`rounded-2xl border p-4 transition ${
                adv.type === "danger"
                  ? "border-red-200 bg-red-50/50"
                  : adv.type === "warning"
                  ? "border-amber-200 bg-amber-50/50"
                  : "border-blue-200 bg-blue-50/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className={`mt-0.5 shrink-0 ${
                    adv.type === "danger"
                      ? "text-red-600"
                      : adv.type === "warning"
                      ? "text-amber-600"
                      : "text-blue-600"
                  }`}
                />
                <div>
                  <h4 className="font-bold text-gray-900">{adv.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {adv.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}