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

const initialCrops = [
  {
    id: 1,
    name: "Tomato",
    category: "Vegetable",
    area: "2.4",
    sowing: "18 Jul 2026",
    stage: "Flowering",
    health: 96,
    healthTone: "good",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Wheat",
    category: "Grain",
    area: "2.0",
    sowing: "28 Jun 2026",
    stage: "Tillering",
    health: 93,
    healthTone: "good",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Onion",
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
