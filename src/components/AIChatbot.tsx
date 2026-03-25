import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FITNESS_RESPONSES: Record<string, string> = {
  default:
    "I'm your AI fitness coach! Ask me about workouts, nutrition, recovery, supplements, or training tips. I'm here to help you reach your goals! 💪",
  workout:
    "For building muscle, focus on compound movements: squats, deadlifts, bench press, overhead press, and rows. Train each muscle group 2x per week with progressive overload. Start with 3-4 sets of 8-12 reps per exercise.",
  diet: "For optimal results, aim for: **1g protein per lb of bodyweight**, complex carbs around workouts, healthy fats from nuts/avocado/olive oil. Eat in a slight surplus (+300 cal) to build muscle, or deficit (-500 cal) to cut.",
  protein:
    "Great protein sources: chicken breast (31g/100g), eggs (6g each), Greek yogurt (17g/cup), salmon (25g/100g), whey protein (25g/scoop). Aim for 1.6-2.2g per kg bodyweight for muscle growth.",
  cardio:
    "Mix LISS (Low Intensity Steady State) and HIIT. Try 2-3 sessions per week: 20-30 min HIIT or 40-60 min walking/cycling. Don't overdo cardio if building muscle — it can interfere with recovery.",
  recovery:
    "Recovery is when muscles GROW. Prioritize: **7-9 hours sleep**, foam rolling, stretching, rest days between muscle groups. Consider magnesium, zinc, and omega-3 supplements for better recovery.",
  beginner:
    "Welcome! Start with a full-body routine 3x/week: squats, push-ups, rows, lunges, planks. Master form before adding weight. Progress slowly — consistency beats intensity for beginners.",
  supplement:
    "Evidence-based supplements: **Creatine monohydrate** (5g/day — most researched), whey protein for convenience, vitamin D if deficient, caffeine pre-workout. Skip the rest until basics are dialed in.",
  weight:
    "To lose weight: create a calorie deficit of 500 cal/day through diet and exercise. To gain weight: surplus of 300-500 cal/day with strength training. Track your intake with an app for best results.",
  stretch:
    "Dynamic stretching before workouts (leg swings, arm circles). Static stretching after workouts (hold 30-60 sec). Yoga 1-2x/week helps flexibility and recovery. Never stretch cold muscles!",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("workout") || lower.includes("exercise") || lower.includes("train"))
    return FITNESS_RESPONSES.workout;
  if (lower.includes("diet") || lower.includes("eat") || lower.includes("nutrition") || lower.includes("meal"))
    return FITNESS_RESPONSES.diet;
  if (lower.includes("protein")) return FITNESS_RESPONSES.protein;
  if (lower.includes("cardio") || lower.includes("run") || lower.includes("hiit"))
    return FITNESS_RESPONSES.cardio;
  if (lower.includes("recover") || lower.includes("sleep") || lower.includes("rest"))
    return FITNESS_RESPONSES.recovery;
  if (lower.includes("beginner") || lower.includes("start") || lower.includes("new"))
    return FITNESS_RESPONSES.beginner;
  if (lower.includes("supplement") || lower.includes("creatine") || lower.includes("whey"))
    return FITNESS_RESPONSES.supplement;
  if (lower.includes("weight") || lower.includes("lose") || lower.includes("gain") || lower.includes("fat"))
    return FITNESS_RESPONSES.weight;
  if (lower.includes("stretch") || lower.includes("flex") || lower.includes("yoga"))
    return FITNESS_RESPONSES.stretch;
  return FITNESS_RESPONSES.default;
};

const AIChatbot = () => {
  const { user, subscription, openAuthModal } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm your AI Fitness Coach 🏋️ Ask me anything about workouts, nutrition, supplements, or recovery!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleFabClick = () => {
    if (!user) { openAuthModal(); return; }
    if (!subscription) {
      document.getElementById("premium")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setOpen(!open);
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg.content) }]);
      setTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden border border-border card-elevated shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold">AI Fitness Coach</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "user" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-primary-foreground" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {["Best workout?", "Diet tips", "Supplements"].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground hover:text-primary hover:border-primary/30 border border-border transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="p-4 pt-2 border-t border-border">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about fitness..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  onClick={send}
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleFabClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </motion.button>
    </>
  );
};

export default AIChatbot;
