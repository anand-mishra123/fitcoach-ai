import { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type Plan = "BEAST PRO" | "ELITE" | null;

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  subscription: Plan;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (name: string, email: string, password: string, isSignUp: boolean) => Promise<string | null>;
  logout: () => void;
  subscribe: (plan: Plan, paymentId?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored = localStorage.getItem("fitcoach_user");
  const storedSub = localStorage.getItem("fitcoach_subscription") as Plan;

  const [user, setUser] = useState<User | null>(stored ? JSON.parse(stored) : null);
  const [subscription, setSubscription] = useState<Plan>(storedSub || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = async (name: string, email: string, password: string, isSignUp: boolean): Promise<string | null> => {
    if (isSignUp) {
      // Check if email already exists
      const { data: existing } = await supabase
        .from("users")
        .select("id, name, email")
        .eq("email", email)
        .single();

      if (existing) return "An account with this email already exists.";

      // Insert new user
      const { data, error } = await supabase
        .from("users")
        .insert({ name, email, password })
        .select("id, name, email")
        .single();

      if (error) return "Sign up failed. Please try again.";

      const u = { id: data.id, name: data.name, email: data.email };
      localStorage.setItem("fitcoach_user", JSON.stringify(u));
      setUser(u);
      setIsModalOpen(false);
      return null;
    } else {
      // Sign in — find user by email + password
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) return "Invalid email or password.";

      // Load subscription if any
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", data.id)
        .order("subscribed_at", { ascending: false })
        .limit(1)
        .single();

      const u = { id: data.id, name: data.name, email: data.email };
      localStorage.setItem("fitcoach_user", JSON.stringify(u));
      if (sub?.plan) {
        localStorage.setItem("fitcoach_subscription", sub.plan);
        setSubscription(sub.plan as Plan);
      }
      setUser(u);
      setIsModalOpen(false);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("fitcoach_user");
    localStorage.removeItem("fitcoach_subscription");
    setUser(null);
    setSubscription(null);
  };

  const subscribe = async (plan: Plan, paymentId?: string) => {
    if (!plan || !user) return;
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan,
      payment_id: paymentId || null,
    });
    localStorage.setItem("fitcoach_subscription", plan);
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
