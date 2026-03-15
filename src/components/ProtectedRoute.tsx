import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {

  const [user,setUser] = useState<User | null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth,(firebaseUser)=>{

      setUser(firebaseUser);
      setLoading(false);

    });

    return ()=>unsubscribe();

  },[]);


  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if(!user){
    return <Navigate to="/login" />;
  }

  return children;
}