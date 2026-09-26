import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Star,
  RefreshCw,
  ShoppingCart,
  Wheat,
  Store,
  User,
  Plus,
  X,
  Phone,
  Package,
  IndianRupee,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// =========================
// DEMO MARKET DATA
// Backend/API baad me yahan connect hoga
// =========================

const marketData = [
  {
    id: 1,
    commodity: "Tomato",
    variety: "Local",
    state: "Rajasthan",
    district: "Jaipur",
    mandi: "Muhana Mandi",
    minPrice: 1800,
    modalPrice: 2200,
    maxPrice: 2500,
    unit: "Quintal",
    trend: "up",
    change: "+8.5%",
    distance: "8.2 km",
    date: "Today",
  },
  {
    id: 2,
    commodity: "Onion",
    variety: "Red",
    state: "Rajasthan",
    district: "Jaipur",
    mandi: "Muhana Mandi",
    minPrice: 2100,
    modalPrice: 2400,
    maxPrice: 2700,
    unit: "Quintal",
    trend: "up",
    change: "+5.2%",
    distance: "8.2 km",
    date: "Today",
  },
  {
    id: 3,
    commodity: "Potato",
    variety: "Local",
    state: "Rajasthan",
    district: "Jaipur",
    mandi: "Chomu Mandi",
    minPrice: 1400,
    modalPrice: 1750,
    maxPrice: 2000,
    unit: "Quintal",
    trend: "down",
    change: "-3.4%",
    distance: "25.4 km",
    date: "Today",
  },
  {
    id: 4,
    commodity: "Wheat",
    variety: "Lokwan",
    state: "Rajasthan",
    district: "Jaipur",
    mandi: "Kishangarh Mandi",
    minPrice: 2350,
    modalPrice: 2525,
    maxPrice: 2700,
    unit: "Quintal",
    trend: "up",
    change: "+2.8%",
    distance: "32.1 km",
    date: "Today",
  },
  {
    id: 5,
    commodity: "Mustard",
    variety: "Black",
    state: "Rajasthan",
    district: "Alwar",
    mandi: "Alwar Mandi",
    minPrice: 5200,
    modalPrice: 5500,
    maxPrice: 5800,
    unit: "Quintal",
    trend: "up",
    change: "+6.1%",
    distance: "145 km",
    date: "Today",
  },
  {
    id: 6,
    commodity: "Maize",
    variety: "Yellow",
    state: "Rajasthan",
    district: "Sikar",
    mandi: "Sikar Mandi",
    minPrice: 1900,
    modalPrice: 2150,
    maxPrice: 2300,
    unit: "Quintal",
    trend: "down",
    change: "-1.8%",
    distance: "112 km",
    date: "Today",
  },
  {
    id: 7,
    commodity: "Chilli",
    variety: "Green",
    state: "Rajasthan",
    district: "Jaipur",
    mandi: "Jaipur Mandi",
    minPrice: 3200,
    modalPrice: 3600,
    maxPrice: 4000,
    unit: "Quintal",
    trend: "up",
    change: "+9.2%",
    distance: "15.7 km",
    date: "Today",
  },
  {
    id: 8,
    commodity: "Cotton",
    variety: "Desi",
    state: "Rajasthan",
    district: "Hanumangarh",
    mandi: "Hanumangarh Mandi",
    minPrice: 6800,
    modalPrice: 7200,
    maxPrice: 7600,
    unit: "Quintal",
    trend: "up",
    change: "+4.6%",
    distance: "390 km",
    date: "Today",
  },
];

const initialListings = [
  {
    id: 1,
    farmerName: "Ramesh Kumar",
    crop: "Tomato",
    quantity: "25 Quintal",
    price: 2200,
    location: "Jaipur, Rajasthan",
    phone: "98XXXXXX21",
  },
  {
    id: 2,
    farmerName: "Mohan Singh",
    crop: "Wheat",
    quantity: "40 Quintal",
    price: 2500,
    location: "Sikar, Rajasthan",
    phone: "97XXXXXX45",
  },
  {
    id: 3,
    farmerName: "Rajesh Meena",
    crop: "Mustard",
    quantity: "18 Quintal",
    price: 5450,
    location: "Alwar, Rajasthan",
    phone: "96XXXXXX32",
  },
];

// =========================
// MARKET CARD
// =========================

