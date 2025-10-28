/**
 * Firebase Configuration Module
 * Shared across index.html and admin.html
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const appId = firebaseConfig.appId;

// Optional: Initialize App Check for additional security
// Uncomment and configure when ready
/*
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-check.js";

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR-RECAPTCHA-SITE-KEY'),
  isTokenAutoRefreshEnabled: true
});
*/

console.log('Firebase initialized successfully');
