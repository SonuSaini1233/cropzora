import { useState } from "react";

import {

  Home,

  Sprout,

  Leaf,

  ScanSearch,

  Bug,

  CloudSun,

  FlaskConical,

  Calculator,

  Store,

  Landmark,

  Bot,

  BookOpen,

  FileBarChart,

  Search,

  Bell,

  ChevronDown,

  ChevronRight,

  Mic,

  MapPin,

  Droplets,

  Wind,

  CloudRain,

  Check,

  Circle,

  Wheat,

  IndianRupee,

  Menu,

  X,

  ArrowUpRight,

  CircleGauge,

  UserRound,

  ShieldCheck,

  Sun,

  Sparkles,

} from "lucide-react";



import Diagnose from "./pages/Diagnose";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// NAVIGATION



const navigation = [

  ["Home", Home],

  ["My Farm", Sprout],

  ["Crop Management", Leaf],

  ["Disease Detection", ScanSearch],

  ["Pest Detection", Bug],

  ["Weather & Advisory", CloudSun],

  ["Soil Health", FlaskConical],

  ["Farm Calculators", Calculator],

  ["Market Prices", Store],

  ["Government Schemes", Landmark],

  ["Garden & Plants", Leaf],

  ["Ask an Expert", UserRound],

  ["AI Assistant", Bot],

  ["Farm Diary", BookOpen],

  ["Reports", FileBarChart],

];

// QUICK ACTIONS



const quickActions = [

  ["Disease Scan", "Check crop health", ScanSearch, "green"],

  ["Pest Check", "Identify insects", Bug, "orange"],

  ["Weather", "Forecast & alerts", CloudSun, "blue"],

  ["My Crops", "Track your crops", Sprout, "lime"],

  ["Plant Care", "Garden assistance", Leaf, "brown"],

  ["Ask AI", "Get smart guidance", Bot, "purple"],

];

// SMART SERVICES



const serviceCards = [

  [

    "Detect Crop Disease",

    "Upload a leaf photo",

    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=90",

    ScanSearch,

  ],

  [

    "Identify Pests",

    "Find harmful insects",

    "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=90",

    Bug,

  ],

  [

    "Check Soil Health",

    "Understand your soil",

    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=90",

    FlaskConical,

  ],

  [

    "Smart Irrigation",

    "Know when to water",

    "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=900&q=90",

    Droplets,

  ],

  [

    "Crop Nutrition",

    "Improve plant nutrition",

    "https://images.unsplash.com/photo-1592982537447-6f2a6a0a7f2d?auto=format&fit=crop&w=900&q=90",

    Sprout,

  ],

  [

    "Farm Calculators",

    "Calculate accurately",

    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=90",

    Calculator,

  ],

  [

    "Crop Recommendation",

    "Choose suitable crops",

    "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900&q=90",

    Wheat,

  ],

  [

    "Home Gardening",

    "Care for your plants",

    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=90",

    Leaf,

  ],

];

// TASKS



const initialTasks = [

  ["Check soil moisture", "Today · Morning", true],

  ["Inspect tomato leaves", "Today · Afternoon", true],

  ["Check pest activity", "Today · Evening", true],

  ["Review irrigation need", "Today", false],

  ["Next fertilizer application", "16 October", false],

];

// SCHEMES



const schemes = [

  ["PM-KISAN", "Income support for eligible farmers", Landmark, "yellow"],

  ["PMFBY", "Crop insurance support", ShieldCheck, "green"],

  ["Micro Irrigation", "Drip & sprinkler assistance", Droplets, "blue"],

];

// CALCULATORS



const calculators = [

  ["Seed", Wheat],

  ["Area", Sprout],

  ["Irrigation", Droplets],

  ["Fertilizer", FlaskConical],

  ["Yield", Calculator],

  ["Profit", IndianRupee],

];

// SECTION TITLE



function SectionTitle({ eyebrow, title, action }) {

  return (

    <div className="section-title">

      <div>

        <span>{eyebrow}</span>

        <h2>{title}</h2>

      </div>

      {action && (

        <button className="text-action">

          {action}

          <ArrowUpRight size={14} />

        </button>

      )}

    </div>

  );

}

// APP



