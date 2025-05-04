import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";
import translations from "../locales/translations.json";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import emailjs from "emailjs-com";

export default function ChatWidget() {
  const { locale } = useLocale();
  const t = translations[locale].chat;

  const [open, setOpen] = useState(false);
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
        "eTi7oDrqJHt_eO4IG" // Your EmailJS User ID (API Key)
      );

      console.log(result.text);
      setIsSubmitted(true); // Show success UI
      setFormData({ name: "", email: "", message: "" }); // Clear the form data
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong. Please try again."); // Simple error notification
    }
  };

  // Reset the widget state
  const handleReset = () => {
    setIsSubmitted(false);
    setOpen(false);
  };

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
            <h3 className="flex-1 font-bold text-white opacity-100">{t.title}</h3>
            <button
              onClick={() => {
                if (isSubmitted) {
                  handleReset();
                } else {
                  setOpen(false);
                }
              }}
              className="text-white hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {isSubmitted ? (
            // Success message UI
            <div className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Image
                  src="/images/iconlogo.jpg"
                  width={64}
                  height={64}
                  alt="Logo"
                  className="rounded-full object-cover"
                />
              </div>
              
              <h4 className="text-lg font-semibold text-black opacity-100">Thank you!</h4>
              <p className="text-gray-600 opacity-100">We will get back to you soon.</p>
              
              <button 
                onClick={handleReset}
                className="w-full bg-[#ff3b31] text-white py-2 rounded-lg font-semibold hover:bg-[#e52e26] mt-4"
              >
                Close
              </button>
            </div>
          ) : (
            // Contact form UI
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/iconlogo.jpg"
                  width={48}
                  height={48}
                  alt="Logo"
                  className="rounded-full object-cover"
                />
                <p className="text-gray-600 text-sm opacity-100">{t.subtitle}</p>
              </div>

              {/* Name input */}
              <input
                type="text"
                placeholder={t.name}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              {/* Email input */}
              <input
                type="email"
                placeholder={t.email}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* Message input */}
              <textarea
                rows={3}
                placeholder={t.help}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff3b31]"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* Submit button */}
              <button
                className="w-full bg-[#ff3b31] text-white py-2 rounded-lg font-semibold hover:bg-[#e52e26]"
                onClick={handleSubmit}
              >
                {t.send}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}