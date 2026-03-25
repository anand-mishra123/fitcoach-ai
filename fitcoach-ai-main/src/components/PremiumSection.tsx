import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Star } from "lucide-react";

const plans = [
  {
    name: "STARTER",
    price: "Free",
    period: "",
    features: [
      "5 Workout Plans",
      "Basic Progress Tracking",
      "Community Access",
      "Exercise Library",
    ],
    highlight: false,
    icon: Star,
  },
  {
    name: "BEAST PRO",
    price: "$12",
    period: "/month",
    features: [
      "Unlimited Workout Plans",
      "AI Personal Trainer",
      "Advanced Analytics",
      "Custom Meal Plans",
      "Priority Support",
      "Offline Mode",
    ],
    highlight: true,
    icon: Crown,
  },
  {
    name: "ELITE",
    price: "$29",
    period: "/month",
    features: [
      "Everything in Pro",
      "1-on-1 Coaching Calls",
      "Personalized Programs",
      "Recovery Protocols",
      "DNA-Based Training",
      "VIP Community",
      "Early Feature Access",
    ],
    highlight: false,
    icon: Sparkles,
  },
];

const PremiumSection = () => {
  return (
    <section id="premium" className="py-24 hero-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Premium Plans
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            GO <span className="text-gradient">PREMIUM</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Unlock your full potential with AI-powered features and expert coaching
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "border-primary glow-primary card-elevated scale-105"
                  : "border-border card-elevated hover:border-primary/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <plan.icon className={`w-8 h-8 mb-4 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />

              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <div className="mt-3 mb-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-secondary-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-opacity ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