export default function App() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const [activeNav, setActiveNav] = useState("Home");
  const [appScreen, setAppScreen] = useState("landing");

  const [tasks, setTasks] = useState(initialTasks);

  const completedTasks = tasks.filter((task) => task[2]).length;

  const openLanding = () => {
    setAppScreen("landing");
    setActiveNav("Home");
    setMobileOpen(false);
  };

  const openLogin = () => {
    setAppScreen("login");
  };

  const openRegister = () => {
    setAppScreen("register");
  };

  const openDashboard = () => {
    setAppScreen("dashboard");
    setActiveNav("Home");
    setMobileOpen(false);
  };

  const handleNavigation = (label) => {

    setActiveNav(label);

    setMobileOpen(false);

  };



  const toggleTask = (index) => {

    setTasks((current) =>

      current.map((task, i) =>

        i === index ? [task[0], task[1], !task[2]] : task

      )

    );

  };

  if (appScreen === "landing") {
    return (
      <Landing
        onLogin={openLogin}
        onGetStarted={openLogin}
      />
    );
  }

  if (appScreen === "login") {
    return (
      <Login
        onLogin={openDashboard}
        onRegister={openRegister}
        onBack={openLanding}
      />
    );
  }

  if (appScreen === "register") {
    return (
      <Register
        onRegister={openDashboard}
        onLogin={openLogin}
        onBack={openLogin}
      />
    );
  }

  return (

    <div className="app-shell">

      {mobileOpen && (

        <div

          className="mobile-backdrop"

          onClick={() => setMobileOpen(false)}

        />

      )}

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>

        <div className="brand">

          <div className="brand-mark">

            <Leaf size={25} strokeWidth={2.4} />

          </div>

          <div>

            <div className="brand-name">

              CropZora

            </div>

            <div className="brand-subtitle">

              SMART AGRICULTURE

            </div>

          </div>

          <button

            className="sidebar-close"

            onClick={() => setMobileOpen(false)}

          >

            <X size={19} />

          </button>

        </div>

        <div className="nav-wrapper">

          <div className="nav-label">

            MAIN MENU

          </div>

          {navigation.map(([label, Icon]) => (

            <button

              key={label}

              className={`nav-item ${

                activeNav === label ? "active" : ""

              }`}

              onClick={() => {

                setActiveNav(label);

                setMobileOpen(false);

              }}

            >

              <span className="nav-icon">

                <Icon size={18} strokeWidth={1.9} />

              </span>

              <span className="nav-text">

                {label}

              </span>

              {label === "AI Assistant" && (

                <small className="nav-ai">

                  AI

                </small>

              )}

            </button>

          ))}

        </div>

        {/* Sidebar bottom */}

        <div className="sidebar-bottom">

          <div className="sidebar-tip">

            <div className="tip-icon">

              <Sparkles size={16} />

            </div>

            <div>

              <strong>

                Smart farming

              </strong>

              <span>

                AI-powered insights for your farm.

              </span>

            </div>

          </div>

        </div>

      </aside>

      <div className="main">

          <header className="topbar">

          <div className="top-left">

            <button

              className="mobile-menu"

              onClick={() => setMobileOpen(true)}

            >

              <Menu size={20} />

            </button>

            <div className="search-box">

              <Search size={18} />

              <input

                type="search"

                placeholder="Search crops, diseases, pests, weather..."

              />

              <button className="search-mic">

                <Mic size={15} />

              </button>

            </div>

          </div>

          <div className="top-right">

            <button className="location">

              <MapPin size={17} />

              <span>

                Jaipur, Rajasthan

              </span>

              <ChevronDown size={14} />

            </button>

            <button className="language">

              <span>EN</span>

              English

              <ChevronDown size={13} />

            </button>

            <button className="notification">

              <Bell size={18} />

              <b>3</b>

            </button>

            <div className="profile">

              <div className="avatar">

                YS

              </div>

              <div className="profile-text">

                <strong>

                  Yuvi Singh

                </strong>

                <span>

                  Farmer

                </span>

              </div>

            </div>

            <button className="top-more">

              •••

            </button>

          </div>

        </header>

          <main className="content">

          {activeNav === "Disease Detection" ? (

            <Diagnose onBack={() => setActiveNav("Home")} />

          ) : (

            <>

              <section className="hero-grid">

            {/* HERO */}

            <article className="hero">

              <img

                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90"

                alt="Agricultural field"

              />

              <div className="hero-overlay" />

              <div className="hero-content">

                <div className="hero-tag">

                  <span />

                  CROPZORA SMART FARMING

                </div>

                <h1>

                  Farm smarter.

                  <br />

                  <strong>Grow better.</strong>

                </h1>

                <p>

                  AI-powered crop insights, weather intelligence

                  and personalized farming guidance — all in one

                  place.

                </p>

                <div className="hero-search">

                  <Bot size={20} />

                  <input

                    placeholder="Ask about your crop, soil, pests or weather..."

                  />

                  <button>

                    <Mic size={15} />

                    Ask CropZora

                  </button>

                </div>

                <div className="hero-points">

                  <span>

                    <Check size={13} />

                    AI insights

                  </span>

                  <span>

                    <Check size={13} />

                    Farm-aware advice

                  </span>

                  <span>

                    <Check size={13} />

                    Weather intelligence

                  </span>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="quick-actions">

                {quickActions.map(

                  ([title, text, Icon, color]) => (

                    <button

                      className="quick-action"

                      key={title}

                    >

                      <span

                        className={`quick-icon ${color}`}

                      >

                        <Icon size={20} />

                      </span>

                      <strong>

                        {title}

                      </strong>

                      <small>

                        {text}

                      </small>

                    </button>

                  )

                )}

              </div>

            </article>

                  <article className="weather">

              <div className="weather-image" />

              <div className="weather-overlay" />

              <div className="weather-content">

                <div className="weather-top">

                  <div>

                    <span className="eyebrow light">

                      FARM WEATHER

                    </span>

                    <h2>

                      <MapPin size={16} />

                      Jaipur, Rajasthan

                    </h2>

                    <p>

                      Friday, 25 September 2026

                    </p>

                  </div>

                  <button className="forecast-button">

                    7 Days

                    <ChevronRight size={13} />

                  </button>

                </div>

                <div className="weather-main">

                  <div className="sun">

                    <Sun size={45} />

                  </div>

                  <div>

                    <div className="temp">

                      28<span>°C</span>

                    </div>

                    <p>

                      Clear skies · Feels like 29°C

                    </p>

                  </div>

                </div>

                <div className="weather-stats">

                  <div>

                    <Droplets size={17} />

                    <span>Humidity</span>

                    <strong>48%</strong>

                  </div>

                  <div>

                    <CloudRain size={17} />

                    <span>Rain chance</span>

                    <strong>20%</strong>

                  </div>

                  <div>

                    <Wind size={17} />

                    <span>Wind</span>

                    <strong>14 km/h</strong>

                  </div>

                </div>

                <div className="advisory">

                  <div className="advisory-head">

                    <div className="advisory-icon">

                      <Sprout size={17} />

                    </div>

                    <div>

                      <strong>

                        Today's Farm Advisory

                      </strong>

                      <span>

                        Recommendations based on today's

                        conditions

                      </span>

                    </div>

                  </div>

                  <div className="advice">

                    <span>

                      <Check size={12} />

                      Check soil moisture before irrigation.

                    </span>

                    <span>

                      <Check size={12} />

                      Monitor tomato leaves for disease signs.

                    </span>

                  </div>

                </div>

              </div>

            </article>

          </section>

              <section className="services-section">

            <SectionTitle

              eyebrow="SMART FARMING TOOLS"

              title="What do you want to do today?"

              action="Explore all"

            />

            <div className="service-grid">

              {serviceCards.map(

                ([title, text, image, Icon]) => (

                  <button

                    className="service-card"

                    key={title}

                  >

                    <img

                      src={image}

                      alt={title}

                    />

                    <div className="service-overlay" />

                    <div className="service-icon">

                      <Icon size={18} />

                    </div>

                    <div className="service-copy">

                      <strong>

                        {title}

                      </strong>

                      <span>

                        {text}

                      </span>

                    </div>

                    <div className="service-arrow">

                      <ArrowUpRight size={13} />

                    </div>

                  </button>

                )

              )}

            </div>

          </section>

              <section className="dashboard-grid">

                  <article className="card">

              <SectionTitle

                eyebrow="FARM MANAGEMENT"

                title="Your Farm"

                action="View map"

              />

              <div className="farm-image">

                <img

                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=90"

                  alt="Farm"

                />

                <div className="farm-overlay" />

                <div className="field field-a">

                  <strong>

                    FIELD 01

                  </strong>

                  <span>

                    2.4 acres

                  </span>

                  <small>

                    Tomato

                  </small>

                </div>

                <div className="field field-b">

                  <strong>

                    FIELD 02

                  </strong>

                  <span>

                    2.0 acres

                  </span>

                  <small>

                    Wheat

                  </small>

                </div>

                <div className="field field-c">

                  <strong>

                    FIELD 03

                  </strong>

                  <span>

                    0.5 acres

                  </span>

                  <small>

                    Onion

                  </small>

                </div>

                <button className="map-button">

                  <MapPin size={13} />

                  Farm map

                </button>

              </div>

              <div className="farm-metrics">

                <div>

                  <strong>

                    4.9

                  </strong>

                  <span>

                    Total acres

                  </span>

                </div>

                <div>

                  <strong>

                    3

                  </strong>

                  <span>

                    Active crops

                  </span>

                </div>

                <div>

                  <strong>

                    82%

                  </strong>

                  <span>

                    Farm health

                  </span>

                </div>

              </div>

            </article>

                  <article className="card">

              <div className="section-title">

                <div>

                  <span>

                    FARM ROUTINE

                  </span>

                  <h2>

                    Today's Tasks

                  </h2>

                </div>

                <button className="text-action">

                  {completedTasks} of {tasks.length} done

                  <ArrowUpRight size={14} />

                </button>

              </div>

              <div className="task-list">

                {tasks.map(

                  ([title, time, done], index) => (

                    <button

                      className="task-row"

                      key={title}

                      onClick={() => toggleTask(index)}

                    >

                      <span

                        className={`task-check ${

                          done ? "completed" : ""

                        }`}

                      >

                        {done ? (

                          <Check size={12} />

                        ) : (

                          <Circle size={10} />

                        )}

                      </span>

                      <div>

                        <strong>

                          {title}

                        </strong>

                        <small>

                          {time}

                        </small>

                      </div>

                    </button>

                  )

                )}

              </div>

              <button className="wide-outline">

                Open Farm Diary

                <ArrowUpRight size={14} />

              </button>

            </article>

                  <article className="card">

              <SectionTitle

                eyebrow="AI CROP HEALTH"

                title="Latest Diagnosis"

                action="New scan"

              />

              <div className="diagnosis">

                <div className="diagnosis-photo">

                  <img

                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=90"

                    alt="Tomato"

                  />

                  <span>

                    <ScanSearch size={11} />

                    AI SCAN

                  </span>

                </div>

                <div className="diagnosis-text">

                  <span className="crop-label">

                    TOMATO

                  </span>

                  <h3>

                    Early Blight

                  </h3>

                  <div className="confidence">

                    <CircleGauge size={15} />

                    <strong>

                      94%

                    </strong>

                    <span>

                      confidence

                    </span>

                  </div>

                  <button>

                    View diagnosis

                    <ChevronRight size={12} />

                  </button>

                </div>

              </div>

              <div className="diagnosis-status">

                <span>

                  <ShieldCheck size={13} />

                  AI analysis completed

                </span>

                <small>

                  2 min ago

                </small>

              </div>

            </article>

                  <article className="card">

              <SectionTitle

                eyebrow="MARKET INTELLIGENCE"

                title="Crop Market Prices"

                action="View all"

              />

              <div className="market-select">

                <select defaultValue="Tomato">

                  <option value="Tomato">

                    Tomato

                  </option>

                  <option value="Wheat">

                    Wheat

                  </option>

                  <option value="Onion">

                    Onion

                  </option>

                  <option value="Potato">

                    Potato

                  </option>

                </select>

                <select defaultValue="Jaipur">

                  <option value="Jaipur">

                    Jaipur

                  </option>

                  <option value="Delhi">

                    Delhi

                  </option>

                  <option value="Agra">

                    Agra

                  </option>

                </select>

              </div>

              <div className="price-block">

                <span>

                  Current average price

                </span>

                <strong>

                  <IndianRupee size={21} />

                  2,400

                </strong>

                <small>

                  <ArrowUpRight size={11} />

                  5.2% today

                </small>

              </div>

              <div className="chart">

                <svg

                  viewBox="0 0 340 100"

                  preserveAspectRatio="none"

                >

                  <defs>

                    <linearGradient

                      id="chartFill"

                      x1="0"

                      y1="0"

                      x2="0"

                      y2="1"

                    >

                      <stop

                        offset="0%"

                        stopColor="#078447"

                        stopOpacity=".25"

                      />

                      <stop

                        offset="100%"

                        stopColor="#078447"

                        stopOpacity="0"

                      />

                    </linearGradient>

                  </defs>

                  <path

                    d="M0 82 L25 73 L48 76 L72 62 L98 68 L125 55 L150 59 L175 46 L201 51 L226 37 L252 43 L278 28 L305 34 L340 19"

                    fill="none"

                    stroke="#078447"

                    strokeWidth="3.5"

                    strokeLinecap="round"

                  />

                  <path

                    d="M0 82 L25 73 L48 76 L72 62 L98 68 L125 55 L150 59 L175 46 L201 51 L226 37 L252 43 L278 28 L305 34 L340 19 L340 100 L0 100 Z"

                    fill="url(#chartFill)"

                  />

                </svg>

              </div>

              <div className="chart-labels">

                <span>

                  10 Sep

                </span>

                <span>

                  15 Sep

                </span>

                <span>

                  Today

                </span>

              </div>

            </article>

          </section>

              <section className="lower-grid">

            {/* GOVERNMENT SCHEMES */}

            <article className="card">

              <SectionTitle

                eyebrow="FARMER SUPPORT"

                title="Government Schemes"

                action="Explore all"

              />

              <div className="scheme-list">

                {schemes.map(

                  ([name, text, Icon, color]) => (

                    <div

                      className="scheme-row"

                      key={name}

                    >

                      <div

                        className={`scheme-icon ${color}`}

                      >

                        <Icon size={18} />

                      </div>

                      <div className="scheme-info">

                        <strong>

                          {name}

                        </strong>

                        <span>

                          {text}

                        </span>

                      </div>

                      <button>

                        Details

                      </button>

                    </div>

                  )

                )}

              </div>

            </article>

            {/* CALCULATORS */}

            <article className="card">

              <SectionTitle

                eyebrow="SMART FARM TOOLS"

                title="Farm Calculators"

                action="View all"

              />

              <div className="calculator-grid">

                {calculators.map(

                  ([label, Icon]) => (

                    <button key={label}>

                      <span>

                        <Icon size={19} />

                      </span>

                      <strong>

                        {label}

                      </strong>

                    </button>

                  )

                )}

              </div>

            </article>

            {/* AI ASSISTANT */}

            <article className="card ai-card">

              <SectionTitle

                eyebrow="AI ASSISTANT"

                title="Ask CropZora"

              />

              <div className="ai-status">

                <span />

                Online

              </div>

              <div className="ai-intro">

                <div className="ai-avatar">

                  <Bot size={22} />

                </div>

                <div>

                  <strong>

                    Your AI Farming Copilot

                  </strong>

                  <span>

                    Quick answers for crops, soil,

                    pests and weather.

                  </span>

                </div>

              </div>

              <div className="ai-input">

                <input

                  placeholder="Ask about your crop, soil, weather..."

                />

                <button>

                  <Mic size={16} />

                </button>

              </div>

              <div className="ai-suggestions">

                <button>

                  Tomato disease

                </button>

                <button>

                  When to irrigate?

                </button>

                <button>

                  Best fertilizer?

                </button>

              </div>

            </article>

          </section>

              <footer className="footer">

            <div>

              <span className="footer-mark">

                <Leaf size={14} />

              </span>

              <strong>

                CropZora

              </strong>

              <span>

                Smart agriculture for everyone.

              </span>

            </div>

            <span>

              AI-powered · Farmer-first · Data-driven

            </span>

          </footer>

            </>

          )}

        </main>

      </div>

    </div>

  );

}
