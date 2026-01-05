import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background-light-gray min-h-screen">
      <Header />

      {/* Top Section - How can help you */}
      <div className="bg-background-light-gray py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Left: Header and Description */}
              <div className={isRTL ? "order-2 lg:order-1" : "order-1"}>
                <p className="text-[#FC813B] text-sm sm:text-base font-medium mb-2">
                  {t("contact.howCanHelp")} ?
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212844] mb-4">
                  {t("contact.letUsKnow")}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t("contact.description")} With the customizable Action
                  Button, advanced compass depth tracking, and precise GPS, it's
                  perfect for outdoor adventures. Powered by the S9 SiP chip for
                  faster performance.
                </p>
              </div>

              {/* Right: Inquiry Categories Grid */}
              <div
                className={`grid grid-cols-2 gap-4 sm:gap-6 ${
                  isRTL ? "order-1 lg:order-2" : "order-2"
                }`}
              >
                {[
                  {
                    number: "01",
                    title: t("contact.visitFeedback"),
                    description: t("contact.loremIpsum"),
                  },
                  {
                    number: "02",
                    title: t("contact.employerServices"),
                    description: t("contact.loremIpsum"),
                  },
                  {
                    number: "03",
                    title: t("contact.billingInquiries"),
                    description: t("contact.loremIpsum"),
                  },
                  {
                    number: "04",
                    title: t("contact.generalInquiries"),
                    description: t("contact.loremIpsum"),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-background-light-gray rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-[#212844] mb-2">
                      {item.number}.
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-[#212844] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="bg-background-light-gray py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Left: Contact Details */}
            <div className={isRTL ? "order-2 lg:order-1" : "order-1"}>
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212844] mb-3">
                  {t("contact.getInTouch")}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {t("contact.loremIpsum")}
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <div className="bg-background-light-gray rounded-lg p-4 sm:p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FC813B] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#212844] mb-1">
                      {t("contact.phone")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      +971 2546 21355 78
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-background-light-gray rounded-lg p-4 sm:p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FC813B] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#212844] mb-1">
                      {t("contact.email")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      geweto9420@chokxus.com
                    </p>
                  </div>
                </div>

                {/* London Office */}
                <div className="bg-background-light-gray rounded-lg p-4 sm:p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FC813B] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#212844] mb-1">
                      {t("contact.londonOffice")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Cruce Casa de Postas 29
                    </p>
                  </div>
                </div>

                {/* Bournemouth Office */}
                <div className="bg-background-light-gray rounded-lg p-4 sm:p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FC813B] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#212844] mb-1">
                      {t("contact.bournemouthOffice")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Cruce Casa de Postas 29
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className={isRTL ? "order-1 lg:order-2" : "order-2"}>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-6 sm:p-8 space-y-4 sm:space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.firstName")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                      placeholder={t("contact.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.lastName")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                      placeholder={t("contact.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.emailAddress")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.phoneNumber")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                      placeholder={t("contact.phonePlaceholder")}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base resize-none bg-white"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#FC813B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors text-sm sm:text-base"
                >
                  {t("contact.sendMessage")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white">
        <div className="w-full h-96 sm:h-[500px] lg:h-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.123456789!2d8.5417!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMiczMC4xIkU!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Contact Map"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
