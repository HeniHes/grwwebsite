import React, { useState, useEffect } from "react";
import { useLocale } from "../contexts/LocaleContext.js";
import translations from "../locales/translations.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import supabase from "../supabase/supabase";
import {
  FaLinkedin,
  FaIdCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Meet() {
  const { locale } = useLocale();
  const t = translations[locale].meet;
  
  // State for storing events from Supabase
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from Supabase
  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        console.log("Fetched events:", data);
        setEvents(data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  useEffect(() => {
    // This will run on component mount and handle the Calendly integration
    const handleCalendlyButtons = () => {
      if (typeof window !== "undefined" && window.Calendly) {
        const button = document.getElementById("book-meeting-id");

        if (button) {
          button.addEventListener("click", function () {
            window.Calendly.showPopupWidget(
              "https://calendly.com/grwdevelopment/30min"
            );
          });
        }
      }
    };

    // Try to initialize immediately if Calendly is already loaded
    handleCalendlyButtons();

    // Also set up a delayed check in case Calendly loads after this component
    const timer = setTimeout(handleCalendlyButtons, 1000);

    return () => {
      clearTimeout(timer);
      // Clean up event listeners
      const button = document.getElementById("book-meeting-id");

      if (button) {
        button.removeEventListener("click", null);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Meet Us | GRW Development</title>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div className="bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden">
          <Image
            src="/images/meet-us.jpg"
            alt="Meet our team"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(0,35,163,0.5)] z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20">
            <span className="text-sm uppercase tracking-wider text-[#ff3b31] font-semibold mb-4">
              {t.hero.label}
            </span>
            <h1 className="text-6xl font-bold text-center leading-tight max-w-4xl">
              {t.hero.title}
            </h1>
          </div>
        </section>

        {/* CEO Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* CEO Info */}
              <div className="w-full lg:w-3/5">
                <h3 className="text-3xl font-bold text-[#ff3b31] mb-6">
                  {t.ceo.name}
                </h3>
                <div className="text-lg text-gray-700 space-y-4 mb-8">
                  {t.ceo.bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <button
                  id="book-meeting-id"
                  className="px-8 py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition"
                >
                  {t.ceo.bookMeeting}
                </button>
              </div>

              {/* CEO Image and Contact */}
              <div className="w-full lg:w-2/5">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="relative h-96 w-full mb-6">
                    <Image
                      src="/images/roumy.jpeg"
                      alt="Roumy Ganaoui"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-[#ff3b31]" size={20} />
                      <a
                        href="mailto:roumy.g@grwdevelop.com"
                        className="text-gray-700 hover:text-[#0023a3] transition"
                      >
                        {t.ceo.contact.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaLinkedin className="text-[#ff3b31]" size={20} />
                      <a
                        href="https://www.linkedin.com/in/roumy-ganaoui-m-sc-eng-17764093/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#0023a3] transition"
                      >
                        {t.ceo.contact.linkedin}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaIdCard className="text-[#ff3b31]" size={20} />
                      <a
                        href="https://www.grwdevelop.com/info"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#0023a3] transition"
                      >
                        {t.ceo.contact.businessCard}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#ff3b31] font-semibold text-lg uppercase mb-2">
                {t.events.label}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t.events.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.events.description}
              </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading events...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center">
                  {error}
                </div>
              ) : events.length === 0 ? (
                <div className="bg-gray-100 px-4 py-10 rounded-md text-center">
                  <p className="text-gray-500">No upcoming events at this time. Check back later!</p>
                </div>
              ) : (
                events.map((event) => (
                  <a
                    key={event.id}
                    href={event.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Event Logo */}
                      <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
                        <div className="relative h-40 w-full">
                          {event.logosrc ? (
                            <img
                              src={event.logosrc}
                              alt={event.name}
                              className="object-contain w-full h-full"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-md">
                              <span className="text-gray-500 text-sm">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="w-full md:w-2/3 p-6">
                        <h3 className="text-2xl font-bold mb-2">{event.name}</h3>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-2 text-[#ff3b31]" />
                            <span>{event.date}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-[#ff3b31]" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-600">{event.description}</p>
                        
                        {event.url && (
                          <div className="mt-4">
                            <span className="inline-block text-blue-600 hover:underline">
                              Visit event website ↗
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-20 px-4 md:px-8">
          <ContactForm />
        </section>

        {/* Join Us Section */}
        <section className="py-20 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-2">{t.join.title}</h2>
                <p className="text-xl text-gray-600">{t.join.subtitle}</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    {t.join.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    {t.join.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    {t.join.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition"
                  >
                    {t.join.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}