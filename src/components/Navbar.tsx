import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Workouts", href: "#workouts" },
  { label: "Premium", href: "#premium" },
  { label: "Calculator", href: "#calculator" },
  { label: "Nutrition", href: "#nutrition" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, openAuthModal, logout, subscription } = useAuth();

  const handlePremium = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2">
          <Dumbbell className="w-7 h-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-wider text-foreground">
            BEAST<span className="text-primary">FIT</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                {subscription && (
                  <span className="text-xs font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
                    {subscription === "BEAST PRO" ? "PRO" : "ELITE"}
                  </span>
                )}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={openAuthModal}
                className="px-5 py-2 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 transition-colors"
              >
                Sign In
              </button>
              <a
                href="#premium"
                onClick={handlePremium}
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Go Premium
              </a>
            </div>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    {subscription && (
                      <span className="text-xs font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
                        {subscription === "BEAST PRO" ? "PRO" : "ELITE"}
                      </span>
                    )}
                  </div>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-muted-foreground hover:text-primary transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => { setOpen(false); openAuthModal(); }}
                    className="px-5 py-2 rounded-lg border border-border text-foreground font-semibold text-sm text-center"
                  >
                    Sign In
                  </button>
                  <a
                    href="#premium"
                    onClick={(e) => { setOpen(false); handlePremium(e); }}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm text-center"
                  >
                    Go Premium
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
