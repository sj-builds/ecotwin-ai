import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-card border-r border-border flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">ET</span>
            </div>
            <div>
              <h1 className="text-xl font-light tracking-display text-foreground">ECOTWIN AI</h1>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sustainable Campus Digital Twin</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-3xl font-light tracking-display text-foreground leading-tight">
              Sustainability is an<br />
              <span className="text-gradient-emerald">optimization problem.</span>
            </p>
          </motion.div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: '84', label: 'Campus Score' },
              { value: '-12%', label: 'Carbon Reduction' },
              { value: '23', label: 'Active Alerts' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="border border-border rounded-md p-3">
                <span className="text-xl font-light tracking-display text-primary tabular-nums">{stat.value}</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          © 2026 EcoTwin AI — University Sustainability Platform
        </p>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">ET</span>
            </div>
            <span className="text-lg font-light tracking-display text-foreground">ECOTWIN AI</span>
          </div>

          <div>
            <h2 className="text-xl font-light tracking-display text-foreground">SYSTEM ACCESS</h2>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">Authenticate to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="admin@university.edu"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-md text-xs font-mono uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Authenticate
            </button>
          </form>

          <p className="text-[10px] font-mono text-muted-foreground text-center uppercase tracking-widest">
            Demo mode — any credentials accepted
          </p>
        </motion.div>
      </div>
    </div>
  );
}
