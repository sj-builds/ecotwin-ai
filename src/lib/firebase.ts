import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwSB7HoEPd190sFDLqTGGgu2W92mIvDm4",
  authDomain: "ecotwinai-1.firebaseapp.com",
  projectId: "ecotwinai-1",
  storageBucket: "ecotwinai-1.firebasestorage.app",
  messagingSenderId: "112553663751",
  appId: "1:112553663751:web:65ce100b296005dc8f79a2"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();