// src/components/PrivacyPolicy.jsx

import React from 'react';
import MainLayout from '../../Layouts/MainLayout';

function PrivacyPolicy() {
  return (
    <MainLayout>
      {/* Banner Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-[url('../images/banner/bnr1.jpg')] bg-fixed bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative h-full flex items-center justify-center text-center">
          <div className="space-y-6">
            <h1 className="font-lobster text-white text-5xl md:text-6xl lg:text-7xl leading-tight">
              Privacy Policy
            </h1>
            <nav aria-label="breadcrumb">
              <ul className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <li className="text-gray-300 hover:text-white transition-colors">
                  <a href="/">Home</a>
                </li>
                <li className="text-gray-300">/</li>
                <li className="text-white font-medium">Privacy Policy</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Welcome to PIZZA PORT
              </h2>
              <p className="text-lg text-gray-600">
                We value your privacy and trust
              </p>
            </div>

            <div className="space-y-8">
              {/* Owner Information */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  This site is owned by 3EA and this privacy policy is designed to tell you about our practices regarding collection, use, and disclosure of information that you may provide via this site.
                </p>
                <p className="font-medium text-gray-800">
                  Please be sure to properly read this entire Privacy Policy before submitting information to this site.
                </p>
              </div>

              {/* Consent Section */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Consent</h3>
                <p className="text-blue-800">
                  By using this site, you agree to the terms and conditions of the Privacy Policy. Wherever you submit information you consent to the collection, use, and disclosure of the information in accordance with this privacy policy.
                </p>
              </div>

              {/* Information Collection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Information Collected</h3>
                <p className="text-gray-600 mb-4">
                  Pizza Port may collect personal information from you including your first and last name, address, telephone and mobile numbers, email address, credit card details, and any other relevant information. This will generally happen when:
                </p>
                <ul className="space-y-2 ml-6">
                  {[
                    'Visit online ordering site to place an order',
                    'Participate in a survey',
                    'Enter into a competition or a promotion',
                    'Submit website feedback'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use and Disclosure */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Use and Disclosure</h3>
                <ul className="space-y-3">
                  {[
                    'To process any order online',
                    'To conduct market research',
                    'To send you newsletters and different promotional documents',
                    'To keep you updated about changes to our websites'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Section */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Access, Accuracy and Security</h3>
                <p className="text-green-800">
                  Pizza Port will take all the necessary steps to ensure that the personal information collected is accurate, complete, and up-to-date. Pizza Port will take all the important steps to protect personal information from misuse, loss, and unauthorized access, modification, and disclosure.
                </p>
              </div>

              {/* Changes Section */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Changes</h3>
                <p className="text-gray-600">
                  If this privacy policy is changed, the revised and updated policy will be posted on this site. You can please check back personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default PrivacyPolicy;