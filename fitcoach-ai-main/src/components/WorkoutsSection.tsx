import { motion } from "framer-motion";
import { Clock, Flame, Zap, Heart } from "lucide-react";
import strengthImg from "@/assets/workout-strength.jpg";
import cardioImg from "@/assets/workout-cardio.jpg";
import yogaImg from "@/assets/workout-yoga.jpg";

const workouts = [
  {
    title: "STRENGTH",
    subtitle: "Build Power",
    duration: "45 min",
    calories: "450",
    level: "Intermediate",
    image: strengthImg,
    icon: Zap,
    exercises: ["Barbell Squat", "Deadlift", "Bench Press", "Overhead Press"],
  },
  {
    title: "HIIT CARDIO",
    subtitle: "Burn Fat",
    duration: "30 min",
    calories: "600",
    level: "Advanced",
    image: cardioImg,
    icon: Flame,
    exercises: ["Box Jumps", "Burpees", "Mountain Climbers", "Sprint Intervals"],
  },
  {
    title: "YOGA FLOW",
    subtitle: "Recover & Flex",
    duration: "60 min",
    calories: "250",
    level: "All Levels",
    image: yogaImg,
    icon: Heart,
    exercises: ["Sun Salutation", "Warrior Series", "Balance Poses", "Deep Stretch"],
  },
];

const WorkoutsSection = () => {
  return (
    <section id="workouts" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Programs
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            WORKOUT <span className="text-gradient">PLANS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Choose from expert-designed programs tailored to your fitness goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {workouts.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group card-elevated rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-4 right-4 p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                  <w.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">{w.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{w.subtitle}</p>

                <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {w.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-primary" /> {w.calories} cal
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {w.exercises.map((ex) => (
                    <div
                      key={ex}
                      className="text-sm text-secondary-foreground flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {ex}
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                  Start Workout
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutsSection;
