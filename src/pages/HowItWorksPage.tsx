import React from 'react';
import HowItWorks from '../components/landing/HowItWorks';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CTA from '../components/landing/CTA';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow">
        <div className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our platform makes it easy to reconnect people with their lost belongings through a secure and transparent process.
            </p>
          </div>
        </div>
        <HowItWorks />
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our lost and found platform.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How do I report a found item?",
                  answer: "Sign in to your account, click on 'Report Item' in the navigation menu, and fill out the form with as much detail as possible about the item you found."
                },
                {
                  question: "How do I claim an item I've lost?",
                  answer: "Browse through the lost and found listings, and when you find an item that might be yours, click on 'Claim This Item'. You'll need to provide proof of ownership to verify your claim."
                },
                {
                  question: "What kind of proof of ownership is required?",
                  answer: "This can include receipts, photos of you with the item, detailed descriptions of unique identifying features, serial numbers, or any other evidence that demonstrates the item belongs to you."
                },
                {
                  question: "Is my personal information kept private?",
                  answer: "Yes, we take privacy seriously. Your contact information is not shared publicly. Only when a claim has been verified will we facilitate communication between the finder and the owner."
                },
                {
                  question: "How do I arrange to get my item back?",
                  answer: "Once your claim has been verified, we'll provide a secure messaging system for you and the finder to arrange a safe meeting place or delivery method."
                },
                {
                  question: "Is there a fee for using this service?",
                  answer: "Our basic service is completely free. We believe in helping people reunite with their lost belongings without charging a fee."
                },
                {
                  question: "What happens if nobody claims an item?",
                  answer: "If an item remains unclaimed for a certain period (typically 30-90 days, depending on local regulations), the finder may be able to claim ownership or donate the item."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;