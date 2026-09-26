<<<<<<< HEAD
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import FarmCard from "../components/farm/FarmCard";
import FarmMap from "../components/farm/FarmMap";
import FarmStats from "../components/farm/FarmStats";
import FieldCard from "../components/farm/FieldCard";
import CropCard from "../components/farm/CropCard";
import CropTimeline from "../components/farm/CropTimeline";
import AddCropModal from "../components/farm/AddCropModal";
import "../pages_styles/MyFarm.css";

const farm = {
  name: "Green Valley Farm",
  location: "Sanganer, Jaipur · Rajasthan",
  owner: "Yuvi Singh",
  type: "Mixed crops",
  updated: "Today, 08:40",
  image:
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=90",
};

const initialFields = [
  {
    id: "Field 01",
    crop: "Tomato",
    area: "2.4",
    type: "Vegetable",
    stage: "Flowering",
    moisture: 68,
    health: 96,
    nextAction: "Irrigation due",
    days: 2,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "Field 02",
    crop: "Wheat",
    area: "2.0",
    type: "Grain",
    stage: "Tillering",
    moisture: 61,
    health: 93,
    nextAction: "Scout crop",
    days: 1,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "Field 03",
    crop: "Onion",
    area: "0.5",
    type: "Vegetable",
    stage: "Bulbing",
    moisture: 57,
    health: 89,
    nextAction: "Nutrition check",
    days: 3,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=85",
  },
];

=======
import React, { useState } from "react";
import {
  Sprout,
  MapPin,
  Plus,
  Droplets,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Ruler,
  Tractor,
} from "lucide-react";

>>>>>>> ca10812 (Add new frontend features and update UI)
const initialCrops = [
  {
    id: 1,
    name: "Tomato",
<<<<<<< HEAD
    category: "Vegetable",
    area: "2.4",
    sowing: "18 Jul 2026",
    stage: "Flowering",
    health: 96,
    healthTone: "good",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=85",
=======
    variety: "Hybrid Tomato",
    area: "2.4 acres",
    status: "Growing",
    harvest: "15 Nov 2026",
    progress: 62,
    health: "Good",
    icon: "🍅",
>>>>>>> ca10812 (Add new frontend features and update UI)
  },
  {
    id: 2,
    name: "Wheat",
<<<<<<< HEAD
    category: "Grain",
    area: "2.0",
    sowing: "28 Jun 2026",
    stage: "Tillering",
    health: 93,
    healthTone: "good",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
=======
    variety: "HD-2967",
    area: "2.0 acres",
    status: "Planned",
    harvest: "15 Mar 2027",
    progress: 15,
    health: "Healthy",
    icon: "🌾",
>>>>>>> ca10812 (Add new frontend features and update UI)
  },
  {
    id: 3,
    name: "Onion",
<<<<<<< HEAD
    category: "Vegetable",
    area: "0.5",
    sowing: "04 Aug 2026",
    stage: "Bulbing",
    health: 89,
    healthTone: "watch",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=85",
  },
];

const timeline = [
  { id: 1, type: "irrigation", title: "Irrigation completed", description: "Field 01 · Tomato block", time: "Today, 08:10" },
  { id: 2, type: "completed", title: "Crop scouting completed", description: "Field 02 · No major stress detected", time: "Yesterday" },
  { id: 3, type: "fertilizer", title: "Fertilizer reminder", description: "Field 03 · Nutrition check in 3 days", time: "24 Sep" },
  { id: 4, type: "sowing", title: "Crop record updated", description: "Onion planting details saved", time: "22 Sep" },
];

