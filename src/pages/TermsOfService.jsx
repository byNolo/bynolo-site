import React from "react";


const TermsOfService = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-2 flex items-center justify-center">
    <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 backdrop-blur-md">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight text-center drop-shadow-sm">Terms of Service</h1>
      <p className="mb-6 text-sm text-gray-500 text-center">Last updated: August 17, 2025</p>
      <Section title="Acceptance of Terms">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.</p>
      </Section>
      <Section title="Use of the Site">
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>You agree to use the site only for lawful purposes.</li>
          <li>You may not use the site to harm, harass, or infringe on the rights of others.</li>
        </ul>
      </Section>
      <Section title="Intellectual Property">
        <p className="text-gray-700 dark:text-gray-300">All content on this site is the property of the site owner or its licensors and is protected by copyright laws.</p>
      </Section>
      <Section title="Disclaimer">
        <p className="text-gray-700 dark:text-gray-300">The site is provided "as is" without warranties of any kind. We do not guarantee the accuracy or completeness of any information on the site.</p>
      </Section>
      <Section title="Limitation of Liability">
        <p className="text-gray-700 dark:text-gray-300">We are not liable for any damages arising from your use of the site.</p>
      </Section>
      <Section title="Changes to Terms">
        <p className="text-gray-700 dark:text-gray-300">We may update these Terms of Service at any time. Continued use of the site constitutes acceptance of the new terms.</p>
      </Section>
      <Section title="Contact Us">
        <p className="text-gray-700 dark:text-gray-300">If you have any questions about these Terms of Service, please contact us through the information provided on our website.</p>
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

export default TermsOfService;
