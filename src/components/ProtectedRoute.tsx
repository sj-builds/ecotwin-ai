import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

      setUser(firebaseUser);
      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  /* ---------- Loading Screen ---------- */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06110c] via-[#0a1f17] to-[#03130e]">

        <div className="flex flex-col items-center gap-6">

          {/* Glass Loader Card */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-8 py-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">

            <div className="flex items-center gap-4">

              <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />

              <p className="text-sm text-gray-300 tracking-wide">
                Authenticating Secure Session
              </p>

            </div>

          </div>

        </div>

      </div>

    );

  }

  /* ---------- Not Authenticated ---------- */

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ---------- Authenticated ---------- */

  return <>{children}</>;

}