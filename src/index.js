import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import App from './App'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './client';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

// localStorage.clear();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <SessionContextProvider supabaseClient={supabase}>
        <App />
    </SessionContextProvider>
  </ErrorBoundary>
);