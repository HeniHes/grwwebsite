import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "../contexts/LocaleContext.js";
import translations from "../locales/translations.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Lottie from "react-lottie";
import animationData from "../public/grow.json";
import {
  FaArrowCircleRight,
  FaBullseye,
  FaHandshake,
  FaGlobeAmericas,
  FaDollarSign,
  FaCheck,
  FaRegLightbulb,
  FaChartLine,
  FaUserFriends,
  FaGlobe,
  FaLanguage
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Services() {
  const { locale } = useLocale();
  const t = translations[locale].services;
  const servicesEndRef = useRef(null);
  const featureRefs = useRef([]);
  
  // State for read more/less toggling
  const [readMore, setReadMore] = useState({
    businessDevelopment: false,
    yourLocalSalesOffice: false,
    startupProcess: false,
  });

  // Keep track of which features are in view
  const [featuresInView, setFeaturesInView] = useState([]);

  // Toggle read more/less function
  const toggleReadMore = (key) => {
    setReadMore((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // Setup intersection observer for scroll animations
  useEffect(() => {
    if (!t.whyChoose || !t.whyChoose.features || t.whyChoose.features.length === 0) return;
    
    // Initial setup
    const calculateLineHeights = () => {
      const featureElements = document.querySelectorAll('.feature-item');
      
      featureElements.forEach((el, index) => {
        if (index < featureElements.length - 1) {
          const currentMark = el.querySelector('.check-mark');
          const nextItem = featureElements[index + 1];
          const nextMark = nextItem.querySelector('.check-mark');
          
          if (currentMark && nextMark) {
            const currentRect = currentMark.getBoundingClientRect();
            const nextRect = nextMark.getBoundingClientRect();
            const distance = nextRect.top - currentRect.top;
            
            const line = document.getElementById(`line-${index}`);
            if (line) {
              line.style.height = `${distance}px`;
            }
          }
        }
      });
    };

    // Setup observer with bidirectional animation
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.3, 0.7],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.dataset.index);
        const line = document.getElementById(`line-${index}`);
        
        // Update the state based on intersection
        if (entry.isIntersecting) {
          setFeaturesInView(prev => [...prev, index]);
          if (line) line.style.transform = 'scaleY(1)';
        } else {
          setFeaturesInView(prev => prev.filter(i => i !== index));
          if (line) line.style.transform = 'scaleY(0)';
        }
      });
    }, observerOptions);

    // Initialize and observe
    setTimeout(() => {
      calculateLineHeights();
      
      const featureItems = document.querySelectorAll('.feature-item');
      featureItems.forEach(item => {
        observer.observe(item);
      });
    }, 500);

    // Recalculate on window resize
    window.addEventListener('resize', calculateLineHeights);

    return () => {
      const featureItems = document.querySelectorAll('.feature-item');
      featureItems.forEach(item => {
        observer.unobserve(item);
      });
      window.removeEventListener('resize', calculateLineHeights);
    };
  }, [t.whyChoose]);

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src={t.hero.backgroundImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,35,163,0.5)] z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20">
          <span className="text-sm uppercase tracking-wider text-[#ff3b31] font-semibold mb-4">
            {t.hero.label}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight max-w-4xl">
            {t.hero.title}
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8" ref={servicesEndRef}>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Column - Cards stacked vertically */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            {/* Card 1: Business Development */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-50 rounded-full">
                  <Lottie options={defaultOptions} height={48} width={48} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-left mr-4 text-gray-800">
                  {t.cards[0].title}
                </h3>
              </div>
              
              {/* Main description always visible */}
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.cards[0].description}
              </p>
              
              {/* Expandable content */}
              {readMore.businessDevelopment && (
                <div className="animated-fade-in mt-6">
                  <h4 className="text-2xl font-bold text-red-500 mb-4">
                    {t.cards[0].effectiveAccountsPenetration.title}
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {t.cards[0].effectiveAccountsPenetration.description}
                  </p>
                </div>
              )}
              
              <button
                className="bg-[#0023a3] text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-800 transition-colors flex items-center"
                onClick={() => toggleReadMore("businessDevelopment")}
              >
                <span>
                  {readMore.businessDevelopment ? t.buttons.readLess : t.buttons.readMore}
                </span>
                <FaArrowCircleRight className={`ml-2 transform ${readMore.businessDevelopment ? 'rotate-90' : ''} transition-transform`} />
              </button>
            </div>

            {/* Card 2: Your Local Sales Office */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-50 rounded-full">
                  <Lottie options={defaultOptions} height={48} width={48} />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-left text-gray-800">
                    {t.cards[1].title}
                  </h3>
                  <h4 className="text-2xl font-bold text-red-500">
                    {t.cards[1].subtitle}
                  </h4>
                </div>
              </div>
              
              {/* Main description always visible */}
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.cards[1].description}
              </p>
              
              {/* Expandable content */}
              {readMore.yourLocalSalesOffice && (
                <div className="animated-fade-in space-y-6 mt-6">
                  {/* Start Sales Activities */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-2xl font-bold text-red-500 mb-3">
                      {t.cards[1].startSalesActivities.title}
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t.cards[1].startSalesActivities.description}
                    </p>
                  </div>

                  {/* Minimize Risk */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-2xl font-bold text-red-500 mb-3">
                      {t.cards[1].minimizeRisk.title}
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t.cards[1].minimizeRisk.description}
                    </p>
                  </div>

                  {/* Marketing As A Service */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-2xl font-bold text-red-500 mb-3">
                      {t.cards[1].marketingAsAService.title}
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t.cards[1].marketingAsAService.description}
                    </p>
                  </div>

                  {/* Attract Customers */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-2xl font-bold text-red-500 mb-3">
                      {t.cards[1].attractCustomers.title}
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t.cards[1].attractCustomers.description}
                    </p>
                  </div>

                  {/* Marketing and Lead Generation */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-2xl font-bold text-red-500 mb-3">
                      {t.cards[1].marketingAndLeadGeneration.title}
                    </h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t.cards[1].marketingAndLeadGeneration.description}
                    </p>
                  </div>
                </div>
              )}
              
              <button
                className="bg-[#0023a3] text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-800 transition-colors flex items-center"
                onClick={() => toggleReadMore("yourLocalSalesOffice")}
              >
                <span>
                  {readMore.yourLocalSalesOffice ? t.buttons.readLess : t.buttons.readMore}
                </span>
                <FaArrowCircleRight className={`ml-2 transform ${readMore.yourLocalSalesOffice ? 'rotate-90' : ''} transition-transform`} />
              </button>
            </div>
            
            {/* Card 3: Startup Process */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-50 rounded-full">
                  <Lottie options={defaultOptions} height={48} width={48} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-left text-gray-800">
                  {t.cards[2].title}
                </h3>
              </div>
              
              {/* Main description always visible */}
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.cards[2].description}
              </p>
              
              {/* Expandable content */}
              {readMore.startupProcess && (
                <div className="animated-fade-in mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-4">
                      {t.cards[2].processList.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-lg text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <button
                className="bg-[#0023a3] text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-800 transition-colors flex items-center"
                onClick={() => toggleReadMore("startupProcess")}
              >
                <span>
                  {readMore.startupProcess ? t.buttons.readLess : t.buttons.readMore}
                </span>
                <FaArrowCircleRight className={`ml-2 transform ${readMore.startupProcess ? 'rotate-90' : ''} transition-transform`} />
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Card */}
          <div className="w-full md:w-1/3">
            <div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow md:sticky md:top-20"
              style={{position: 'sticky', top: '5rem'}}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                {t.sidebar.title}
              </h3>
              <ul className="space-y-5">
                {t.sidebar.items.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="flex justify-center items-center w-10 h-10 bg-red-500 text-white rounded-full flex-shrink-0">
                      {index === 0 && <FaRegLightbulb size={20} />}
                      {index === 1 && <FaHandshake size={20} />}
                      {index === 2 && <FaChartLine size={20} />}
                      {index === 3 && <FaGlobe size={20} />}
                      {index === 4 && <FaUserFriends size={20} />}
                    </div>
                    <p className="text-md md:text-lg text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GRW Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.whyChoose.title}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="px-8 py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition"
              >
                {t.whyChoose.contactBtn}
              </Link>
              <Link 
                href="/meet"
                className="px-8 py-3 border border-[#0023a3] text-[#0023a3] rounded-lg font-semibold hover:bg-[#0023a3] hover:text-white transition"
              >
                {t.whyChoose.meetBtn}
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Features with timeline on the left */}
            <div className="w-full lg:w-3/5 relative timeline-container">
              {/* Background vertical lines - only between checkmarks */}
              {t.whyChoose.features.map((feature, index) => (
                index < t.whyChoose.features.length - 1 && (
                  <div 
                    key={`bg-line-${index}`}
                    className="absolute left-5 w-0.5 bg-gray-100 z-0"
                    style={{
                      top: `${(index * 160) + 5}px`, // Approximate positioning
                      height: '160px', // Will be calculated precisely by JS
                    }}
                  ></div>
                )
              ))}
              
              {/* Feature items */}
              {t.whyChoose.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative feature-item mb-16 z-10" 
                  data-index={index}
                >
                  {/* This is the animated red line connecting check marks */}
                  {index < t.whyChoose.features.length - 1 && (
                    <div 
                      id={`line-${index}`}
                      className="absolute left-5 top-5 w-0.5 bg-red-500 z-20 connecting-line"
                      style={{
                        height: '160px', // Placeholder height, will be calculated by JS
                        transformOrigin: 'top',
                        transform: 'scaleY(0)',
                        transition: 'transform 0.8s ease-in-out'
                      }}
                    ></div>
                  )}
                  
                  {/* Content with check mark */}
                  <div className="flex gap-6 relative z-30">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white check-mark">
                      <FaCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                      <p className="text-lg text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image on the right - sticky on desktop, normal on mobile */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <div className="lg:sticky lg:top-24 w-full max-w-md">
                <Image
                  src="/images/whygrw.jpg"
                  width={500}
                  height={380}
                  alt="GRW Team"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8">
        <ContactForm />
      </section>

      <Footer />

      <style jsx global>{`
        .animated-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .timeline-container {
          padding-bottom: 30px;
        }
        
        .connecting-line {
          position: absolute;
          will-change: transform;
        }
        
        .feature-item {
          position: relative;
        }
        
        @media (max-width: 1023px) {
          .timeline-container {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}