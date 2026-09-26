// import React, { useState } from "react";
// import {
//   Home, Sprout, Leaf, ScanSearch, Bug, CloudSun, FlaskConical,
//   Calculator, Store, Landmark, UserRound, Bot, BookOpen, FileBarChart,
//   Menu, X, LogOut, ChevronRight, Bell, Trees, ShoppingBag
// } from "lucide-react";

// import Dashboard from "./pages/Dashboard";
// import MyFarm from "./pages/MyFarm";
// import CropManagement from "./pages/CropDetails";
// import Diagnose from "./pages/Diagnose";
// import Calculators from "./pages/Calculators";
// import PestDetection from "./pages/PestDetection";
// import Market from "./pages/Market";
// import Schemes from "./pages/Schemes";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Weather from "./pages/Weather";
// import SoilHealth from "./pages/SoilHealth";
// import Notifications from "./pages/Notifications";

// // Product Page Import with Safe Fallback Handling
// import * as ProductModule from "./pages/Product";
// const Product = ProductModule.default || ProductModule.Product;

// // Safe Module Import for AIChat (Bypasses Vite export mismatch errors)
// import * as AIChatModule from "./pages/AIChat";
// const AIChat = AIChatModule.default || AIChatModule.AIChat;

// const navigation = [
//   { id: "Home", label: "Home", icon: Home },
//   { id: "My Farm", label: "My Farm", icon: Sprout },
//   { id: "Crop Management", label: "Crop Management", icon: Leaf },
//   { id: "Disease Detection", label: "Disease Detection", icon: ScanSearch },
//   { id: "Pest Detection", label: "Pest Detection", icon: Bug },
//   { id: "Organic Products", label: "Organic Products", icon: ShoppingBag },
//   { id: "Weather & Advisory", label: "Weather & Advisory", icon: CloudSun },
//   { id: "Soil Health", label: "Soil Health", icon: FlaskConical },
//   { id: "Farm Calculators", label: "Farm Calculators", icon: Calculator },
//   { id: "Market Prices", label: "Market Prices", icon: Store },
//   { id: "Government Schemes", label: "Government Schemes", icon: Landmark },
//   { id: "Garden & Plants", label: "Garden & Plants", icon: Trees },
//   { id: "Ask an Expert", label: "Ask an Expert", icon: UserRound },
//   { id: "AI Assistant", label: "AI Assistant", icon: Bot },
//   { id: "Farm Diary", label: "Farm Diary", icon: BookOpen },
//   { id: "Reports", label: "Reports", icon: FileBarChart },
// ];

// export default function App() {
//   const [appScreen, setAppScreen] = useState("landing");
//   const [activeNav, setActiveNav] = useState("Home");
//   const [mobileOpen, setMobileOpen] = useState(false);
  
//   // State for passing detected crop to Product marketplace
//   const [detectedCrop, setDetectedCrop] = useState("");

//   const handleNavigation = (label, cropData = "") => {
//     setActiveNav(label);
//     if (cropData) {
//       setDetectedCrop(cropData);
//     }
//     setMobileOpen(false);
//   };

//   if (appScreen === "landing") return <Landing onLogin={() => setAppScreen("login")} onRegister={() => setAppScreen("register")} />;
//   if (appScreen === "login") return <Login onLogin={() => setAppScreen("dashboard")} onRegister={() => setAppScreen("register")} onBack={() => setAppScreen("landing")} />;
//   if (appScreen === "register") return <Register onRegister={() => setAppScreen("dashboard")} onLogin={() => setAppScreen("login")} onBack={() => setAppScreen("landing")} />;

