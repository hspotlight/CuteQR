'use strict';

let analytics;

function logPageView() {
  if (!analytics) return;
  const page = window.location.pathname;
  analytics.logEvent('page_view', {
    page_title: document.title,
    page_path: page,
    timestamp: new Date().toISOString(),
  });
}

function initializeAnalytics() {
  try {
    analytics = firebase.analytics();
    analytics.setUserProperties({
      app_name: 'CuteQR',
    });

    window.__cuteqrAnalytics = analytics;

    console.log('Firebase Analytics initialized');
    logPageView();
  } catch (err) {
    console.error('Failed to initialize Firebase Analytics:', err);
  }
}

if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
  initializeAnalytics();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const checkAnalytics = setInterval(() => {
      if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
        clearInterval(checkAnalytics);
        initializeAnalytics();
      }
    }, 100);
  });
}
