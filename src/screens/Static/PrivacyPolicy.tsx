import React from "react";

const PrivacyPolicy = () => (
  <div className="w-full flex justify-center py-12">
    <div className="max-w-xl w-full p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>Your privacy is important to us. This policy explains how we handle your information on the MUST Lost & Found platform:</p>
      <ul className="list-disc pl-6 mt-4 text-gray-700">
        <li>We collect only the information necessary to help recover lost and found items (e.g., name, contact details, item descriptions).</li>
        <li>Your information is used solely for the purpose of connecting item owners with finders within the MUST community.</li>
        <li>We do not share your personal information with third parties, except as required by law or for the recovery of lost items.</li>
        <li>All data is stored securely and access is restricted to authorized personnel only.</li>
        <li>You may request the removal of your data from our system at any time by contacting us.</li>
      </ul>
      <p className="mt-4">By using this platform, you consent to the collection and use of your information as described above.</p>
    </div>
  </div>
);

export default PrivacyPolicy;