//   const renderContent = () => {
//     switch (activeNav) {
//       case "Home": 
//         return <Dashboard onNavigate={handleNavigation} />;
//       case "My Farm": 
//         return <MyFarm onNavigate={handleNavigation} />;
//       case "Crop Management": 
//         return <CropManagement onBack={() => setActiveNav("Home")} />;
//       case "Disease Detection": 
//         return <Diagnose onBack={() => setActiveNav("Home")} onBuyProduct={(cropName) => handleNavigation("Organic Products", cropName)} />;
//       case "Pest Detection": 
//         return <PestDetection onBack={() => setActiveNav("Home")} onBuyProduct={(cropName) => handleNavigation("Organic Products", cropName)} />;
//       case "Organic Products": 
//         return <Product onBack={() => setActiveNav("Home")} detectedCrop={detectedCrop} />;
//       case "Weather & Advisory": 
//         return <Weather onBack={() => setActiveNav("Home")} />;
//       case "Soil Health": 
//         return <SoilHealth onBack={() => setActiveNav("Home")} />;
//       case "Farm Calculators": 
//         return <Calculators onBack={() => setActiveNav("Home")} />;
//       case "Market Prices": 
//         return <Market onBack={() => setActiveNav("Home")} />;
//       case "Government Schemes": 
//         return <Schemes onBack={() => setActiveNav("Home")} />;
//       case "AI Assistant": 
//         return <AIChat onBack={() => setActiveNav("Home")} />;
//       case "Notifications": 
//         return <Notifications onBack={() => setActiveNav("Home")} />;
//       default: 
//         return <Dashboard onNavigate={handleNavigation} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f7f3]">
//       {/* Sidebar Overlay for Mobile */}
//       {mobileOpen && (
//         <div 
//           onClick={() => setMobileOpen(false)} 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//         />
//       )}

//       {/* Navigation Sidebar */}
//       <aside className={`fixed left-0 top-0 z-50 h-screen w-[270px] bg-white border-r border-gray-200 transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
//         <div className="p-5 border-b font-bold text-lg text-emerald-800 flex items-center justify-between">
//           <span>CropZora</span>
//           <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-500">
//             <X size={20} />
//           </button>
//         </div>
//         <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-70px)] no-scrollbar">
//           {navigation.map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               onClick={() => handleNavigation(label)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
//                 activeNav === label ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-emerald-50"
//               }`}
//             >
//               <Icon size={18} />
//               {label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Container */}
//       <main className="lg:ml-[270px] min-h-screen">
//         {/* Top Header */}
//         <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => setMobileOpen(true)} 
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600"
//             >
//               <Menu size={22} />
//             </button>
//             <h1 className="font-bold text-gray-800 text-base">{activeNav}</h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setActiveNav("Notifications")}
//               className="p-2 hover:bg-emerald-50 rounded-xl relative text-gray-600 transition"
//             >
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//             </button>
//             <button
//               onClick={() => setAppScreen("landing")}
//               className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-xl transition"
//               title="Logout"
//             >
//               <LogOut size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="p-4 md:p-6">{renderContent()}</div>
//       </main>
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  Home, Sprout, Leaf, ScanSearch, Bug, CloudSun, FlaskConical,
  Calculator, Store, Landmark, UserRound, Bot, BookOpen, FileBarChart,
  Menu, X, LogOut, ChevronRight, Bell, Trees, ShoppingBag
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import MyFarm from "./pages/MyFarm";
import CropManagement from "./pages/CropDetails";
import Diagnose from "./pages/Diagnose";
import Calculators from "./pages/Calculators";
import PestDetection from "./pages/PestDetection";
import Market from "./pages/Market";
import Schemes from "./pages/Schemes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Weather from "./pages/Weather";
import SoilHealth from "./pages/SoilHealth";
import Notifications from "./pages/Notifications";

// Product Page Import with Safe Fallback Handling
import * as ProductModule from "./pages/Product";
const Product = ProductModule.default || ProductModule.Product;

// Safe Module Import for AIChat (Bypasses Vite export mismatch errors)
import * as AIChatModule from "./pages/AIChat";
const AIChat = AIChatModule.default || AIChatModule.AIChat;

