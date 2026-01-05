/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "welcome-mobile": "24px",
        "welcome-desktop": "35.32px",
      },
      lineHeight: {
        "welcome-mobile": "30px",
        "welcome-desktop": "44.15px",
      },
      width: {
        "social-mobile": "60px",
        "social-desktop": "80.77px",
      },
      height: {
        "social-mobile": "35px",
        "social-desktop": "43.08px",
      },
      colors: {
        // Background Colors
        "background-primary": "#F5F5F5", // Page background
        "background-white": "#FFFFFF", // Card and white elements background
        "background-dark-blue": "#1A1B20", // Dark blue for header and banners
        "background-light-gray": "#F5F5F5", // Light gray for categories sidebar and feature blocks
        // Text Colors
        "text-primary": "#1A1B20", // Primary text (black)
        "text-secondary": "#1A1B2099", // Secondary text (gray with 60% opacity)
        "text-gray": "#838383", // Gray text
        "text-white": "#FFFFFF", // White text
        // Brand Colors
        "brand-primary": "#F37622", // Primary orange (for buttons and links)
        "brand-primary-hover": "#F37622CC", // Orange on hover (80% opacity)
        "brand-primary-light": "#F3762280", // Light orange
        // Border Colors
        "border-light": "#E8ECF4", // Light borders
        "border-gray": "#E8ECF4", // Gray borders
        "border-default": "#E8ECF4", // Default borders
        "input-border": "#E6E6E6", // Input border color
        // Social Button Colors
        "social-border": "#E8ECF4", // Social buttons borders
        "social-background": "#FFFFFF", // Social buttons background
        "social-hover": "#E8ECF4CC", // Background on hover (80% opacity)
        // Discount Badge
        "discount-red": "#DC2626", // Red for discount badges
      },
      borderRadius: {
        card: "17.66px", // Border radius for all cards
        button: "89.59px", // Border radius for buttons
      },
      boxShadow: {
        card: "0px 0.88px 3.53px 0px #0000001A", // Shadow for all cards
      },
      borderWidth: {
        input: "1.05px", // Border width for inputs
      },
    },
  },
  plugins: [],
}