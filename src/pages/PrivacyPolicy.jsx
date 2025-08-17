import React from "react";


const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-2 flex items-center justify-center">
    <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 backdrop-blur-md">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight text-center drop-shadow-sm">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-500 text-center">Last updated: August 17, 2025</p>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
      <Section title="Information We Collect">
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Information you provide directly (such as contact forms)</li>
          <li>Usage data (such as pages visited, browser type, etc.)</li>
        </ul>
      </Section>
      <Section title="How We Use Information">
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>To provide and maintain our service</li>
          <li>To improve our website</li>
          <li>To communicate with you if you contact us</li>
        </ul>
      </Section>
      <Section title="Cookies">
        <p className="text-gray-700 dark:text-gray-300">We may use cookies to enhance your experience. You can disable cookies in your browser settings.</p>
      </Section>
      <Section title="Third-Party Services">
        <p className="text-gray-700 dark:text-gray-300">We may use third-party services (such as analytics) that collect, monitor, and analyze usage data.</p>
      </Section>
      <Section title="Your Rights">
        <p className="text-gray-700 dark:text-gray-300">You may request to access, update, or delete your personal information by contacting us.</p>
      </Section>
      <Section title="Contact Us">
        <p className="text-gray-700 dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us through the information provided on our website.</p>
      </Section>
    </div>
  </div>
);

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">{title}</h2>
      {children}
    </section>
  );
}

export default PrivacyPolicy;
