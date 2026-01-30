import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to Clinic App, your trusted platform for managing healthcare appointments with ease.
        Our mission is to simplify the process of booking doctor appointments,
        making quality healthcare accessible to everyone.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        We connect patients with a network of verified medical professionals,
        offering a seamless and secure experience for all your medical needs.
        From scheduling to managing your medical records, we are committed to providing
        a comprehensive and user-friendly service.
      </p>
      <p className="text-lg text-gray-700">
        Our team is dedicated to innovating and improving the healthcare experience,
        ensuring that you receive the best possible care with minimal hassle.
      </p>
    </div>
  );
}