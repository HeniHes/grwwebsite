// components/ContactForm.js
import { useLocale } from '../contexts/LocaleContext'
import translations from '../locales/translations.json'

export default function ContactForm() {
  const { locale } = useLocale()
  const t = translations[locale].contact

  return (
    <form className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg space-y-6">
      <div className="text-center">
        <span className="text-sm uppercase text-[#ff3b31] font-semibold">{t.pre}</span>
        <h2 className="text-3xl font-bold">{t.title}</h2>
        <p className="text-gray-500 mt-2">{t.subtitle}</p>
      </div>

      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.name}
        required
      />

      <input
        type="email"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.email}
        required
      />

      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.message}
        rows={5}
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition"
      >
        {t.submit}
      </button>
    </form>
  )
}
