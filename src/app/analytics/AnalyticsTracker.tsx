import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-TXR82LT7YJ";

let isInitialized = false;

const initializeAnalytics = () => {
  if (isInitialized || typeof window === "undefined") {
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
  isInitialized = true;
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      initializeAnalytics();
    }

    if (!isInitialized) {
      return;
    }

    const path = `${location.pathname}${location.search}${location.hash}`;
    ReactGA.send({ hitType: "pageview", page: path });
  }, [location]);

  return null;
};

export default AnalyticsTracker;
