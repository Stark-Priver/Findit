import React from "react";

const About = () => (
  <div className="w-full flex justify-center py-12">
    <div className="max-w-xl w-full p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">About MUST Lost & Found</h1>
      <p>
        <strong>MUST Lost & Found</strong> is a dedicated platform for the Mbeya University of Science and Technology (MUST) community to report, search, and claim lost and found items on campus. Our mission is to connect students, staff, and visitors who have lost or found personal belongings, making it easier to reunite items with their rightful owners.
      </p>
      <ul className="list-disc pl-6 mt-4 text-gray-700">
        <li>Report lost or found items quickly and easily.</li>
        <li>Browse a searchable database of found items.</li>
        <li>Contact finders or claim your lost property securely.</li>
        <li>Receive notifications when a match is found.</li>
      </ul>
      <p className="mt-4">
        This service is provided by and for the MUST community. Please use it responsibly and help keep our campus connected and secure.
      </p>
    </div>
  </div>
);

export default About;
