importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDC9WbLlI11L7vs9dKmhkXmK-TiAL340BQ",
  authDomain: "searchkro-a13a9.firebaseapp.com",
  projectId: "searchkro-a13a9",
  storageBucket: "searchkro-a13a9.firebasestorage.app",
  messagingSenderId: "532481284768",
  appId: "1:532481284768:web:d9112566cfb84423ab07c5",
  measurementId: "G-T8S5D4J26R"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions ={
    body: payload.notification.body,
    icon: payload.notification.image,
  }

  self.registration.showNotification(notificationTitle,notificationOptions)
});