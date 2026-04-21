import React from "react";
import { Route, Routes } from "react-router-dom";

import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import BrowserView from "./BrowserView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/browser-view" element={<BrowserView />} />
    </Routes>
  );
}
