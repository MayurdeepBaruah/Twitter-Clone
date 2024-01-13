import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAloX8U-85SE2hltQEplEyl6tw4urJztjE",
  authDomain: "create-a-website-like-twitterx.firebaseapp.com",
  projectId: "create-a-website-like-twitterx",
  storageBucket: "create-a-website-like-twitterx.appspot.com",
  messagingSenderId: "672798496573",
  appId: "1:672798496573:web:b4267d0f992c3e2eaf5754",
  measurementId: "G-40P6F9YXJN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
