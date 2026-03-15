import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";

import { Loader2 } from "lucide-react";

export default function SignupPage() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleSignup = async (e:React.FormEvent)=>{

    e.preventDefault();

    setError("");
    setLoading(true);

    try{

      await createUserWithEmailAndPassword(auth,email,password);

      navigate("/dashboard",{replace:true});

    }catch(err:any){

      setError(err.message);

    }

    setLoading(false);

  };


  const handleGoogleSignup = async ()=>{

    try{

      await signInWithPopup(auth,googleProvider);

      navigate("/dashboard",{replace:true});

    }catch{

      setError("Google signup failed");

    }

  };


  return(

    <div className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[#06110c]
      via-[#0a1f17]
      to-[#03130e]
      overflow-hidden
      "
    >
      {/* background glow */}

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-emerald-500/20
        blur-[140px]
        rounded-full
        top-[-200px]
        left-[-200px]
      "
      />

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-teal-400/20
        blur-[140px]
        rounded-full
        bottom-[-200px]
        right-[-200px]
      "
      />



      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        className="
        w-full
        max-w-md
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-8
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
      "
      >

        {/* logo */}

        <div className="flex items-center gap-3 mb-8">

          <div className="
            h-10 w-10
            rounded-lg
            bg-emerald-500
            flex
            items-center
            justify-center
            font-bold
            text-black
          ">
            ET
          </div>

          <div>

            <h1 className="text-lg text-white font-semibold">
              EcoTwin AI
            </h1>

            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Sustainable Campus Digital Twin
            </p>

          </div>

        </div>


        {/* title */}

        <div className="mb-6">

          <h2 className="text-xl text-white font-semibold">
            Create Account
          </h2>

          <p className="text-sm text-gray-400">
            Start monitoring your campus sustainability
          </p>

        </div>



        {error && (

          <div
            className="
            bg-red-500/10
            border border-red-500/20
            text-red-400
            text-sm
            p-3
            rounded-lg
            mb-4
          "
          >
            {error}
          </div>

        )}



        {/* signup form */}

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="
              w-full
              px-4 py-3
              rounded-lg
              bg-black/40
              border border-white/10
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:border-emerald-400
              focus:ring-1
              focus:ring-emerald-400
            "
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="
              w-full
              px-4 py-3
              rounded-lg
              bg-black/40
              border border-white/10
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:border-emerald-400
              focus:ring-1
              focus:ring-emerald-400
            "
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="
              w-full
              px-4 py-3
              rounded-lg
              bg-black/40
              border border-white/10
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:border-emerald-400
              focus:ring-1
              focus:ring-emerald-400
            "
          />


          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-lg
              bg-emerald-500
              text-black
              font-semibold
              hover:brightness-110
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {loading && <Loader2 className="animate-spin h-4 w-4"/>}

            {loading ? "Creating account..." : "Create Account"}

          </button>

        </form>


        {/* divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-white/10"/>

          <span className="px-3 text-gray-400 text-xs">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"/>

        </div>



        {/* google signup */}

        <button
          onClick={handleGoogleSignup}
          className="
            w-full
            py-3
            border border-white/10
            rounded-lg
            text-white
            hover:bg-white/5
            transition
          "
        >
          Sign up with Google
        </button>



        {/* login link */}

        <p className="text-center text-sm text-gray-400 mt-6">

          Already have an account?{" "}

          <span
            onClick={()=>navigate("/login")}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Sign in
          </span>

        </p>

      </motion.div>

    </div>

  );

}