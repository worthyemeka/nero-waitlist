import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}
