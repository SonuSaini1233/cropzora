import React, { useState } from "react";
import {
  ArrowLeft,
  FlaskConical,
  TestTube,
  Sprout,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SoilHealth({ onBack }) {
  const [selectedPlot, setSelectedPlot] = useState("Plot A - Wheat Field");

  // Mock Soil Health Card Data
  const soilData = {
    testDate: "15 Sep 2026",
    labName: "Krishi Vigyan Kendra Lab",
    overallScore: 82,
    pH: 6.8,
    ec: "0.4 dS/m",
    organicCarbon: "0.62%",
    npk: {
      nitrogen: { val: 240, status: "Low", ideal: "280 - 560 kg/ha", percentage: 45 },
      phosphorus: { val: 22, status: "Optimal", ideal: "10 - 25 kg/ha", percentage: 80 },
      potassium: { val: 195, status: "Optimal", ideal: "110 - 280 kg/ha", percentage: 75 },
    },
    micronutrients: [
      { name: "Zinc (Zn)", status: "Deficient", level: "0.45 ppm" },
      { name: "Sulphur (S)", status: "Sufficient", level: "12.5 ppm" },
      { name: "Iron (Fe)", status: "Sufficient", level: "6.2 ppm" },
      { name: "Boron (B)", status: "Deficient", level: "0.3 ppm" },
    ],
  };

  // Fertilizer Recommendations
  const fertilizerRecommendations = [
    {
      id: 1,
      type: "Primary Deficiency",
      title: "Nitrogen Boost Required",
      dose: "Add Urea @ 45 kg/acre in 2 split doses",
      reason: "Soil Nitrogen is below optimal range (240 kg/ha).",
    },
    {
      id: 2,
      type: "Micronutrient",
      title: "Zinc Sulphate Application",
      dose: "Apply Zinc Sulphate (21%) @ 10 kg/acre",
      reason: "Zinc deficiency detected. Essential for healthy leaf growth.",
    },
    {
      id: 3,
      type: "Organic Matter",
      title: "Organic Carbon Improvement",
      dose: "Apply FYM (Farmyard Manure) @ 2 tons/acre",
      reason: "Boosts microbial activity and improves water retention.",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-green-600"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          )}
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Soil Health Card & Nutrient Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor soil fertility, NPK balance, and recommended fertilizer dosage.
          </p>
        </div>

        <div>
          <select
            value={selectedPlot}
            onChange={(e) => setSelectedPlot(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-green-500"
          >
            <option>Plot A - Wheat Field</option>
            <option>Plot B - Mustard Field</option>
            <option>Plot C - Vegetables</option>
          </select>
        </div>
      </div>

      {/* OVERVIEW HERO SECTION */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Score Card */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-700 via-orange-800 to-yellow-900 p-6 text-white shadow-xl lg:col-span-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-100">
              {soilData.labName}
            </span>
            <span className="text-xs text-amber-200">Tested: {soilData.testDate}</span>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-amber-200">Overall Soil Health Index</p>
            <div className="mt-2 text-6xl font-black">
              {soilData.overallScore}<span className="text-2xl font-normal text-amber-300">/100</span>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-wide text-emerald-300">
              Status: Moderately Fertile
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-xl bg-white/10 p-2">
              <p className="text-amber-200">pH Level</p>
              <p className="text-base font-bold text-white">{soilData.pH} (Good)</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2">
              <p className="text-amber-200">Organic Carbon</p>
              <p className="text-base font-bold text-white">{soilData.organicCarbon}</p>
            </div>
          </div>
        </div>

        {/* NPK Primary Nutrients Breakdown */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <FlaskConical size={20} className="text-amber-600" /> Primary Nutrients (NPK) Status
          </h3>

          <div className="mt-6 space-y-5">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-800">Nitrogen (N) - <span className="text-red-600 font-semibold">{soilData.npk.nitrogen.status}</span></span>
                <span className="text-gray-500">{soilData.npk.nitrogen.val} kg/ha (Ideal: {soilData.npk.nitrogen.ideal})</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-red-500" style={{ width: `${soilData.npk.nitrogen.percentage}%` }}></div>
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-800">Phosphorus (P) - <span className="text-green-600 font-semibold">{soilData.npk.phosphorus.status}</span></span>
                <span className="text-gray-500">{soilData.npk.phosphorus.val} kg/ha (Ideal: {soilData.npk.phosphorus.ideal})</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-green-500" style={{ width: `${soilData.npk.phosphorus.percentage}%` }}></div>
              </div>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-800">Potassium (K) - <span className="text-green-600 font-semibold">{soilData.npk.potassium.status}</span></span>
                <span className="text-gray-500">{soilData.npk.potassium.val} kg/ha (Ideal: {soilData.npk.potassium.ideal})</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${soilData.npk.potassium.percentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MICRONUTRIENTS GRID */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <TestTube size={20} className="text-amber-600" /> Secondary & Micronutrients
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {soilData.micronutrients.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-2xl border p-4 ${
                item.status === "Deficient" ? "border-amber-200 bg-amber-50/50" : "border-green-200 bg-green-50/50"
              }`}
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Value: {item.level}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  item.status === "Deficient"
                    ? "bg-amber-200 text-amber-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FERTILIZER PRESCRIPTION */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
          <Sprout size={20} className="text-green-600" /> Recommended Fertilizer Prescription
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {fertilizerRecommendations.map((rec) => (
            <div key={rec.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-green-300 hover:shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wide text-green-700 bg-green-100 px-2.5 py-1 rounded-md">
                {rec.type}
              </span>
              <h4 className="mt-3 font-bold text-gray-900">{rec.title}</h4>
              <p className="mt-1 text-xs font-semibold text-gray-800">{rec.dose}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{rec.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}