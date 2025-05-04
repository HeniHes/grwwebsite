import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import {
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaGlobe,
  FaLinkedin,
  FaInstagram,
  FaWeixin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Info() {
  useEffect(() => {
    // Handle Calendly integration
    const handleCalendlyButton = () => {
      if (typeof window !== "undefined" && window.Calendly) {
        // Match all possible button IDs to ensure one works
        const buttonIds = [
          "book-meeting-button",
          "book-meeting-id",
          "book-meeting-2",
        ];

        buttonIds.forEach((id) => {
          const button = document.getElementById(id);
          if (button) {
            button.addEventListener("click", function () {
              window.Calendly.showPopupWidget(
                "https://calendly.com/grwdevelopment/30min"
              );
            });
            console.log(`Added event listener to button with ID: ${id}`);
          }
        });
      }
    };

    // Initialize Calendly button
    handleCalendlyButton();

    // Set a timeout as fallback in case Calendly loads after this component
    const timer = setTimeout(handleCalendlyButton, 1000);

    // Try again after a longer delay in case the first attempts fail
    const secondTimer = setTimeout(handleCalendlyButton, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);

      // Clean up event listeners for all possible button IDs
      const buttonIds = [
        "book-meeting-button",
        "book-meeting-id",
        "book-meeting-2",
      ];

      buttonIds.forEach((id) => {
        const button = document.getElementById(id);
        if (button) {
          // Using a no-op function for cleanup as the original had null
          button.removeEventListener("click", function () {});
        }
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Roumy Ganaoui | GRW Development</title>
        <meta
          name="description"
          content="Digital Business Card - Roumy Ganaoui, CEO & Founder of GRW Development Inc."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>

      {/* Load Calendly scripts */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="beforeInteractive"
      />

      {/* Main container with background image */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
        style={{
          backgroundImage: "url('/images/card-bgg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Card container with shadow and animation */}
        <div className="w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,35,163,0.15)] overflow-hidden transform transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,35,163,0.2)] relative">
          {/* Cover image area */}
          <div className="relative h-52 bg-gradient-to-r from-blue-700 to-blue-900 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)] z-10"></div>

            <Image
              src="/images/coverrrr.jpg"
              alt="Cover"
              layout="fill"
              objectFit="cover"
              className="z-0"
              priority
            />

            {/* Logo overlay on cover image */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <Image
                src="/images/grwlogo.png"
                alt="GRW Development Logo"
                width={220}
                height={120}
                objectFit="contain"
              />
            </div>
          </div>

          {/* Profile picture container - separate from the cover and with higher z-index */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[140px] z-50">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
              <Image
                src="/images/roumy.jpeg"
                alt="Roumy Ganaoui"
                width={150}
                height={150}
                objectFit="contain"
                className="scale-125"
              />
            </div>
          </div>

          {/* Info content with background image */}
          <div
            className="pt-20 pb-8 px-8"
            style={{
              backgroundImage: "url('')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Name and title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Roumy Ganaoui, M.Sc.Eng
              </h1>
              <p className="text-gray-600 mt-1">
                CEO & Founder GRW Development Inc
              </p>
            </div>

            {/* Contact buttons */}
            <div className="space-y-4 mb-8">
              {/* Email button */}
              <a
                href="mailto:roumy.g@grwdevelop.com"
                className="flex items-center justify-between bg-white hover:bg-gray-100 text-gray-800 w-full py-3.5 px-5 rounded-full transition-all shadow-sm hover:shadow border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <FaEnvelope className="text-[#ff3b31]" size={18} />
                  </div>
                  <span className="text-gray-700">roumy.g@grwdevelop.com</span>
                </div>
                <div className="bg-gray-200 rounded-full p-1.5">
                  <FaArrowRight className="text-gray-600" size={12} />
                </div>
              </a>

              {/* Phone button */}
              <a
                href="tel:+14373507455"
                className="flex items-center justify-between bg-white hover:bg-gray-100 text-gray-800 w-full py-3.5 px-5 rounded-full transition-all shadow-sm hover:shadow border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <FaPhone className="text-[#ff3b31]" size={18} />
                  </div>
                  <span className="text-gray-700">+1 437-350-7455</span>
                </div>
                <div className="bg-gray-200 rounded-full p-1.5">
                  <FaArrowRight className="text-gray-600" size={12} />
                </div>
              </a>

              {/* Book meeting button - with multiple IDs to match any scenario */}
              <button
                id="book-meeting-id"
                className="flex items-center justify-between w-full py-3.5 px-5 rounded-full transition-all shadow-md hover:shadow-lg bg-[#0023a3] hover:bg-blue-800 text-white"
                onClick={() => {
                  if (typeof window !== "undefined" && window.Calendly) {
                    window.Calendly.showPopupWidget(
                      "https://calendly.com/grwdevelopment/30min"
                    );
                  }
                }}
              >
                <span className="font-medium">Book Meeting</span>
                <div className="bg-blue-800 rounded-full p-1.5">
                  <FaArrowRight className="text-white" size={12} />
                </div>
              </button>

              {/* Download contact button */}
              <a
                href="https://drive.google.com/uc?export=download&id=1Q1OcRmC2HbgnV1z9SUrIaxdZPnvcP1Iy"
                className="flex items-center justify-between w-full py-3.5 px-5 rounded-full transition-all shadow-md hover:shadow-lg bg-green-600 hover:bg-green-700 text-white"
              >
                <span className="font-medium">Download Contact</span>
                <div className="bg-green-700 rounded-full p-1.5">
                  <FaArrowRight className="text-white" size={12} />
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex justify-center space-x-5 mb-8">
              <a
                href="https://www.grwdevelop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#ff3b31] flex items-center justify-center hover:shadow-md transition-all transform hover:-translate-y-1 border border-red-700"
                aria-label="Website"
              >
                <FaGlobe className="text-white" size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/roumy-ganaoui-m-sc-eng-17764093/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-[#0A66C2]" size={20} />
              </a>
              <a
                href="https://www.instagram.com/grw_development/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[#E1306C]" size={20} />
              </a>
              <a
                href="https://twitter.com/Developmen49245"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="text-black" size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                aria-label="WeChat"
              >
                <FaWeixin className="text-[#07C160]" size={20} />
              </a>
            </div>

            {/* Tagline */}
            <div className="text-center mt-8">
              <p className="text-[#0023a3] text-lg font-semibold italic border-t border-b border-blue-200 py-2 px-4 inline-block">
                Your Growth Catalyst!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline script to ensure Calendly works */}
      <Script id="calendly-setup" strategy="afterInteractive">
        {`
          document.addEventListener("DOMContentLoaded", function() {
            if (typeof window !== "undefined" && window.Calendly) {
              const buttonIds = ["book-meeting-button", "book-meeting-id", "book-meeting-2"];
              buttonIds.forEach(id => {
                const button = document.getElementById(id);
                if (button) {
                  button.addEventListener("click", function() {
                    window.Calendly.showPopupWidget("https://calendly.com/grwdevelopment/30min");
                  });
                }
              });
            }
          });
        `}
      </Script>
    </>
  );
}
