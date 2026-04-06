'use strict';

function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Include firebase-app-compat before firebase-init.js.');
    return;
  }
  if (!window.firebaseConfig) {
    console.error('Firebase config not found. Load firebase-config.js before firebase-init.js.');
    return;
  }

  firebase.initializeApp(window.firebaseConfig);
  console.log('Firebase initialized for project:', window.firebaseConfig.projectId);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
  initializeFirebase();
}
