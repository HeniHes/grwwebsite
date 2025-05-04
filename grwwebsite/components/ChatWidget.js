import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";
import translations from "../locales/translations.json";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

export default function ChatWidget() {
  const { locale } = useLocale();
  const t = translations[locale].chat;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <button
        className="fixed bottom-6 right-6 flex items-center space-x-2 bg-[#ff3b31]/90 hover:bg-[#ff3b31] text-white py-3 px-4 rounded-full shadow-xl z-50"
        onClick={() => setOpen(true)}
      >
        <MessageSquare size={20} />
        <span className="font-semibold">{t.trigger}</span>
      </button>

      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header with red background and no border */}
          <div className="flex items-center p-4 bg-[#ff3b31] text-white">
            <h3 className="flex-1 font-bold">{t.title}</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:opacity-80"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/iconlogo.jpg"
                width={48}
                height={48}
                alt="Logo"
                className="rounded-full object-cover"
              />

              <p className="text-gray-600 text-sm">{t.subtitle}</p>
            </div>
            <input
              type="text"
              placeholder={t.name}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
            />
            <input
              type="email"
              placeholder={t.email}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
            />
            <textarea
              rows={3}
              placeholder={t.help}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
            />
            <button className="w-full bg-[#ff3b31] text-white py-2 rounded-lg font-semibold hover:bg-[#e52e26]">
              {t.send}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
