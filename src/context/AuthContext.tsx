import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
  loading: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  subscribe: (plan: Plan, paymentId?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Plan>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount and sync subscription from Supabase
  useEffect(() => {
    const stored = localStorage.getItem("fitcoach_user");
    if (stored) {
      const u = JSON.parse(stored) as User;
      setUser(u);
      // Fetch latest subscription from Supabase
      supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", u.id)
        .order("subscribed_at", { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) setSubscription(data[0].plan as Plan);
        });
    }
    setLoading(false);
  }, []);

  const signup = async (name: string, email: string, password: string): Promise<string | null> => {
    // Check if email already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) return "An account with this email already exists.";

    // Hash password using Web Crypto API (no bcrypt needed in browser)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ name, email, password: hashedPassword })
      .select("id, name, email")
      .single();

    if (error || !newUser) return "Failed to create account. Please try again.";

    const u = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem("fitcoach_user", JSON.stringify(u));
    setUser(u);
    setIsModalOpen(false);
    return null;
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const { data: foundUser, error } = await supabase
      .from("users")
      .select("id, name, email, password")
      .eq("email", email)
      .single();

    if (error || !foundUser) return "No account found with this email.";
    if (foundUser.password !== hashedPassword) return "Invalid email or password.";

    const u = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
    localStorage.setItem("fitcoach_user", JSON.stringify(u));
    setUser(u);

    // Fetch subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan")
      .eq("user_id", u.id)
      .order("subscribed_at", { ascending: false })
      .limit(1);

    if (sub && sub.length > 0) setSubscription(sub[0].plan as Plan);

    setIsModalOpen(false);
    return null;
  };

  const logout = () => {
    localStorage.removeItem("fitcoach_user");
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
    setSubscription(plan);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isModalOpen,
        loading,
        openAuthModal: () => setIsModalOpen(true),
        closeAuthModal: () => setIsModalOpen(false),
        login,
        signup,
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
