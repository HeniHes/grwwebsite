import { useState } from "react";
import emailjs from "emailjs-com";
import { useLocale } from "../contexts/LocaleContext";
import translations from "../locales/translations.json";
import Image from "next/image";

export default function ContactForm() {
  const { locale } = useLocale();
  const t = translations[locale].contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // To track if form was submitted successfully

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
      setIsSubmitted(true); // Show success UI
      setFormData({ name: "", email: "", message: "" }); // Clear the form after submission
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong. Please try again."); // Simple error notification
    }
  };

  // Reset the form
  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg">
      {isSubmitted ? (
        // Success message UI
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/images/iconlogo.jpg"
              width={80}
              height={80}
              alt="Logo"
              className="rounded-full object-cover"
            />
          </div>

          <h4 className="text-2xl font-semibold text-black opacity-100">
            Thank you!
          </h4>
          <p className="text-gray-600 opacity-100 text-lg">
            We will get back to you soon.
          </p>

          <button
            onClick={handleReset}
            className="px-8 py-3 bg-[#ff3b31] text-white rounded-lg font-semibold hover:bg-[#e52e26] transition mt-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        // Contact form UI
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <span className="text-sm uppercase text-[#ff3b31] font-semibold">
              {t.pre}
            </span>
            <h2 className="text-3xl font-bold text-black opacity-100">
              {t.title}
            </h2>
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
        </form>
      )}
    </div>
  );
}
