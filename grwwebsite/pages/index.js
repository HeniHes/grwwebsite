// pages/index.js
import React from "react";
import { useLocale } from "../contexts/LocaleContext";
import translations from "../locales/translations.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ChatWidget from "../components/ChatWidget";
import Link from "next/link";

import {
  FaEye,
  FaFlag,
  FaBullseye,
  FaLightbulb,
  FaRegLightbulb,
} from "react-icons/fa";

import Image from "next/image";
import { Target, Eye, ArrowRightCircle, Flag } from "lucide-react";

export default function Home() {
  const { locale } = useLocale();
  const t = translations[locale];

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-cover w-full h-full z-0"
        >
          <source src="/videos/header-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgba(0,35,163,0.5)] z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight max-w-4xl">
            {t.hero.headingLine1}
            <br />
            {t.hero.headingLine2}
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/services" className="px-6 py-3 bg-[#ff3b31] rounded-lg font-semibold hover:bg-[#e52e26] text-center">
                {t.hero.ctaServices}
            </Link>
            <Link href="/meet-us" className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-[#0023a3] transition text-center">
                {t.hero.ctaExperts}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Floating chat widget */}
      <ChatWidget />
      
      {/* Who We Are - Fixed background to white */}
      <section className="py-20 px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 container mx-auto bg-white">
        <div className="md:w-1/2">
          <Image
            src="/images/whoweare.jpg"
            width={600}
            height={400}
            alt={t.who.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-[28px] md:text-[48px] font-bold mb-4 text-black">
            {t.who.title}
          </h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-black">
            {t.who.body}
          </p>
        </div>
      </section>
      
      {/* CEO */}
      <section className="bg-gray-100 py-16 px-4 md:px-8 text-center">
        <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-8 text-black">
          &quot;{t.quote.text}&quot;
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
            <Image
              src="/images/roumy.jpeg"
              width={72}
              height={72}
              alt={t.quote.author}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-left">
            <p className="text-xl font-semibold text-black">{t.quote.author}</p>
            <p className="text-gray-600">{t.quote.role}</p>
          </div>
        </div>
      </section>
      
      {/* Video - Fixed background to white */}
      <section className="flex justify-center py-20 px-4 bg-white">
        <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/8GP02PKnT5A"
            title={locale === "en" ? "Message from CEO" : "Message du PDG"}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>
      
      {/* Why Choose */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <Image
          src="/images/whygrw.jpg"
          alt={t.why.title}
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto text-white text-center space-y-8">
          <h2 className="text-[28px] md:text-[48px] font-bold opacity-100">
            {t.why.title}
          </h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed opacity-100">
            {t.why.body}
          </p>
          <button className="px-6 py-3 bg-[#ff3b31] rounded-lg font-semibold hover:bg-[#e52e26] opacity-100">
            {t.why.cta}
          </button>
        </div>
      </section>
      
      {/* Mission & Vision - Fixed background to white */}
      <section className="py-20 px-4 md:px-8 container mx-auto space-y-12 bg-white">
        {/* Mission */}
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          <div className="w-full md:w-2/3 bg-[#f2f4f7] rounded-xl shadow-lg p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <FaFlag size={32} className="text-[#ff3b31]" />
              <h2 className="text-3xl font-bold text-black">{t.mission.title}</h2>
            </div>
            <p className="text-lg text-black opacity-100">{t.mission.body}</p>
          </div>
          <div className="relative w-full md:w-1/3 h-64 md:h-auto rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/mission.jpg"
              alt={t.mission.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col md:flex-row-reverse items-stretch gap-8">
          <div className="relative w-full md:w-1/3 h-64 md:h-auto rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/vision.jpg"
              alt={t.vision.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 bg-[#f2f4f7] rounded-xl shadow-lg p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <FaEye size={32} className="text-[#ff3b31]" />
              <h2 className="text-3xl font-bold text-black">{t.vision.title}</h2>
            </div>
            <p className="text-lg text-black opacity-100">{t.vision.body}</p>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
}