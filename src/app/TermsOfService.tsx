import React from "react";
import BreadcrumbHeader from "./BreadcrumbHeader";

export default function TermsOfService() {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#fff", color: "#181818" }}>
      <BreadcrumbHeader pageTitle="Terms of Service" />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h2 style={{ color: "#2A2A91", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Last Updated: April 2026</h2>
        <section><h2>1. Agreement to Terms</h2><p>By using nēro, you agree to these Terms of Service. If you do not agree, you must not use the service.</p></section>
        <section><h2>2. Description of Service</h2><p>nēro provides tools to track spending, analyze financial activity, and support budgeting decisions.<br/>nēro does not provide financial, legal, or investment advice.</p></section>
        <section><h2>3. Eligibility</h2><ul><li>Be at least 18 years old</li><li>Provide accurate and complete information</li><li>Use the service in compliance with applicable laws</li></ul></section>
        <section><h2>4. Account Responsibilities</h2><ul><li>Maintaining the confidentiality of your account</li><li>All activities under your account</li><li>Keeping your information accurate</li></ul></section>
        <section><h2>5. Acceptable Use</h2><ul><li>Use the service for lawful purposes only</li><li>Do not interfere with or disrupt the platform</li><li>Do not attempt unauthorized access to systems or data</li><li>Do not reverse engineer or exploit the service</li></ul></section>
        <section><h2>6. Financial Disclaimer</h2><p>nēro provides insights based on available data. We do not guarantee:</p><ul><li>Accuracy of financial calculations</li><li>Completeness of transaction data</li><li>Financial outcomes</li></ul><p>You remain fully responsible for your financial decisions.</p></section>
        <section><h2>7. Third-Party Services</h2><p>The service may depend on third-party systems. We are not responsible for their performance or availability.</p></section>
        <section><h2>8. Intellectual Property</h2><p>All content, trademarks, and software are owned by nēro ltd. Unauthorized use is prohibited.</p></section>
        <section><h2>9. Termination</h2><p>We may suspend or terminate your account if:</p><ul><li>You violate these Terms</li><li>Required by law</li><li>Necessary to protect the platform</li></ul><p>You may stop using the service at any time.</p></section>
        <section><h2>10. Limitation of Liability</h2><p>To the fullest extent permitted by law, nēro is not liable for:</p><ul><li>Financial loss</li><li>Data inaccuracies</li><li>Service interruptions</li><li>Indirect or consequential damages</li></ul></section>
        <section><h2>11. Indemnity</h2><p>You agree to indemnify nēro against claims arising from:</p><ul><li>Your misuse of the service</li><li>Breach of these Terms</li></ul></section>
        <section><h2>12. Governing Law</h2><p>These Terms are governed by the laws of:</p><ul><li>The Federal Republic of Nigeria</li><li>Where applicable, UK law for international operations</li></ul></section>
        <section><h2>13. Changes to Terms</h2><p>We may update these Terms at any time. Continued use of the service means you accept the updated Terms.</p></section>
        <section><h2>14. Contact</h2><p>Email: <a href="mailto:support@neroapp.co">support@neroapp.co</a></p></section>
      </div>
    </div>
  );
}
