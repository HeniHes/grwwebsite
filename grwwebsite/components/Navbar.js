import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "../contexts/LocaleContext";
import { Menu, X } from "lucide-react";
import Head from "next/head";
import Script from "next/script";

export default function Navbar() {
  const { locale, toggle } = useLocale();
  const [open, setOpen] = useState(false);

  const labels = {
    en: {
      home: "Home",
      services: "Services",
      meet: "Meet us",
      book: "Book Meeting",
    },
    fr: {
      home: "Accueil",
      services: "Nos services",
      meet: "Rencontrez-nous",
      book: "Planifier une rencontre",
    },
  };
  const L = labels[locale];

  // Initialize Calendly when the component mounts
  useEffect(() => {
    const initializeCalendly = () => {
      if (typeof window !== "undefined" && window.Calendly) {
        // Desktop button
        const desktopButton = document.getElementById("navbar-book-meeting-desktop");
        if (desktopButton) {
          desktopButton.addEventListener("click", function() {
            window.Calendly.showPopupWidget("https://calendly.com/grwdevelopment/30min");
          });
        }
        
        // Mobile button
        const mobileButton = document.getElementById("navbar-book-meeting-mobile");
        if (mobileButton) {
          mobileButton.addEventListener("click", function() {
            window.Calendly.showPopupWidget("https://calendly.com/grwdevelopment/30min");
          });
        }
      }
    };

    // Try to initialize immediately
    initializeCalendly();
    
    // Also set a timeout to try again after Calendly script might have loaded
    const timer = setTimeout(initializeCalendly, 1000);
    
    return () => {
      clearTimeout(timer);
      
      // Clean up event listeners
      const desktopButton = document.getElementById("navbar-book-meeting-desktop");
      if (desktopButton) {
        desktopButton.removeEventListener("click", null);
      }
      
      const mobileButton = document.getElementById("navbar-book-meeting-mobile");
      if (mobileButton) {
        mobileButton.removeEventListener("click", null);
      }
    };
  }, []);

  // Function to handle calendar popup
  const handleCalendlyPopup = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.showPopupWidget("https://calendly.com/grwdevelopment/30min");
    }
  };

  return (
    <>
      {/* Add Calendly scripts in Head */}
      <Head>
        <link 
          href="https://assets.calendly.com/assets/external/widget.css" 
          rel="stylesheet" 
        />
      </Head>
      
      {/* Add Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="beforeInteractive"
      />
      
      <nav className="absolute top-0 w-full py-5 px-10 flex justify-between items-center text-white z-30">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/grwlogo.png" width={260} height={80} alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 text-xl font-medium">
          <li><Link href="/">{L.home}</Link></li>
          <li><Link href="/services">{L.services}</Link></li>
          <li><Link href="/meet-us">{L.meet}</Link></li>
          <li>
            <button 
              id="navbar-book-meeting-desktop"
              className="px-6 py-2 bg-[#ff3b31] rounded-lg text-white font-semibold hover:bg-[#e52e26] transition"
              onClick={handleCalendlyPopup}
            >
              {L.book}
            </button>
          </li>
          <li className="flex items-center space-x-1 bg-white/20 rounded-lg overflow-hidden">
            <button
              onClick={() => locale !== "en" && toggle()}
              className={`px-3 py-2 text-lg font-semibold transition ${
                locale === "en"
                  ? "bg-[#ff3b31]/30 text-white"
                  : "text-white hover:bg-white/30"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => locale !== "fr" && toggle()}
              className={`px-3 py-2 text-lg font-semibold transition ${
                locale === "fr"
                  ? "bg-[#ff3b31]/30 text-white"
                  : "text-white hover:bg-white/30"
              }`}
            >
              FR
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-[#0023a3]/90 backdrop-blur-md rounded-lg shadow-lg md:hidden">
            <ul className="flex flex-col p-4 space-y-4 text-white text-lg font-medium">
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  {L.home}
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setOpen(false)}>
                  {L.services}
                </Link>
              </li>
              <li>
                <Link href="/meet-us" onClick={() => setOpen(false)}>
                  {L.meet}
                </Link>
              </li>
              <li>
                <button
                  id="navbar-book-meeting-mobile"
                  onClick={(e) => {
                    handleCalendlyPopup(e);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-[#ff3b31] rounded-lg font-semibold"
                >
                  {L.book}
                </button>
              </li>
              <li className="flex space-x-2">
                <button
                  onClick={() => { locale !== "en" && toggle(); }}
                  className={`flex-1 text-center py-2 rounded-lg font-semibold transition ${
                    locale === "en"
                      ? "bg-[#ff3b31]/30 text-white"
                      : "hover:bg-white/30 text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => { locale !== "fr" && toggle(); }}
                  className={`flex-1 text-center py-2 rounded-lg font-semibold transition ${
                    locale === "fr"
                      ? "bg-[#ff3b31]/30 text-white"
                      : "hover:bg-white/30 text-white"
                  }`}
                >
                  FR
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      
      {/* Inline script to ensure Calendly works */}
      <Script id="calendly-setup" strategy="afterInteractive">
        {`
          document.addEventListener("DOMContentLoaded", function() {
            if (typeof window !== "undefined" && window.Calendly) {
              const buttonIds = ["navbar-book-meeting-desktop", "navbar-book-meeting-mobile"];
              buttonIds.forEach(id => {
                const button = document.getElementById(id);
                if (button) {
                  button.addEventListener("click", function(e) {
                    e.preventDefault();
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