const navigation = [
  { id: "Home", label: "Home", icon: Home },
  { id: "My Farm", label: "My Farm", icon: Sprout },
  { id: "Crop Management", label: "Crop Management", icon: Leaf },
  { id: "Disease Detection", label: "Disease Detection", icon: ScanSearch },
  { id: "Pest Detection", label: "Pest Detection", icon: Bug },
  { id: "Organic Products", label: "Organic Products", icon: ShoppingBag },
  { id: "Weather & Advisory", label: "Weather & Advisory", icon: CloudSun },
  { id: "Soil Health", label: "Soil Health", icon: FlaskConical },
  { id: "Farm Calculators", label: "Farm Calculators", icon: Calculator },
  { id: "Market Prices", label: "Market Prices", icon: Store },
  { id: "Government Schemes", label: "Government Schemes", icon: Landmark },
  { id: "Garden & Plants", label: "Garden & Plants", icon: Trees },
  { id: "Ask an Expert", label: "Ask an Expert", icon: UserRound },
  { id: "AI Assistant", label: "AI Assistant", icon: Bot },
  { id: "Farm Diary", label: "Farm Diary", icon: BookOpen },
  { id: "Reports", label: "Reports", icon: FileBarChart },
];

export default function App() {
  // Direct start on dashboard (Landing screen removed)
  const [appScreen, setAppScreen] = useState("dashboard");
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for passing detected crop to Product marketplace
  const [detectedCrop, setDetectedCrop] = useState("");

  const handleNavigation = (label, cropData = "") => {
    setActiveNav(label);
    if (cropData) {
      setDetectedCrop(cropData);
    }
    setMobileOpen(false);
  };

  if (appScreen === "login") {
    return <Login onLogin={() => setAppScreen("dashboard")} onRegister={() => setAppScreen("register")} onBack={() => setAppScreen("dashboard")} />;
  }
  
  if (appScreen === "register") {
    return <Register onRegister={() => setAppScreen("dashboard")} onLogin={() => setAppScreen("login")} onBack={() => setAppScreen("dashboard")} />;
  }

  const renderContent = () => {
    switch (activeNav) {
      case "Home": 
        return <Dashboard onNavigate={handleNavigation} />;
      case "My Farm": 
        return <MyFarm onNavigate={handleNavigation} />;
      case "Crop Management": 
        return <CropManagement onBack={() => setActiveNav("Home")} />;
      case "Disease Detection": 
        return <Diagnose onBack={() => setActiveNav("Home")} onBuyProduct={(cropName) => handleNavigation("Organic Products", cropName)} />;
      case "Pest Detection": 
        return <PestDetection onBack={() => setActiveNav("Home")} onBuyProduct={(cropName) => handleNavigation("Organic Products", cropName)} />;
      case "Organic Products": 
        return <Product onBack={() => setActiveNav("Home")} detectedCrop={detectedCrop} />;
      case "Weather & Advisory": 
        return <Weather onBack={() => setActiveNav("Home")} />;
      case "Soil Health": 
        return <SoilHealth onBack={() => setActiveNav("Home")} />;
      case "Farm Calculators": 
        return <Calculators onBack={() => setActiveNav("Home")} />;
      case "Market Prices": 
        return <Market onBack={() => setActiveNav("Home")} />;
      case "Government Schemes": 
        return <Schemes onBack={() => setActiveNav("Home")} />;
      case "AI Assistant": 
        return <AIChat onBack={() => setActiveNav("Home")} />;
      case "Notifications": 
        return <Notifications onBack={() => setActiveNav("Home")} />;
      default: 
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f3]">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 z-50 h-screen w-[270px] bg-white border-r border-gray-200 transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b font-bold text-lg text-emerald-800 flex items-center justify-between">
          <span>CropZora</span>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-70px)] no-scrollbar">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavigation(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeNav === label ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-emerald-50"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content View */}
      <main className="lg:ml-[270px] min-h-screen">
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)} 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-bold text-gray-800 text-base">{activeNav}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveNav("Notifications")}
              className="p-2 hover:bg-emerald-50 rounded-xl relative text-gray-600 transition"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setAppScreen("login")}
              className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-xl transition"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  );
}