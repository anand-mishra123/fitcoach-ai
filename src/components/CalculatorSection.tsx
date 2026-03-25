import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Activity } from "lucide-react";

const CalculatorSection = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("moderate");
  const [bmi, setBmi] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const a = parseFloat(age);
    if (!h || !w || !a) return;

    const bmiVal = w / (h * h);
    setBmi(Math.round(bmiVal * 10) / 10);

    let bmr = gender === "male"
      ? 10 * w + 6.25 * parseFloat(height) - 5 * a + 5
      : 10 * w + 6.25 * parseFloat(height) - 5 * a - 161;

    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };
    setCalories(Math.round(bmr * (multipliers[activity] || 1.55)));
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal", color: "text-primary" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-destructive" };
  };

  return (
    <section id="calculator" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">Tools</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            FITNESS <span className="text-gradient">CALCULATOR</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-elevated rounded-xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-bold">Your Stats</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="75"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Activity Level</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="active">Very Active</option>
                    <option value="extreme">Extremely Active</option>
                  </select>
                </div>
                <button
                  onClick={calculate}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Calculate
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-elevated rounded-xl p-8 border border-border flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-bold">Results</h3>
              </div>

              {bmi !== null && calories !== null ? (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">BMI</p>
                    <div className="font-display text-5xl font-bold text-primary">{bmi}</div>
                    <p className={`text-sm font-semibold mt-1 ${getBmiCategory(bmi).color}`}>
                      {getBmiCategory(bmi).label}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Daily Calories</p>
                    <div className="font-display text-5xl font-bold text-primary">{calories}</div>
                    <p className="text-sm text-muted-foreground mt-1">kcal / day (maintenance)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-display text-lg font-bold text-destructive">{calories - 500}</div>
                      <div className="text-xs text-muted-foreground">Cut</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-display text-lg font-bold text-primary">{calories}</div>
                      <div className="text-xs text-muted-foreground">Maintain</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-display text-lg font-bold text-blue-400">{calories + 300}</div>
                      <div className="text-xs text-muted-foreground">Bulk</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Enter your details and click Calculate</p>
                </div>
              )}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
