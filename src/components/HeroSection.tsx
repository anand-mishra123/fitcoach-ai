import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/hero-gym.jpg";
import { useAuth } from "@/context/AuthContext";

const HeroSection = () => {
  const { user, openAuthModal } = useAuth();

  const guard = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Dark gym interior" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              #1 Fitness Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6"
          >
            UNLEASH
            <br />
            YOUR <span className="text-gradient">BEAST</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed"
          >
            AI-powered workouts, real-time progress tracking, and personalized
            nutrition plans. Transform your body with the most advanced fitness
            platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#workouts"
              onClick={guard}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:opacity-90 transition-opacity glow-primary"
            >
              START TRAINING <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#premium"
              onClick={guard}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-bold text-sm tracking-wide hover:border-primary/50 transition-colors"
            >
              <Play className="w-4 h-4 text-primary" /> WATCH DEMO
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-10 mt-14"
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "200+", label: "Workout Plans" },
              { value: "4.9", label: "App Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
