import React from "react";

const Contact = () => (
  <div className="w-full flex justify-center py-12">
    <div className="max-w-xl w-full p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p>
        If you have questions, need assistance, or want to report an issue with the MUST Lost & Found platform, please reach out to us:
      </p>
      <ul className="mt-4 text-gray-700">
        <li><strong>Email:</strong> lostfound@must.ac.tz</li>
        <li><strong>Phone:</strong> +255 123 456 789</li>
        <li><strong>Office:</strong> Student Affairs Office, Mbeya University of Science and Technology</li>
      </ul>
      <p className="mt-4">
        We aim to respond to all inquiries within 2 business days. For urgent lost or found items, please visit the Student Affairs Office directly.
      </p>
    </div>
  </div>
);

export default Contact;
