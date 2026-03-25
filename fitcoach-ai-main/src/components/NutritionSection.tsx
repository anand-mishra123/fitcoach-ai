import { motion } from "framer-motion";
import { Apple, Beef, Wheat, Droplets } from "lucide-react";

const meals = [
  {
    time: "BREAKFAST",
    name: "Power Oats Bowl",
    calories: 450,
    protein: 30,
    carbs: 55,
    fat: 12,
    items: ["Oats", "Whey Protein", "Banana", "Almonds", "Honey"],
  },
  {
    time: "LUNCH",
    name: "Grilled Chicken Plate",
    calories: 650,
    protein: 48,
    carbs: 60,
    fat: 20,
    items: ["Chicken Breast", "Brown Rice", "Broccoli", "Avocado"],
  },
  {
    time: "DINNER",
    name: "Salmon & Greens",
    calories: 550,
    protein: 42,
    carbs: 30,
    fat: 28,
    items: ["Salmon Fillet", "Sweet Potato", "Asparagus", "Olive Oil"],
  },
  {
    time: "SNACK",
    name: "Recovery Shake",
    calories: 300,
    protein: 35,
    carbs: 25,
    fat: 8,
    items: ["Whey Isolate", "Peanut Butter", "Milk", "Berries"],
  },
];

const macroIcons = [
  { icon: Beef, label: "Protein", color: "text-red-400" },
  { icon: Wheat, label: "Carbs", color: "text-yellow-400" },
  { icon: Droplets, label: "Fat", color: "text-blue-400" },
];

const NutritionSection = () => {
  return (
    <section id="nutrition" className="py-24 hero-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Meal Plans
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            NUTRITION <span className="text-gradient">GUIDE</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Sample daily meal plan optimized for muscle gain and performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal, i) => (
            <motion.div
              key={meal.time}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
            >
              <span className="text-primary text-xs font-bold tracking-widest">{meal.time}</span>
              <h3 className="font-display text-lg font-bold mt-2">{meal.name}</h3>
              <div className="flex items-center gap-1 mt-2">
                <Apple className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-semibold">{meal.calories} kcal</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 rounded-lg bg-secondary">
                  <div className="font-bold text-sm text-red-400">{meal.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary">
                  <div className="font-bold text-sm text-yellow-400">{meal.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary">
                  <div className="font-bold text-sm text-blue-400">{meal.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                {meal.items.map((item) => (
                  <div key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 card-elevated rounded-xl p-8 border border-border text-center"
        >
          <h3 className="font-display text-2xl font-bold mb-2">Daily Totals</h3>
          <div className="flex justify-center gap-10 mt-4">
            <div>
              <div className="font-display text-3xl font-bold text-primary">1,950</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-red-400">155g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-yellow-400">170g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-blue-400">68g</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionSection;
