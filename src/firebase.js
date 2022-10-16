// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: "AIzaSyDbqxuY9GeOsw1LqWtnjn477u0EySWCiHc",  // ToDo Pasar a secret
  authDomain: "tdp-ii-grupo-5-2022-2c.firebaseapp.com",
  projectId: "tdp-ii-grupo-5-2022-2c",
  storageBucket: "tdp-ii-grupo-5-2022-2c.appspot.com",
  messagingSenderId: "553567485809",
  appId: "1:553567485809:web:fff7a56bc34001859a80d0",
  measurementId: "G-QV18T1VK8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const chatdb = getFirestore(app);


async function sendMessage(roomId, user, text) {
  try {
    console.log("Sending message " + text + " to roomId " + roomId + " with payload...");
    const payload = {
      user_id: user._id,
      displayName: user.name,
      text: text.trim(),
      timestamp: serverTimestamp(),
    }
    console.log(payload);

    return await addDoc(collection(chatdb, 'chatrooms', roomId, 'messages'), payload);
  } catch (error) {
    //TODO: Handle error
    console.log(error);
  }
}

// The onSnapshot SDK function lets us take advantage of Firestore’s real-time updates.
// It listens to the result of a query and receives updates when a change is made.
function getMessages(roomId, callback) {
  if (!roomId) {
    callback([])
    return;
  }

  return onSnapshot(
      query(
          collection(chatdb, 'chatrooms', roomId, 'messages'),
          orderBy('timestamp', 'asc')
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((x) => ({
          id: x.id,
          ...x.data(),
        }));

        callback(messages);
      }
  )
}

export {sendMessage, getMessages};
