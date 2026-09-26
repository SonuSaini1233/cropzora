import React, { useMemo, useState } from "react";
import {
  Landmark,
  Search,
  MapPin,
  ShieldCheck,
  BadgeIndianRupee,
  Droplets,
  Tractor,
  Leaf,
  Banknote,
  CheckCircle2,
  ArrowRight,
  FileText,
  Filter,
} from "lucide-react";

const schemes = [
  {
    name: "PM-KISAN Samman Nidhi",
    category: "Subsidy",
    state: "All India",
    amount: "₹6,000 / Year",
    color: "bg-green-100 text-green-700",
    icon: BadgeIndianRupee,
    description:
      "Income support for eligible farmer families through Direct Benefit Transfer.",
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "Insurance",
    state: "All India",
    amount: "Crop Insurance",
    color: "bg-blue-100 text-blue-700",
    icon: ShieldCheck,
    description:
      "Financial protection against crop losses caused by natural disasters and pests.",
  },
  {
    name: "Kisan Credit Card (KCC)",
    category: "Loan",
    state: "All India",
    amount: "Low Interest Loan",
    color: "bg-yellow-100 text-yellow-700",
    icon: Banknote,
    description:
      "Easy agricultural loan with subsidized interest rates for farmers.",
  },
  {
    name: "PM Krishi Sinchai Yojana",
    category: "Irrigation",
    state: "All India",
    amount: "Water Subsidy",
    color: "bg-cyan-100 text-cyan-700",
    icon: Droplets,
    description:
      "Support for efficient irrigation systems like drip and sprinkler irrigation.",
  },
  {
    name: "National Mission on Sustainable Agriculture",
    category: "Organic",
    state: "All India",
    amount: "Organic Farming Support",
    color: "bg-emerald-100 text-emerald-700",
    icon: Leaf,
    description:
      "Promotes climate-smart and organic farming practices across India.",
  },
  {
    name: "Agriculture Mechanization Scheme",
    category: "Equipment",
    state: "Rajasthan",
    amount: "Up to 50% Subsidy",
    color: "bg-orange-100 text-orange-700",
    icon: Tractor,
    description:
      "Subsidy on tractors, harvesters, seed drills and modern farm machinery.",
  },
  {
    name: "Mukhyamantri Krishak Sathi Yojana",
    category: "Subsidy",
    state: "Rajasthan",
    amount: "Financial Assistance",
    color: "bg-pink-100 text-pink-700",
    icon: BadgeIndianRupee,
    description:
      "Financial assistance for farmers affected by accidents during agricultural work.",
  },
];

const categories = [
  "All",
  "Subsidy",
  "Insurance",
  "Loan",
  "Irrigation",
  "Organic",
  "Equipment",
];

const states = [
  "All States",
  "All India",
  "Rajasthan",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Uttar Pradesh",
  "Gujarat",
];

export default function Schemes({ onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [state, setState] = useState("All States");

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch = scheme.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || scheme.category === category;

      const matchesState =
        state === "All States" ||
        scheme.state === state ||
        scheme.state === "All India";

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [search, category, state]);

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 p-8 text-white">
        <div className="absolute -top-20 -right-16 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Landmark size={30} />
              <p className="text-sm uppercase tracking-widest text-green-100">
                Government Support
              </p>
            </div>

            <h1 className="text-4xl font-extrabold">
              Government Schemes for Farmers
            </h1>

            <p className="mt-3 max-w-2xl text-green-50">
              Explore subsidies, crop insurance, irrigation support, organic
              farming, farm equipment schemes, and financial assistance for
              farmers across India.
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Back Dashboard
            </button>
          )}
        </div>
      </section>

      {/* Search + Filters */}

      <section className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 space-y-5">
        <div className="relative">
          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scheme (PM-Kisan, Fasal Bima, KCC...)"
            className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin size={16} />
              Select State
            </label>

            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              {states.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Filter size={16} />
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Popular Schemes */}

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Schemes
          </h2>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            {filteredSchemes.length} Schemes Found
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {filteredSchemes.map((scheme) => {
            const Icon = scheme.icon;

            return (
              <div
                key={scheme.name}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                      <Icon size={26} />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">{scheme.name}</h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {scheme.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${scheme.color}`}>
                    {scheme.category}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {scheme.state}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-green-50 p-4">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Benefit
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-green-700">
                    {scheme.amount}
                  </p>
                </div>

                <button className="mt-5 flex items-center gap-2 text-green-700 font-semibold hover:gap-3 transition">
                  View Details
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Eligibility */}

      <section className="rounded-3xl bg-white p-7 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Farmer Eligibility Checklist
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Indian farmer with agricultural land records.",
            "Aadhaar linked with bank account.",
            "Valid mobile number for OTP verification.",
            "State-specific farmer registration (if required).",
            "Crop details and land ownership records.",
            "Active bank account for DBT benefits.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
            >
              <CheckCircle2 className="text-green-600 mt-1" size={18} />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents */}

      <section className="rounded-3xl bg-white p-7 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-green-600" size={26} />
          <h2 className="text-2xl font-bold text-gray-900">
            Required Documents
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Aadhaar Card",
            "Bank Passbook",
            "Land Record / Khata",
            "Farmer Registration ID",
            "Mobile Number",
            "Passport Size Photo",
          ].map((doc) => (
            <div
              key={doc}
              className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center"
            >
              <FileText className="mx-auto text-green-600 mb-3" size={28} />
              <p className="font-semibold text-gray-700">{doc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Steps */}

      <section className="rounded-3xl bg-white p-7 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to Apply
        </h2>

        <div className="space-y-5">
          {[
            "Choose your scheme from the list.",
            "Check eligibility for your state.",
            "Keep Aadhaar, Bank and Land documents ready.",
            "Register through official agriculture portal or CSC center.",
            "Track application status after submission.",
          ].map((step, index) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                {index + 1}
              </div>

              <div className="rounded-xl bg-gray-50 p-4 flex-1">
                <p className="font-medium text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Integration */}

      <section className="rounded-3xl bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white">
        <h2 className="text-3xl font-bold">
          Coming Soon in FarmerDetect AI
        </h2>

        <p className="mt-3 max-w-2xl text-green-50">
          This page will automatically show schemes based on the farmer's state,
          crop, land size, age, and eligibility using Government APIs.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "State-wise Schemes",
            "AI Eligibility Checker",
            "Application Status Tracking",
            "Nearby CSC / Agriculture Office",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-2xl bg-white/10 p-4 backdrop-blur"
            >
              <CheckCircle2 className="mb-2" size={22} />
              <p className="font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}