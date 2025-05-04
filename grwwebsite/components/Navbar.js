import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "../contexts/LocaleContext";
import { Menu, X } from "lucide-react";

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

  return (
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
          <button className="px-6 py-2 bg-[#ff3b31] rounded-lg text-white font-semibold hover:bg-[#e52e26] transition">
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
                onClick={() => { setOpen(false); }}
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
  );
}
