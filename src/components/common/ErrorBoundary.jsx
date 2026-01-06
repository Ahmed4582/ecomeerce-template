import { Component } from "react";
import { useTranslation } from "react-i18next";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    // TODO: Send to error reporting service (e.g., Sentry)
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onReset }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="min-h-screen bg-background-primary flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="bg-background-white rounded-lg shadow-card p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          {t("errors.somethingWentWrong") || "Something went wrong"}
        </h1>
        <p className="text-text-secondary mb-6">
          {t("errors.errorMessage") ||
            "We're sorry, but something unexpected happened. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t("errors.goToHome") || "Go to Home"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-200 hover:bg-gray-300 text-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t("errors.reloadPage") || "Reload Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;

