import { createContext, useContext, useState, ReactNode } from "react";

type Plan = "BEAST PRO" | "ELITE" | null;

interface AuthContextType {
  user: { name: string; email: string } | null;
  subscription: Plan;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  subscribe: (plan: Plan) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored = localStorage.getItem("fitcoach_user");
  const storedSub = localStorage.getItem("fitcoach_subscription") as Plan;

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    stored ? JSON.parse(stored) : null
  );
  const [subscription, setSubscription] = useState<Plan>(storedSub || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = (name: string, email: string) => {
    const u = { name, email };
    localStorage.setItem("fitcoach_user", JSON.stringify(u));
    setUser(u);
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("fitcoach_user");
    localStorage.removeItem("fitcoach_subscription");
    setUser(null);
    setSubscription(null);
  };

  const subscribe = (plan: Plan) => {
    if (plan) localStorage.setItem("fitcoach_subscription", plan);
    setSubscription(plan);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isModalOpen,
        openAuthModal: () => setIsModalOpen(true),
        closeAuthModal: () => setIsModalOpen(false),
        login,
        logout,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
