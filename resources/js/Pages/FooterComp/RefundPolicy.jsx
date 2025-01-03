import React from 'react';
import MainLayout from '../../Layouts/MainLayout';

function RefundPolicy() {
  return (
    <MainLayout>
      {/* Banner Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-[url('../images/banner/bnr1.jpg')] bg-fixed bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative h-full flex items-center justify-center text-center">
          <div className="space-y-6">
            <h1 className="font-lobster text-white text-5xl md:text-6xl lg:text-7xl leading-tight">
              Refund & Cancellation Policy
            </h1>
            <nav aria-label="breadcrumb">
              <ul className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <li className="text-gray-300 hover:text-white transition-colors">
                  <a href="/">Home</a>
                </li>
                <li className="text-gray-300">/</li>
                <li className="text-white font-medium">Refund Policy</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10">
            
            {/* Refund Policy Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Refund Policy</h2>
              <div className="bg-blue-50 p-6 rounded-xl space-y-4">
                <div className="space-y-4">
                  {[
                    'Refund is valid for orders placed from the official Pizza Port & Cafe website only.',
                    'In case of payments made through UPI, Net Banking portals or wallets, are all subject to be provided a refund in the same account.',
                    'After a refund is initiated from the company\'s account, it takes 5-7 working days to get the amount back in your account.',
                    'In case of cash payments, refund will be initiated in the provided account details by the customer within 5-7 working days.',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      <p className="text-blue-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cancellation Policy Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Cancellation Policy</h2>
              <div className="bg-purple-50 p-6 rounded-xl space-y-6">
                {/* Main Policy Statement */}
                <div className="flex items-start space-x-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                  <p className="text-purple-800">
                    This policy is only valid for the order placed through the Pizza Port & Cafe official website
                  </p>
                </div>

                {/* Discrepancies Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-900">Order Discrepancies</h3>
                  <div className="ml-4">
                    <p className="text-purple-800 mb-3">
                      Any discrepancies in the order placed and received by the customer could be termed as cancelled provided:
                    </p>
                    <div className="ml-4">
                      <div className="flex items-start space-x-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <p className="text-purple-800">
                          The discrepancy is defined by any of the conditions where the item ordered is exchanged, damaged, stale or not edible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund Conditions Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-900">Refund Conditions</h3>
                  <div className="ml-4">
                    <p className="text-purple-800 mb-3">
                      Any such cancellation is a subject to refund provided the following condition:
                    </p>
                    <div className="ml-4">
                      <div className="flex items-start space-x-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <p className="text-purple-800">
                          The query is raised within 30 minutes of the order being delivered.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-yellow-800">
                  Please ensure to check your order immediately upon delivery and contact our customer support within the specified timeframe for any issues.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default RefundPolicy;