import { useState } from "react";
import emailjs from "emailjs-com";
import { useLocale } from "../contexts/LocaleContext";
import translations from "../locales/translations.json";

export default function ContactForm() {
  const { locale } = useLocale();
  const t = translations[locale].contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // To show success or error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_mwlx6r1", // Your EmailJS Service ID
        "template_20c8i31", // Your EmailJS Template ID
        templateParams,
        "eTi7oDrqJHt_eO4IG" // Your EmailJS API User ID (Public Key)
      );

      console.log(result.text);
      setStatus("Thank you for reaching out! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" }); // Clear the form after submission
    } catch (error) {
      console.error(error);
      setStatus("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <span className="text-sm uppercase text-[#ff3b31] font-semibold">
          {t.pre}
        </span>
        {/* Fixed the title styling to ensure it's black with full opacity on all devices */}
        <h2 className="text-3xl font-bold text-black opacity-100">{t.title}</h2>
        {/* Also ensuring subtitle has proper opacity */}
        <p className="text-gray-500 mt-2 opacity-100">{t.subtitle}</p>
      </div>

      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.name}
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.email}
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff3b31]"
        placeholder={t.message}
        name="message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition"
      >
        {t.submit}
      </button>

      {status && <p className="mt-4 text-center text-green-500">{status}</p>}
    </form>
  );
}
