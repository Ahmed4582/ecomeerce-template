import { useTranslation } from "react-i18next";

const CategoriesGrid = () => {
  const { t } = useTranslation();

  // Generate 12 identical watch category items
  const watchCategories = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    nameKey: "categories.watches",
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <h2
        className={`text-2xl lg:text-3xl font-bold text-[#212844] mb-6 text-center`}
      >
        {t("common.productCategories")}
      </h2>

      {/* Grid of categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 lg:gap-6">
        {watchCategories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Circular Card */}
              <div
                className="rounded-full aspect-square w-full max-w-[120px] sm:max-w-[140px] lg:max-w-[160px] flex items-center justify-center p-4 sm:p-6 hover:shadow-md transition-shadow relative overflow-hidden mb-3"
                style={{
                  background:
                    "linear-gradient(to bottom, #F3F4F6 0%, #F3F4F6 55%, #e5e7eb 56%, #e5e7eb 100%)", // top light gray, bottom a bit darker gray
                }}
              >
                {/* Background Image - Subtle */}

                {/* Watch Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src="/images/watchimg.png"
                    alt={t(category.nameKey)}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              {/* Text Label - Below the card */}
              <h3 className="text-sm font-semibold text-[#202232]">
                {t(category.nameKey)}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesGrid;
