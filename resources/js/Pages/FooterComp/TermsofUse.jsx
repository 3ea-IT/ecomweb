// resources/js/Pages/TermsOfUse.jsx

import React from 'react';
import MainLayout from '../../Layouts/MainLayout';


function TermsOfUse() {
  return (
    <MainLayout>
      {/* Banner Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-[url('../images/banner/bnr1.jpg')] bg-fixed bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative h-full flex items-center justify-center text-center">
          <div className="space-y-6">
            <h1 className="font-lobster text-white text-5xl md:text-6xl lg:text-7xl leading-tight">
              Terms of Use
            </h1>
            <nav aria-label="breadcrumb">
              <ul className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <li className="text-gray-300 hover:text-white transition-colors">
                  <a href="/">Home</a>
                </li>
                <li className="text-gray-300">/</li>
                <li className="text-white font-medium">Terms of Use</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10">
            {/* Website Usage Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Your Use of This Website</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of this website <a href="https://pizzaportindia.com/" className="text-blue-600 hover:text-blue-700 underline">https://pizzaportindia.com/</a> is subject to these terms and conditions in addition to the privacy policy contained under a separate tab on our homepage.
              </p>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <p className="text-yellow-800">
                  If you do not accept the Terms and Conditions stated here, we request you to exit this site. The business reserves the right to revise these Terms and Conditions at any time by updating this posting.
                </p>
              </div>
            </div>

            {/* Menu Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Menu</h2>
              <div className="space-y-4">
                {[
                  'The menu is designed as per the availability of the menu items in the restaurant.',
                  'All product images are for illustration purposes only; actual products may vary.',
                  'Company products are for immediate consumption.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-6 rounded-xl space-y-4">
                  <h3 className="text-xl font-semibold text-blue-900">Delivery Information</h3>
                  <div className="space-y-3">
                    <p className="text-blue-800">Delivery orders are subject to:</p>
                    <ul className="ml-6 space-y-2">
                      <li className="flex items-start space-x-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-blue-800">Your address falling in the defined delivery area nearest to the restaurant.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-blue-800">In case the delivery locality is not listed in the restaurant locator, delivery charges cannot be placed; however, you can opt for the takeaway option.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Offers Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Terms and Conditions for All Exclusive Offers</h2>
              <div className="bg-green-50 p-6 rounded-xl space-y-4">
                <ul className="space-y-3">
                  {[
                    'Only one offer is valid per order.',
                    'All listed prices are exclusive of taxes.',
                    'By accepting to avail the offer, it is deemed that the user has agreed to all the terms and conditions of the offer.'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-green-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Liability Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Liability</h2>
              <div className="bg-red-50 p-6 rounded-xl">
                <p className="text-red-800 leading-relaxed">
                  Users agree that neither the company nor its group companies, directors, officers, or employees shall be liable for any direct and/or indirect and/or incidental and/or special and/or consequential and/or exemplary damages, resulting from the use or inability to use the service.
                </p>
              </div>
            </div>

            {/* Shipment Policy Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Shipment Policy</h2>
              <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                <p className="text-purple-900 font-medium">Read carefully to know how we work and keep a check on our deliverables:</p>
                <ul className="space-y-3">
                  {[
                    'Our delivery staff will inspect the physical condition of the food package.',
                    'The food packages are sealed at the restaurant with tamper-proof tapes.',
                    'Our delivery staff will not open sealed packages.',
                    'Delivery charges will be clearly mentioned at checkout.',
                    'The given address should be within the restaurant\'s delivery area.',
                    'Delivery timings may vary due to conditions.',
                    'You may call the restaurant to trace your order status.'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      <span className="text-purple-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default TermsOfUse;