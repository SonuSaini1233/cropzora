import React, { useEffect, useMemo, useState } from "react";
import {
  Sprout,
  Plus,
  CalendarDays,
  Droplets,
  FlaskConical,
  Bug,
  CloudSun,
  Trash2,
  X,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Leaf,
  MapPin,
  Ruler,
  Search,
} from "lucide-react";

const STORAGE_KEY = "cropzora-crops";

const defaultCrops = [
  {
    id: 1,
    name: "Tomato",
    variety: "Hybrid Tomato",
    area: "2.5",
    unit: "Acre",
    sowingDate: "2026-08-15",
    stage: "Flowering",
    health: "Healthy",
    irrigation: "Tomorrow",
    fertilizer: "3 days",
    pestRisk: "Moderate",
    location: "Field 1",
  },
  {
    id: 2,
    name: "Wheat",
    variety: "HD-2967",
    area: "3",
    unit: "Acre",
    sowingDate: "2026-07-25",
    stage: "Vegetative",
    health: "Needs Attention",
    irrigation: "Today",
    fertilizer: "5 days",
    pestRisk: "Low",
    location: "Field 2",
  },
];

const cropOptions = [
  "Wheat",
  "Rice",
  "Tomato",
  "Potato",
  "Onion",
  "Chilli",
  "Maize",
  "Cotton",
  "Mustard",
  "Soybean",
  "Sugarcane",
  "Other",
];

const stageOptions = [
  "Sowing",
  "Germination",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Maturity",
  "Harvesting",
];

const initialForm = {
  name: "",
  variety: "",
  area: "",
  unit: "Acre",
  sowingDate: "",
  stage: "Sowing",
  location: "",
};

function getStageProgress(stage) {
  const progress = {
    Sowing: 10,
    Germination: 20,
    Vegetative: 40,
    Flowering: 60,
    Fruiting: 75,
    Maturity: 90,
    Harvesting: 100,
  };

  return progress[stage] || 10;
}

function getNextStage(stage) {
  const index = stageOptions.indexOf(stage);

  if (index === -1 || index === stageOptions.length - 1) {
    return "Completed";
  }

  return stageOptions[index + 1];
}

function getHealthClass(health) {
  if (health === "Healthy") {
    return "bg-green-100 text-green-700";
  }

  if (health === "Needs Attention") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
}

function formatDate(date) {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CropManagement({ onBack }) {
  const [crops, setCrops] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }

      return defaultCrops;
    } catch {
      return defaultCrops;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(crops));
  }, [crops]);

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) =>
      `${crop.name} ${crop.variety} ${crop.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [crops, search]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddCrop = (e) => {
    e.preventDefault();

    if (!form.name || !form.area || !form.sowingDate) {
      alert("Please fill Crop Name, Area and Sowing Date.");
      return;
    }

    const newCrop = {
      id: Date.now(),
      name: form.name,
      variety: form.variety || "Standard Variety",
      area: form.area,
      unit: form.unit,
      sowingDate: form.sowingDate,
      stage: form.stage,
      health: "Healthy",
      irrigation: "Not scheduled",
      fertilizer: "Not scheduled",
      pestRisk: "Low",
      location: form.location || "Farm Field",
    };

    setCrops((previous) => [newCrop, ...previous]);

    setForm(initialForm);
    setShowModal(false);
  };

  const handleDeleteCrop = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this crop?"
    );

    if (!confirmed) return;

    setCrops((previous) => previous.filter((crop) => crop.id !== id));

    if (selectedCrop?.id === id) {
      setSelectedCrop(null);
    }
  };

  const totalArea = crops.reduce((sum, crop) => {
    const area = Number(crop.area);

    return sum + (Number.isNaN(area) ? 0 : area);
  }, 0);

  const healthyCrops = crops.filter(
    (crop) => crop.health === "Healthy"
  ).length;

  const attentionCrops = crops.filter(
    (crop) => crop.health === "Needs Attention"
  ).length;

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Sprout size={27} />
              </div>

              <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
                Smart Crop Management
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Manage Your Crops
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-green-50 sm:text-base">
              Track your crops from sowing to harvesting, monitor crop stages,
              manage farm activities and keep important crop information in one
              place.
            </p>
          </div>

          <div className="flex gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Back
              </button>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <Plus size={19} />
              Add Crop
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Sprout}
          title="Total Crops"
          value={crops.length}
          subtitle="Currently managed"
        />

        <StatCard
          icon={Ruler}
          title="Total Area"
          value={`${totalArea.toFixed(1)} Acre`}
          subtitle="Under management"
        />

        <StatCard
          icon={CheckCircle2}
          title="Healthy Crops"
          value={healthyCrops}
          subtitle="Good crop condition"
        />

        <StatCard
          icon={Clock3}
          title="Attention Needed"
          value={attentionCrops}
          subtitle="Require monitoring"
        />
      </section>

      {/* Search */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop, variety or field..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
          />
        </div>
      </section>

      {/* My Crops */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              My Crops
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor all your active crops and their current growth stage.
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
            {filteredCrops.length} Crops
          </span>
        </div>

        {filteredCrops.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Sprout size={30} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No crops found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add a crop or change your search.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Add Your First Crop
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCrops.map((crop) => {
              const progress = getStageProgress(crop.stage);

              return (
                <CropCard
                  key={crop.id}
                  crop={crop}
                  progress={progress}
                  onView={() => setSelectedCrop(crop)}
                  onDelete={() => handleDeleteCrop(crop.id)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Today's Tasks */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Today's Crop Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Important activities to keep your crops healthy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TaskCard
            icon={Droplets}
            title="Irrigation Check"
            description="Check soil moisture before irrigation."
            status="Today"
          />

          <TaskCard
            icon={Bug}
            title="Pest Inspection"
            description="Inspect leaves and stems for pest activity."
            status="Recommended"
          />

          <TaskCard
            icon={FlaskConical}
            title="Fertilizer Planning"
            description="Review fertilizer requirement for the next crop stage."
            status="Upcoming"
          />
        </div>
      </section>

      {/* Crop Care Guide */}
      <section className="rounded-3xl border border-green-100 bg-green-50 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white">
            <Leaf size={28} />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              Crop Care Reminder
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              Regularly monitor soil moisture, crop health, pest activity,
              weather conditions and crop growth stage. Timely farm activities
              can help reduce crop losses and improve farm management.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Next Stage
            </p>

            <p className="mt-1 font-bold text-green-700">
              Plan Your Farm Activities
            </p>
          </div>
        </div>
      </section>

      {/* Crop Details Modal */}
      {selectedCrop && (
        <CropDetails
          crop={selectedCrop}
          onClose={() => setSelectedCrop(null)}
        />
      )}

      {/* Add Crop Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Crop
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add your crop details to start managing it.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setForm(initialForm);
                }}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddCrop} className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Crop Name *">
                  <select
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Crop</option>

                    {cropOptions.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Variety">
                  <input
                    type="text"
                    name="variety"
                    value={form.variety}
                    onChange={handleChange}
                    placeholder="e.g. HD-2967"
                    className="input-field"
                  />
                </FormField>

                <FormField label="Farm Area *">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="e.g. 2.5"
                    className="input-field"
                  />
                </FormField>

                <FormField label="Area Unit">
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="Acre">Acre</option>
                    <option value="Hectare">Hectare</option>
                    <option value="Bigha">Bigha</option>
                  </select>
                </FormField>

                <FormField label="Sowing Date *">
                  <input
                    type="date"
                    name="sowingDate"
                    value={form.sowingDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                </FormField>

                <FormField label="Current Stage">
                  <select
                    name="stage"
                    value={form.stage}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {stageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Field / Location">
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. North Field"
                  className="input-field"
                />
              </FormField>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm(initialForm);
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
                >
                  <Plus size={18} />
                  Add Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Icon size={22} />
        </div>

        <span className="text-xs font-medium text-gray-400">
          CropZora
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>

      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

/* =========================
   CROP CARD
========================= */

function CropCard({ crop, progress, onView, onDelete }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Sprout size={25} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {crop.name}
              </h3>

              <p className="text-xs text-gray-500">{crop.variety}</p>
            </div>
          </div>

          <button
            onClick={onDelete}
            title="Delete crop"
            className="rounded-lg p-2 text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
          >
            <Trash2 size={17} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoItem
            icon={Ruler}
            label="Area"
            value={`${crop.area} ${crop.unit}`}
          />

          <InfoItem
            icon={MapPin}
            label="Field"
            value={crop.location}
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Crop Progress
            </span>

            <span className="text-xs font-bold text-green-600">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">
              {crop.stage}
            </span>

            <span className="text-gray-400">
              Next: {getNextStage(crop.stage)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getHealthClass(
              crop.health
            )}`}
          >
            {crop.health}
          </span>

          <button
            onClick={onView}
            className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700"
          >
            View Details
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INFO ITEM
========================= */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={15} />
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* =========================
   TASK CARD
