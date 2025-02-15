import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import {
    Calendar,
    Clock,
    Users,
    Phone,
    Mail,
    Gift,
    CheckCircle,
    X,
    PartyPopper,
} from "lucide-react";

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <PartyPopper className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Reservation Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for choosing Pizzaport. We'll send you a
                        confirmation email shortly.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ReservationsPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        special_requests: "",
        occasion: "",
    });
    const [reservationType, setReservationType] = useState('table');
    const [showModal, setShowModal] = useState(false);

    // Function to generate time slots
    const generateTimeSlots = () => {
        const slots = [];
        let currentTime = new Date();
        currentTime.setHours(11, 0, 0); // Start at 11:00 AM

        while (currentTime.getHours() < 23 || (currentTime.getHours() === 23 && currentTime.getMinutes() === 0)) {
            const timeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            slots.push(timeString);
            currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by 30 minutes
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/reservations", {
            onSuccess: () => {
                reset();
                setShowModal(true);
            },
        });
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Parallax Effect */}
                <div className="relative h-[60vh] bg-[url('/assets/images/extras/reservation-bg.png')] bg-fixed bg-cover bg-center mt-20">
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white space-y-6">
                            <h1 className="font-lobster text-6xl md:text-7xl mb-4">
                                Reserve Your Table
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto px-4">
                                Create memorable moments at Pizzaport & Cafe
                            </p>
                        </div>
                    </div>
                </div>
                <SuccessModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
                {/* Video Showcase Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Video Container with Phone Frame - Responsive */}
                            <div className="relative w-full max-w-[280px] mx-auto sm:max-w-[320px] aspect-[9/18]">
                                <div className="absolute inset-0 bg-black rounded-[2.7rem] border-8 border-gray-800 shadow-2xl">
                                    {/* Phone Notch */}
                                    <div className="absolute top-0 w-full h-6 bg-gray-800 rounded-t-2xl z-20">
                                        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-600 rounded-full"></div>
                                    </div>
                                    {/* Video */}
                                    <video
                                        className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source
                                            src="/assets/videos/birthday-celebration.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-6 text-center md:text-left">
                                <h2 className="text-3xl sm:text-4xl font-semibold">
                                    Celebrate Special Moments
                                </h2>
                                <p className="text-gray-600 text-base sm:text-lg">
                                    From intimate dinners to grand celebrations,
                                    make every moment memorable at Pizzaport.
                                    Our dedicated team ensures your special
                                    occasions are celebrated in style.
                                </p>
                                <div className="flex flex-wrap gap-3 justify-left md:justify-start">
                                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-base">
                                        Birthday Parties
                                    </span>
                                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-base">
                                        Anniversaries
                                    </span>
                                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-base">
                                        Corporate Events
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Cards with Hover Effects */}
                <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[{ icon: Phone, title: "Contact Us", content: ["+91 9839334430", "05224238357", "order@pizzaportindia.com"] },
                        { icon: Clock, title: "Opening Hours", content: ["Mon-Sun: 11:00 AM - 12:00 PM"] },
                        { icon: Users, title: "Capacity", content: ["Groups up to 30 people"] }]
                        .map((card, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <card.icon className="w-10 h-10 text-red-600 mb-6" />
                                <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                                {card.content.map((line, i) => (
                                    <p key={i} className="text-gray-600">{line}</p>
                                ))}
                            </div>
                        ))}
                </div>

                <div className="max-w-6xl mx-auto mt-16">
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Make a Reservation</h2>
        
        {/* Reservation Type Toggle */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setReservationType('table')}
            className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 w-64
              ${reservationType === 'table'
                ? 'bg-red-600 text-white shadow-lg hover:bg-red-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Book a Table
          </button>

          <button
            onClick={() => setReservationType('party')}
            className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 w-64
              ${reservationType === 'party'
                ? 'bg-red-600 text-white shadow-lg hover:bg-red-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Plan an Event
          </button>
        </div>

        {/* Reservation Type Description */}
        <div className="text-center mb-12">
          {reservationType === 'table' ? (
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800">Regular Table Booking</p>
              <p className="text-gray-600">Perfect for groups up to 8 people</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800">Party & Event Planning</p>
              <p className="text-gray-600">Ideal for large groups and special occasions</p>
            </div>
          )}
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                )}
              </div>
            </div>
            {/* Reservation Details */}
            <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                {errors.date && (
                    <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                )}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                <input
                    type="number"
                    value={data.duration}
                    onChange={(e) => setData({ ...data, duration: e.target.value })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter duration in hours"
                />
                {errors.duration && (
                    <div className="text-red-500 text-sm mt-1">{errors.duration}</div>
                )}
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                    value={data.time}
                    onChange={(e) => setData({ ...data, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                {errors.time && (
                    <div className="text-red-500 text-sm mt-1">{errors.time}</div>
                )}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <input
                    type="number"
                    value={data.guests}
                    onChange={(e) => setData({ ...data, guests: e.target.value })}
                    min="1"
                    max="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-left"
                    placeholder="Number of guests"
                />
                {errors.guests && (
                    <div className="text-red-500 text-sm mt-1">{errors.guests}</div>
                )}
                </div>
            </div>
            </div>
            </div>

          {/* Party-specific Fields */}
          {reservationType === 'party' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occasion (Optional)</label>
                <select
                  value={data.occasion}
                  onChange={(e) => setData({ ...data, occasion: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catering Required</label>
                <select
                  value={data.catering}
                  onChange={(e) => setData({ ...data, catering: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {data.catering === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catering Address</label>
                  <textarea
                    value={data.catering_address}
                    onChange={(e) => setData({ ...data, catering_address: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter the catering address"
                  ></textarea>
                </div>
              )}
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
            <textarea
              value={data.special_requests}
              onChange={(e) => setData({ ...data, special_requests: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Any special requests or dietary requirements?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={processing}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {processing ? "Submitting..." : "Reserve Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
                {/* Policy Section */}
                <div className="mt-16 bg-white rounded-3xl p-12 shadow-lg">
                    <h3 className="text-3xl font-semibold mb-8 text-center">Reservation Policy</h3>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-2xl font-semibold mb-4">What to Know</h4>
                            <ul className="space-y-4">
                                {[
                                    "Reservations are held for 15 minutes past the booking time",
                                    "We require a minimum of 2 hours notice for cancellations",
                                    "Special arrangements can be made for large groups",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-2xl font-semibold mb-4">Special Events</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Planning a special celebration? Our events team can help create the perfect experience. Contact us directly for private dining and event inquiries.
                            </p>
                            <button
                                onClick={() => (window.location.href = "mailto:order@pizzaportindia.com")}
                                className="px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                            >
                                Contact Event Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ReservationsPage;