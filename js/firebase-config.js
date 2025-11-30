/**
 * Firebase Configuration Module
 * Shared across index.html and admin.html
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-check.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

// Firebase configuration
// Note: These keys are safe to expose in client-side code
// Security is enforced via Firestore Security Rules
const firebaseConfig = {
  apiKey: "AIzaSyBEFimTV6zygaMki5VZQ9cqdcFTfPMaOj0",
  authDomain: "china-cafe-menu.firebaseapp.com",
  projectId: "china-cafe-menu",
  storageBucket: "china-cafe-menu.firebasestorage.app",
  messagingSenderId: "233511471732",
  appId: "1:233511471732:web:e2298d04ff590dcdd6df21",
};

// Enable debug mode for localhost testing
// IMPORTANT: This only activates on localhost, production uses real reCAPTCHA
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
if (isLocalhost) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const appId = firebaseConfig.appId;

// Initialize Analytics (tracks page views automatically)
export const analytics = getAnalytics(app);

// Initialize App Check for additional security
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lc2MB0sAAAAANJw8ynBc0mZ51MAOQ6RwyZVcs35'),
  isTokenAutoRefreshEnabled: true
});

// Helper function to log custom events
export function trackEvent(eventName, params = {}) {
  logEvent(analytics, eventName, params);
}

console.log('Firebase initialized with App Check & Analytics' + (isLocalhost ? ' (debug mode)' : ''));