========================= */

function TaskCard({ icon: Icon, title, description, status }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Icon size={21} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {status}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* =========================
   FORM FIELD
========================= */

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </span>

      {children}
    </label>
  );
}

/* =========================
   CROP DETAILS
========================= */

function CropDetails({ crop, onClose }) {
  const progress = getStageProgress(crop.stage);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Sprout size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {crop.name}
              </h2>

              <p className="text-xs text-gray-500">{crop.variety}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Basic Details */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailBox
              icon={Ruler}
              title="Farm Area"
              value={`${crop.area} ${crop.unit}`}
            />

            <DetailBox
              icon={CalendarDays}
              title="Sowing Date"
              value={formatDate(crop.sowingDate)}
            />

            <DetailBox
              icon={MapPin}
              title="Location"
              value={crop.location}
            />

            <DetailBox
              icon={Leaf}
              title="Health"
              value={crop.health}
            />
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">
                  Crop Growth Progress
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Current stage: {crop.stage}
                </p>
              </div>

              <span className="text-xl font-bold text-green-600">
                {progress}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Crop Timeline
            </h3>

            <div className="space-y-3">
              {stageOptions.map((stage, index) => {
                const currentIndex = stageOptions.indexOf(crop.stage);

                const completed = index <= currentIndex;
                const current = stage === crop.stage;

                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      current
                        ? "bg-green-50"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        completed
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <span className="text-xs font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          current
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        {stage}
                      </p>

                      {current && (
                        <p className="text-xs text-green-600">
                          Current crop stage
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advisory */}
          <div className="grid gap-4 sm:grid-cols-2">
            <AdviceBox
              icon={Droplets}
              title="Irrigation"
              value={crop.irrigation}
              description="Monitor soil moisture before irrigation."
            />

            <AdviceBox
              icon={FlaskConical}
              title="Fertilizer"
              value={crop.fertilizer}
              description="Follow crop-stage based nutrient planning."
            />

            <AdviceBox
              icon={Bug}
              title="Pest Risk"
              value={crop.pestRisk}
              description="Regularly inspect leaves and stems."
            />

            <AdviceBox
              icon={CloudSun}
              title="Weather"
              value="Monitor daily"
              description="Check weather before spraying or irrigation."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   DETAIL BOX
========================= */

function DetailBox({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={17} />
        <span className="text-xs">{title}</span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

/* =========================
   ADVICE BOX
========================= */

function AdviceBox({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-400">{title}</p>

          <p className="font-bold text-gray-900">{value}</p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </div>
  );
}