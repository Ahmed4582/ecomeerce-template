# E-commerce Template

A modern, fully-featured e-commerce template built with React.js, featuring multi-language support (English/Arabic), responsive design, and optimized performance.

## 🚀 Features

- ✅ **Multi-language Support** - Full i18n implementation with English and Arabic (RTL support)
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **State Management** - Context API for Cart, Currency, and User state
- ✅ **Code Splitting** - React.lazy for optimized bundle size
- ✅ **Error Handling** - Error boundaries and graceful error handling
- ✅ **Performance Optimized** - Lazy loading, memoization, and optimized images
- ✅ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- ✅ **Modern UI/UX** - Clean design with smooth animations and transitions

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Features Overview](#features-overview)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Tech Stack

- **React** 19.2.3 - UI library
- **React Router DOM** 7.11.0 - Client-side routing
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **i18next** 23.7.16 - Internationalization framework
- **React i18next** 13.5.0 - React bindings for i18next
- **Lucide React** 0.562.0 - Icon library
- **Swiper** 12.0.3 - Touch slider component

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecomeerce-template
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── cart/          # Shopping cart components
│   ├── common/        # Shared components (Header, Footer, etc.)
│   ├── contact/       # Contact page components
│   ├── profile/       # User profile components
│   └── home*/         # Home page variations
├── context/           # React Context providers
│   ├── CartContext.jsx
│   ├── CurrencyContext.jsx
│   └── UserContext.jsx
├── hooks/             # Custom React hooks
│   └── useFormValidation.js
├── pages/             # Page components
├── locales/           # Translation files
│   ├── en.json
│   └── ar.json
├── utils/             # Utility functions
│   ├── formatters.js
│   └── validators.js
├── lib/               # Static data
└── App.jsx            # Main application component
```

## 📜 Available Scripts

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and filenames include hashes. Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## ✨ Features Overview

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart (localStorage)
- Cart summary with discounts
- Multiple payment methods

### User Authentication
- Login/Signup forms
- Email verification
- Password reset
- Social login buttons (UI ready)

### Product Pages
- Product image gallery
- Color and size selection
- Quantity selector
- Related products
- Add to cart functionality

### User Profile
- Personal information management
- Order history
- Order details
- Profile picture upload (UI ready)

### Internationalization
- English and Arabic support
- RTL layout for Arabic
- Language switcher
- Currency selector
- Localized date and number formats

## ⚡ Performance

The project is optimized for performance with:

- **Code Splitting** - All pages are lazy-loaded using React.lazy()
- **Image Optimization** - Lazy loading for images below the fold
- **Memoization** - useMemo and useCallback for expensive operations
- **Bundle Optimization** - Tree shaking and minification
- **Context Optimization** - Efficient state management

### Lighthouse Scores

- **Performance:** 91+
- **Accessibility:** 92+
- **Best Practices:** 96+
- **SEO:** 100

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Design System

The project uses a custom design system defined in `tailwind.config.js`:

- **Colors:** Brand colors, backgrounds, text colors
- **Typography:** Custom font sizes and line heights
- **Spacing:** Consistent spacing scale
- **Components:** Reusable component styles

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url
REACT_APP_ENVIRONMENT=development
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      "brand-primary": "#F37622",
      // ... more colors
    }
  }
}
```

### i18n Configuration

Translation files are located in `src/locales/`:
- `en.json` - English translations
- `ar.json` - Arabic translations

## 🧪 Testing

```bash
npm test
```

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to Netlify

### Deploy to GitHub Pages

See [Create React App deployment docs](https://create-react-app.dev/docs/deployment/#github-pages)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## 🐛 Known Issues

- Some product names are hardcoded (to be replaced with API data)
- User data is demo data (to be replaced with authentication)
- Form submissions are simulated (to be connected to backend API)

## 🔮 Future Enhancements

- [ ] Add TypeScript support
- [ ] Implement unit and integration tests
- [ ] Add PWA features
- [ ] Implement real-time notifications
- [ ] Add product search and filtering
- [ ] Implement wishlist functionality
- [ ] Add product reviews and ratings

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Development Team

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- i18next for internationalization support
- All contributors and testers

## 📞 Support

For support, email support@example.com or open an issue in the repository.

---

**Made with ❤️ using React**