function PriceCard({ item, favourite, onFavourite }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Wheat className="h-5 w-5 text-green-700" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">{item.commodity}</h3>
              <p className="text-xs text-slate-500">{item.variety}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onFavourite(item.id)}
          className="rounded-lg p-2 transition hover:bg-yellow-50"
          title="Add to favourites"
        >
          <Star
            className={`h-5 w-5 ${
              favourite
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300"
            }`}
          />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Store className="h-4 w-4" />
        <span>{item.mandi}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Min</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            ₹{item.minPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-3">
          <p className="text-xs text-green-600">Modal</p>
          <p className="mt-1 text-sm font-bold text-green-700">
            ₹{item.modalPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Max</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            ₹{item.maxPrice.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {item.distance}
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            item.trend === "up" ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.trend === "up" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {item.change}
        </div>
      </div>

      <p className="mt-3 text-right text-xs text-slate-400">
        Updated: {item.date}
      </p>
    </div>
  );
}

// =========================
// SELL CROP MODAL
// =========================

function SellCropModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    farmerName: "",
    crop: "",
    quantity: "",
    price: "",
    location: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.farmerName ||
      !form.crop ||
      !form.quantity ||
      !form.price ||
      !form.location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onAdd({
      ...form,
      id: Date.now(),
      phone: form.phone || "Not provided",
      price: Number(form.price),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Sell Your Crop
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create your crop listing
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Farmer Name *
            </label>
            <input
              name="farmerName"
              value={form.farmerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Crop *
              </label>
              <input
                name="crop"
                value={form.crop}
                onChange={handleChange}
                placeholder="e.g. Tomato"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Quantity *
              </label>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 20 Quintal"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Expected Price *
              </label>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Per Quintal"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Location *
            </label>

            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Village, District, State"
                className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none focus:border-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <CheckCircle2 className="h-5 w-5" />
            Publish Crop
          </button>
        </form>
      </div>
    </div>
  );
}

// =========================
// BUY CROP CARD
// =========================

function SellerCard({ listing }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
            <User className="h-5 w-5 text-green-700" />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">
              {listing.farmerName}
            </h3>

            <p className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          Available
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Crop</p>
          <p className="mt-1 font-bold text-slate-800">{listing.crop}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Quantity</p>
          <p className="mt-1 font-bold text-slate-800">
            {listing.quantity}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Expected Price</p>
          <p className="text-lg font-bold text-green-700">
            ₹{Number(listing.price).toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-500">
              / Quintal
            </span>
          </p>
        </div>

        <button
          onClick={() =>
            alert(
              `Contact ${listing.farmerName}\nPhone: ${listing.phone}`
            )
          }
          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Contact
        </button>
      </div>
    </div>
  );
}

// =========================
// MAIN MARKET PAGE
// =========================

export default function Market() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [mandiFilter, setMandiFilter] = useState("All Mandis");

  const [activeTab, setActiveTab] = useState("prices");

  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cropzora-favourite-mandis")) || [];
    } catch {
      return [];
    }
  });

  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem("cropzora-market-listings");

      return saved ? JSON.parse(saved) : initialListings;
    } catch {
      return initialListings;
    }
  });

  const [showSellModal, setShowSellModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // FILTER DATA
  // =========================

  const states = [
    "All States",
    ...new Set(marketData.map((item) => item.state)),
  ];

  const districts = [
    "All Districts",
    ...new Set(
      marketData
        .filter(
          (item) =>
            stateFilter === "All States" ||
            item.state === stateFilter
        )
        .map((item) => item.district)
    ),
  ];

  const mandis = [
    "All Mandis",
    ...new Set(
      marketData
        .filter(
          (item) =>
            (stateFilter === "All States" ||
              item.state === stateFilter) &&
            (districtFilter === "All Districts" ||
              item.district === districtFilter)
        )
        .map((item) => item.mandi)
    ),
  ];

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredMarket = useMemo(() => {
    return marketData.filter((item) => {
      const matchesSearch =
        item.commodity
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.mandi.toLowerCase().includes(search.toLowerCase());

      const matchesState =
        stateFilter === "All States" ||
        item.state === stateFilter;

      const matchesDistrict =
        districtFilter === "All Districts" ||
        item.district === districtFilter;

      const matchesMandi =
        mandiFilter === "All Mandis" ||
        item.mandi === mandiFilter;

      return (
        matchesSearch &&
        matchesState &&
        matchesDistrict &&
        matchesMandi
      );
    });
  }, [search, stateFilter, districtFilter, mandiFilter]);

  // =========================
  // FAVOURITE
  // =========================

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem(
        "cropzora-favourite-mandis",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // =========================
  // ADD LISTING
  // =========================

  const addListing = (newListing) => {
    setListings((prev) => {
      const updated = [newListing, ...prev];

      localStorage.setItem(
        "cropzora-market-listings",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // =========================
  // REFRESH DEMO
  // =========================

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  // =========================
  // RESET FILTERS
  // =========================

  const resetFilters = () => {
    setSearch("");
    setStateFilter("All States");
    setDistrictFilter("All Districts");
    setMandiFilter("All Mandis");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-700" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Market Prices
                  </h1>

                  <p className="text-sm text-slate-500">
                    Check mandi prices and connect with farmers
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              Refresh Prices
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* ================= TABS ================= */}

        <div className="flex overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("prices")}
            className={`flex min-w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "prices"
                ? "bg-green-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Market Prices
          </button>

          <button
            onClick={() => setActiveTab("buy")}
            className={`flex min-w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "buy"
                ? "bg-green-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Crops
          </button>

          <button
            onClick={() => setShowSellModal(true)}
            className="ml-auto flex min-w-fit items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Sell Your Crop
          </button>
        </div>

        {/* ================= MARKET PRICE TAB ================= */}

        {activeTab === "prices" && (
          <>
            {/* SEARCH + FILTER */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-800">
                    Find Market Prices
                  </h2>

                  <p className="text-sm text-slate-500">
                    Search crop or mandi
                  </p>
                </div>

                <div className="hidden rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 sm:block">
                  Demo Market Data
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-4">
                {/* Search */}

                <div className="relative lg:col-span-1">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search crop or mandi..."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500"
                  />
                </div>

                {/* State */}

                <select
                  value={stateFilter}
                  onChange={(e) => {
                    setStateFilter(e.target.value);
                    setDistrictFilter("All Districts");
                    setMandiFilter("All Mandis");
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                >
                  {states.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>

                {/* District */}

                <select
                  value={districtFilter}
                  onChange={(e) => {
                    setDistrictFilter(e.target.value);
                    setMandiFilter("All Mandis");
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                >
                  {districts.map((district) => (
                    <option key={district}>{district}</option>
                  ))}
                </select>

                {/* Mandi */}

                <select
                  value={mandiFilter}
                  onChange={(e) => setMandiFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                >
                  {mandis.map((mandi) => (
                    <option key={mandi}>{mandi}</option>
                  ))}
                </select>
              </div>

              {(search ||
                stateFilter !== "All States" ||
                districtFilter !== "All Districts" ||
                mandiFilter !== "All Mandis") && (
                <button
                  onClick={resetFilters}
                  className="mt-3 text-sm font-medium text-green-600 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* ================= SUMMARY ================= */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-green-600 p-5 text-white shadow-sm">
                <p className="text-sm text-green-100">
                  Markets Found
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {filteredMarket.length}
                </p>

                <p className="mt-1 text-xs text-green-100">
                  Based on current filters
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Commodities
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {new Set(
                    filteredMarket.map((item) => item.commodity)
                  ).size}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Available crops
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Price Updates
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  Today
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Latest demo update
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Favourites
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-500">
                  {favourites.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Saved markets
                </p>
              </div>
            </div>

            {/* ================= PRICE CARDS ================= */}

            {filteredMarket.length > 0 ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Current Market Prices
                    </h2>

                    <p className="text-sm text-slate-500">
                      Compare prices before selling your crop
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredMarket.map((item) => (
                    <PriceCard
                      key={item.id}
                      item={item}
                      favourite={favourites.includes(item.id)}
                      onFavourite={toggleFavourite}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <Wheat className="mx-auto h-12 w-12 text-slate-300" />

                <h3 className="mt-4 font-bold text-slate-700">
                  No market found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another crop, district or mandi.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= BUY CROPS ================= */}

        {activeTab === "buy" && (
          <>
            <div className="rounded-2xl bg-gradient-to-r from-green-700 to-green-600 p-6 text-white">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />

                    <span className="font-semibold">
                      Crop Marketplace
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold">
                    Find crops directly from farmers
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-green-100">
                    Browse available crops and connect with sellers
                    directly.
                  </p>
                </div>

                <button
                  onClick={() => setShowSellModal(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
                >
                  <Plus className="h-5 w-5" />
                  List Your Crop
                </button>
              </div>
            </div>

            {/* Buy Search */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search available crop..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {listings
                .filter((item) =>
                  item.crop
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((listing) => (
                  <SellerCard
                    key={listing.id}
                    listing={listing}
                  />
                ))}
            </div>

            {listings.filter((item) =>
              item.crop.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <div className="rounded-2xl bg-white p-12 text-center">
                <Package className="mx-auto h-12 w-12 text-slate-300" />

                <h3 className="mt-3 font-bold text-slate-700">
                  No crops available
                </h3>

                <p className="text-sm text-slate-500">
                  Try another crop name.
                </p>
              </div>
            )}
          </>
        )}

        {/* ================= INFORMATION ================= */}

        <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-700" />
            </div>

            <div>
              <h3 className="font-bold text-green-900">
                About Market Prices
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-800">
                Prices shown here are currently demo data for the
                CropZora frontend. Government mandi/API integration
                will be connected through the backend later.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= SELL MODAL ================= */}

      {showSellModal && (
        <SellCropModal
          onClose={() => setShowSellModal(false)}
          onAdd={addListing}
        />
      )}
    </div>
  );
}