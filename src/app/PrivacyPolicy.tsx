
import BreadcrumbHeader from "./BreadcrumbHeader";

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#fff", color: "#181818" }}>
      <BreadcrumbHeader pageTitle="Privacy Policy" />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h2 style={{ color: "#2A2A91", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Last Updated: April 2026</h2>
        <section><h2>1. Who We Are</h2><p>nēro is a product of nēro ltd (“nēro”, “we”, “our”, “us”). We provide a financial tracking application that helps users understand and manage their spending.<br/>If you have questions about this policy, contact: <a href="mailto:support@neroapp.co">support@neroapp.co</a></p></section>
        <section><h2>2. Scope</h2><ul><li>The nēro mobile application</li><li>The nēro website</li><li>Any related services</li></ul></section>
        <section><h2>3. Information We Collect</h2><h3>3.1 Information You Provide</h3><ul><li>Full name</li><li>Email address</li><li>Phone number</li><li>Account details</li></ul><h3>3.2 Financial and Transaction Data</h3><p>With your explicit consent, we process:</p><ul><li>Bank alert messages (SMS or email)</li><li>Transaction data such as amount, date, and merchant (where available)</li></ul><p>nēro does not:</p><ul><li>Access your bank account directly</li><li>Store your banking login credentials</li></ul><h3>3.3 Device and Technical Data</h3><ul><li>IP address</li><li>Device type and operating system</li><li>App usage data</li><li>Log files and diagnostics</li></ul></section>
        <section><h2>4. How We Use Your Data</h2><ul><li>Provide core app functionality (spending tracking and insights)</li><li>Personalize your experience</li><li>Improve and develop our services</li><li>Communicate important updates</li><li>Detect and prevent fraud</li></ul></section>
        <section><h2>5. Legal Basis (GDPR Compliance)</h2><ul><li>Consent (for transaction parsing and notifications)</li><li>Contractual necessity (to provide the service)</li><li>Legal obligations</li><li>Legitimate interests (product improvement and security)</li></ul></section>
        <section><h2>6. Data Sharing</h2><p>We do not sell your personal data.<br/>We may share data with:</p><ul><li>Trusted service providers (hosting, analytics, communications)</li><li>Regulatory authorities where required by law</li></ul><p>All partners are contractually obligated to safeguard your data.</p></section>
        <section><h2>7. International Data Transfers</h2><p>Your data may be processed outside your country of residence. Where this occurs, we ensure appropriate safeguards are in place in line with GDPR requirements.</p></section>
        <section><h2>8. Data Retention</h2><p>We retain personal data only as long as necessary to:</p><ul><li>Provide our services</li><li>Meet legal obligations</li><li>Resolve disputes</li></ul><p>You may request deletion of your data at any time.</p></section>
        <section><h2>9. Your Rights (GDPR & UK GDPR)</h2><ul><li>Access your personal data</li><li>Correct inaccurate data</li><li>Request deletion (“right to be forgotten”)</li><li>Restrict or object to processing</li><li>Withdraw consent at any time</li><li>Request data portability</li></ul><p>To exercise these rights, contact: <a href="mailto:support@neroapp.co">support@neroapp.co</a></p></section>
        <section><h2>10. Data Security</h2><ul><li>Encryption</li><li>Secure infrastructure</li><li>Access controls</li></ul><p>No system is completely secure, but we take reasonable steps to protect your data.</p></section>
        <section><h2>11. Children’s Privacy</h2><p>nēro is not intended for individuals under 18. We do not knowingly collect personal data from minors.</p></section>
        <section><h2>12. Third-Party Services</h2><p>nēro may integrate with third-party services (e.g., email providers, SMS processing tools). Their use is governed by their respective privacy policies.</p></section>
        <section><h2>13. Changes to This Policy</h2><p>We may update this Privacy Policy periodically. Changes will be reflected by the updated date above.</p></section>
        <section><h2>14. Contact</h2><p>Email: <a href="mailto:support@neroapp.co">support@neroapp.co</a></p></section>
      </div>
    </div>
  );
}
