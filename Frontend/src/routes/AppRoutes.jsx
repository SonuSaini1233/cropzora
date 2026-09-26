import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Diagnose from "../pages/Diagnose";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Disease Detection */}
        <Route path="/diagnose" element={<Diagnose />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;