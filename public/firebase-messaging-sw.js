importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

const firebaseConfig = {  
    apiKey: "AIzaSyDbqxuY9GeOsw1LqWtnjn477u0EySWCiHc",  // ToDo Pasar a secret
    authDomain: "tdp-ii-grupo-5-2022-2c.firebaseapp.com",
    projectId: "tdp-ii-grupo-5-2022-2c",
    storageBucket: "tdp-ii-grupo-5-2022-2c.appspot.com",
    messagingSenderId: "553567485809",
    appId: "1:553567485809:web:fff7a56bc34001859a80d0",
    measurementId: "G-QV18T1VK8G"
  };
  
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
console.log('[firebase-messaging-sw.js] Received background message ', payload);
const notificationTitle = payload.notification.title;
const notificationOptions = {
body: payload.notification.body,
};
return self.registration.showNotification(notificationTitle,
notificationOptions);
});
self.addEventListener('notificationclick', event => {
   console.log(event)
});