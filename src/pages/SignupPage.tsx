import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSignup = async (e:React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try{

      const userCredential = await createUserWithEmailAndPassword(auth,email,password);

      console.log("Signup success:", userCredential.user);

      alert("Account created successfully");

      navigate("/dashboard");

    }catch(error:any){

      console.error("Signup error:", error);

      alert(error.message);

    }

    setLoading(false);

  };


  return(

    <div className="min-h-screen flex items-center justify-center bg-background">

      <motion.div
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        className="w-full max-w-sm space-y-6"
      >

        <h2 className="text-xl font-light text-center">
          Create Account
        </h2>


        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>


        <p className="text-center text-sm">

          Already have an account?{" "}

          <span
            onClick={()=>navigate("/login")}
            className="text-primary cursor-pointer"
          >
            Login
          </span>

        </p>

      </motion.div>

    </div>

  );

}