export default function MyFarm() {
  const [fields] = useState(initialFields);
  const [crops, setCrops] = useState(initialCrops);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = useMemo(() => ({
    area: "4.9",
    fields: String(fields.length),
    crops: String(crops.length + 2),
    health: "94",
  }), [fields.length, crops.length]);

  const handleAddCrop = (form) => {
    const selected = fields.find((field) => field.id === form.field) || fields[0];

    setCrops((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name.trim(),
        category: "Crop",
        area: form.area,
        sowing: form.sowing ? new Date(`${form.sowing}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Not set",
        stage: selected?.stage || "Growing",
        health: 92,
        healthTone: "good",
        image: selected?.image || farm.image,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div className="my-farm-page">
      <div className="page-heading-row">
        <div>
          <div className="page-kicker"><Sparkles size={13} /> FARM MANAGEMENT</div>
          <h1>My Farm</h1>
          <p>Everything about your fields, crops and farm activity in one place.</p>
        </div>

        <div className="page-heading-actions">
          <span className="secure-badge"><ShieldCheck size={14} /> Farm data protected</span>
          <button className="primary-button page-add" type="button" onClick={() => setModalOpen(true)}>
            <Plus size={17} /> Add crop
          </button>
        </div>
      </div>

      <FarmCard farm={farm} />
      <FarmStats stats={stats} />

      <section className="farm-main-grid">
        <div className="farm-fields-column">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">YOUR FIELDS</span>
              <h2>Field health</h2>
            </div>
            <button type="button" className="text-button">
              Manage fields <ChevronRight size={14} />
            </button>
          </div>

          <div className="fields-grid">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} onOpen={() => {}} />
            ))}
          </div>

          <div className="crops-section">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">ACTIVE CROPS</span>
                <h2>Growing now</h2>
              </div>
              <button type="button" className="text-button" onClick={() => setModalOpen(true)}>
                Add another <Plus size={14} />
              </button>
            </div>

            <div className="crop-list">
              {crops.slice(0, 5).map((crop) => (
                <CropCard key={crop.id} crop={crop} onOpen={() => {}} />
              ))}
            </div>
          </div>
        </div>

        <aside className="farm-side-column">
          <FarmMap fields={fields} />

          <article className="farm-insight-card">
            <div className="insight-top">
              <span className="insight-icon"><Sparkles size={16} /></span>
              <span className="section-eyebrow">CROPZORA INSIGHT</span>
            </div>
            <h3>Your farm is in a stable growth window.</h3>
            <p>Soil moisture is healthy across your main fields. Prioritize the next irrigation for Tomato and keep scouting Wheat.</p>
            <button type="button" className="insight-link">Open recommendations <ArrowUpRight size={14} /></button>
          </article>

          <article className="next-action-card">
            <div className="next-action-icon"><CalendarClock size={18} /></div>
            <div>
              <span>Next farm action</span>
              <strong>Check Field 01 irrigation</strong>
              <small>Due in 2 days · 2.4 acre tomato block</small>
            </div>
          </article>

          <CropTimeline items={timeline} />
        </aside>
      </section>

      <footer className="farm-footer">
        <span>CropZora Farm Workspace</span>
        <span>{fields.length} fields · {crops.length} visible crop records · Updated today</span>
      </footer>

      <AddCropModal
        open={modalOpen}
        fields={fields}
        onClose={() => setModalOpen(false)}
        onSave={handleAddCrop}
      />
    </div>
  );
}
=======
    variety: "Red Onion",
    area: "0.5 acres",
    status: "Growing",
    harvest: "20 Dec 2026",
    progress: 48,
    health: "Good",
    icon: "🧅",
  },
];

const fields = [
  {
    id: 1,
    name: "Field 01",
    area: "2.4 acres",
    crop: "Tomato",
    status: "Active",
    moisture: "62%",
  },
  {
    id: 2,
    name: "Field 02",
    area: "2.0 acres",
    crop: "Wheat",
    status: "Prepared",
    moisture: "48%",
  },
  {
    id: 3,
    name: "Field 03",
    area: "0.5 acres",
    crop: "Onion",
    status: "Active",
    moisture: "57%",
  },
];

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

function CropCard({ crop }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-green-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {crop.icon}
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              {crop.name}
            </h3>

            <p className="text-xs text-gray-500">
              {crop.variety}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {crop.health}
        </span>
      </div>

      <div className="mt-5 flex justify-between text-sm">
        <span className="text-gray-500">Area</span>

        <span className="font-semibold text-gray-900">
          {crop.area}
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-gray-500">
            Growth Progress
          </span>

          <span className="font-semibold text-green-700">
            {crop.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600"
            style={{ width: `${crop.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock3 size={13} />
          {crop.status}
        </span>

        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays size={13} />
          {crop.harvest}
        </span>
      </div>
    </div>
  );
}

function FieldCard({ field }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-green-300 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <Tractor size={20} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {field.status}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-gray-900">
        {field.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {field.crop}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Area</p>
          <p className="mt-1 font-bold">{field.area}</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Moisture</p>
          <p className="mt-1 font-bold text-blue-600">
            {field.moisture}
          </p>
        </div>
      </div>
    </div>
  );
}

function Activity({ icon, title, time }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">
          {title}
        </p>

        <p className="text-xs text-gray-400">
          {time}
        </p>
      </div>
    </div>
  );
}

export default function MyFarm({ onNavigate }) {
  const [crops, setCrops] = useState(initialCrops);
  const [showModal, setShowModal] = useState(false);

  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [area, setArea] = useState("");

  const handleAddCrop = (event) => {
    event.preventDefault();

    if (!cropName || !area) {
      return;
    }

    const newCrop = {
      id: Date.now(),
      name: cropName,
      variety: variety || "General",
      area: `${area} acres`,
      status: "Growing",
      harvest: "To be updated",
      progress: 5,
      health: "Good",
      icon: "🌱",
    };

    setCrops((currentCrops) => [
      ...currentCrops,
      newCrop,
    ]);

    setCropName("");
    setVariety("");
    setArea("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f3]">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Farm Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            My Farm
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your farm, fields and crops from one place.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Add Crop
        </button>
      </div>

      {/* LOCATION */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <MapPin size={20} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Farm Location
          </p>

          <p className="font-semibold text-gray-900">
            Jaipur, Rajasthan
          </p>
        </div>

        <button className="ml-auto hidden items-center gap-1 text-sm font-semibold text-green-600 sm:flex">
          View Map
          <ArrowUpRight size={15} />
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          icon={<Ruler size={21} />}
          title="Total Farm Area"
          value="4.9 Acres"
          subtitle="Registered area"
        />

        <StatCard
          icon={<Sprout size={21} />}
          title="Active Crops"
          value={crops.length}
          subtitle="Currently tracked"
        />

        <StatCard
          icon={<span>❤️</span>}
          title="Farm Health"
          value="82%"
          subtitle="Overall condition"
        />

        <StatCard
          icon={<Droplets size={21} />}
          title="Soil Moisture"
          value="58%"
          subtitle="Average moisture"
        />

      </div>

      {/* FARM OVERVIEW */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Farm Overview
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Aman&apos;s Farm
              </h2>
            </div>

            <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100">
              •••
            </button>
          </div>

          {/* FARM MAP */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-emerald-300">

            <div className="absolute left-8 top-10 h-28 w-40 rotate-6 rounded-[40%] bg-green-700 opacity-30" />

            <div className="absolute right-12 top-5 h-32 w-52 -rotate-12 rounded-[40%] bg-green-800 opacity-30" />

            <div className="absolute bottom-4 left-1/3 h-28 w-48 rotate-3 rounded-[40%] bg-lime-700 opacity-30" />

            <div className="absolute left-5 top-5 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
              <p className="text-xs font-bold text-gray-500">
                FIELD 01
              </p>

              <p className="font-bold text-gray-900">
                Tomato
              </p>

              <p className="text-xs text-gray-500">
                2.4 acres
              </p>
            </div>

            <div className="absolute right-6 top-12 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
              <p className="text-xs font-bold text-gray-500">
                FIELD 02
              </p>

              <p className="font-bold text-gray-900">
                Wheat
              </p>

              <p className="text-xs text-gray-500">
                2.0 acres
              </p>
            </div>

            <div className="absolute bottom-6 left-1/2 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
              <p className="text-xs font-bold text-gray-500">
                FIELD 03
              </p>

              <p className="font-bold text-gray-900">
                Onion
              </p>

              <p className="text-xs text-gray-500">
                0.5 acres
              </p>
            </div>

            <button className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
              <MapPin size={15} />
              Open Farm Map
            </button>

          </div>

          {/* FARM METRICS */}
          <div className="grid grid-cols-3 divide-x border-t border-gray-100">

            <div className="p-4 text-center">
              <p className="text-xl font-bold">4.9</p>
              <p className="text-xs text-gray-500">
                Total Acres
              </p>
            </div>

            <div className="p-4 text-center">
              <p className="text-xl font-bold">
                {crops.length}
              </p>

              <p className="text-xs text-gray-500">
                Active Crops
              </p>
            </div>

            <div className="p-4 text-center">
              <p className="text-xl font-bold">
                82%
              </p>

              <p className="text-xs text-gray-500">
                Farm Health
              </p>
            </div>

          </div>
        </div>

        {/* ACTIVITY */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-xs font-bold uppercase tracking-wider text-green-600">
            Farm Activity
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Recent Updates
          </h2>

          <div className="mt-6 space-y-5">

            <Activity
              icon={<Sprout size={17} />}
              title="Tomato crop added"
              time="Today"
            />

            <Activity
              icon={<Droplets size={17} />}
              title="Soil moisture checked"
              time="Yesterday"
            />

            <Activity
              icon={<CheckCircle2 size={17} />}
              title="Disease scan completed"
              time="2 days ago"
            />

            <Activity
              icon={<CalendarDays size={17} />}
              title="Farm record updated"
              time="4 days ago"
            />

          </div>
        </div>

      </div>

      {/* CROPS */}
      <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-green-600">
              Crop Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Your Crops
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-sm font-semibold text-green-600"
          >
            <Plus size={16} />
            Add Crop
          </button>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
            />
          ))}

        </div>
      </div>

      {/* FIELDS */}
      <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

        <p className="text-xs font-bold uppercase tracking-wider text-green-600">
          Field Management
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          Your Fields
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
            />
          ))}

        </div>
      </div>

      {/* FARM DIARY CTA */}
      <div className="mb-6 rounded-3xl border border-green-100 bg-green-50 p-5">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
            <CalendarDays size={21} />
          </div>

          <div>

            <h3 className="font-bold text-green-900">
              Upcoming Farm Activity
            </h3>

            <p className="mt-1 text-sm text-green-800">
              Next fertilizer application is scheduled for
              <strong> 16 October 2026</strong>.
            </p>

            <button
              onClick={() => onNavigate?.("Farm Diary")}
              className="mt-3 flex items-center gap-1 text-sm font-bold text-green-700"
            >
              Open Farm Diary
              <ArrowUpRight size={14} />
            </button>

          </div>
        </div>
      </div>

      {/* ADD CROP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold text-green-600">
                  Farm Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Add New Crop
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleAddCrop}
              className="space-y-4"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Crop Name
                </label>

                <select
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-500"
                  required
                >
                  <option value="">
                    Select crop
                  </option>

                  <option value="Tomato">
                    Tomato
                  </option>

                  <option value="Wheat">
                    Wheat
                  </option>

                  <option value="Rice">
                    Rice
                  </option>

                  <option value="Maize">
                    Maize
                  </option>

                  <option value="Onion">
                    Onion
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Variety
                </label>

                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="Example: Hybrid"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Area in Acres
                </label>

                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Example: 1.5"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 p-3 font-bold text-white hover:bg-green-700"
              >
                <Plus size={18} />
                Add Crop
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
>>>>>>> ca10812 (Add new frontend features and update UI)
