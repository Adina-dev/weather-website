import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB63UOnZgsRUP70il1gjxc_-77IdIrnBGE",
  authDomain: "weather-app-ffdf1.firebaseapp.com",
  projectId: "weather-app-ffdf1",
  storageBucket: "weather-app-ffdf1.appspot.com",
  messagingSenderId: "108758055190",
  appId: "1:108758055190:web:2d3ae1a644bb38efe2b837",
  databaseURL: "https://weather-app-ffdf1-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export { app };
