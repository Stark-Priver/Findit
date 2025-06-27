import React from "react";

const TermsOfService = () => (
  <div className="w-full flex justify-center py-12">
    <div className="max-w-xl w-full p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p>Welcome to the MUST Lost & Found platform. By using this service, you agree to the following terms:</p>
      <ul className="list-disc pl-6 mt-4 text-gray-700">
        <li>This platform is intended for use by the Mbeya University of Science and Technology (MUST) community only.</li>
        <li>All information provided must be accurate and truthful. False reports may result in suspension of access.</li>
        <li>Do not post inappropriate, offensive, or unrelated content.</li>
        <li>Personal information shared through this platform should be limited to what is necessary for item recovery.</li>
        <li>The university is not responsible for the loss, theft, or damage of personal property.</li>
        <li>Use this service responsibly and respect the privacy of others.</li>
      </ul>
      <p className="mt-4">Violation of these terms may result in removal of your posts or suspension of your account.</p>
    </div>
  </div>
);

export default TermsOfService;
