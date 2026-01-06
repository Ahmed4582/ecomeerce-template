import { useTranslation } from "react-i18next";

const HowHelp = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
      <div className="bg-background-light-gray py-12 sm:py-16 lg:py-20">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Left: Header and Description */}
              <div
                className={`${
                  isRTL ? "order-2 lg:order-1" : "order-1"
                } col-span-1`}
              >
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
                className={`col-span-2 grid grid-cols-2 gap-4 sm:gap-6 ${
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
                  <div key={index} className=" p-4 sm:p-6 ">
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
  )
};

export default HowHelp;
