import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);


  const handleLogin = async (e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);

    try{

      await signInWithEmailAndPassword(auth,email,password);

      navigate("/dashboard",{replace:true});

    }catch(error:any){

      alert(error.message);

    }

    setLoading(false);
  };


  const handleGoogleLogin = async ()=>{

    try{

      await signInWithPopup(auth,googleProvider);

      navigate("/dashboard",{replace:true});

    }catch(error){

      alert("Google login failed");

    }

  };


  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-black to-emerald-800 p-6">

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.5}}
        className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 shadow-2xl"
      >

        {/* Logo */}

        <div className="flex items-center gap-3 mb-8">

          <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-black font-bold">ET</span>
          </div>

          <div>

            <h1 className="text-xl text-white font-semibold">
              EcoTwin AI
            </h1>

            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Sustainable Campus Digital Twin
            </p>

          </div>

        </div>


        {/* Title */}

        <div className="mb-6">

          <h2 className="text-lg text-white font-medium">
            System Access
          </h2>

          <p className="text-sm text-gray-400">
            Authenticate to continue
          </p>

        </div>


        {/* Login Form */}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>

        </form>


        {/* Divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>

        </div>


        {/* Google Login */}

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-gray-600 rounded-md text-white hover:bg-white/5 transition"
        >
          Sign in with Google
        </button>


        {/* Signup */}

        <p className="text-center text-sm text-gray-400 mt-6">

          Don't have an account?{" "}

          <span
            onClick={()=>navigate("/signup")}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>

        </p>

      </motion.div>

    </div>

  );

}