import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, ChevronLeft, Play, Pause, SkipForward, CheckCircle2, Dumbbell, Trophy } from "lucide-react";

const workoutData: Record<string, {
  title: string;
  duration: number;
  calories: string;
  exercises: { name: string; sets: number; reps: string; rest: number }[];
}> = {
  strength: {
    title: "STRENGTH",
    duration: 45,
    calories: "450",
    exercises: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", rest: 90 },
      { name: "Deadlift", sets: 4, reps: "6-8", rest: 120 },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: 90 },
      { name: "Overhead Press", sets: 3, reps: "10-12", rest: 60 },
      { name: "Barbell Row", sets: 3, reps: "10-12", rest: 60 },
      { name: "Plank Hold", sets: 3, reps: "45 sec", rest: 30 },
    ],
  },
  "hiit-cardio": {
    title: "HIIT CARDIO",
    duration: 30,
    calories: "600",
    exercises: [
      { name: "Box Jumps", sets: 4, reps: "15", rest: 30 },
      { name: "Burpees", sets: 4, reps: "12", rest: 30 },
      { name: "Mountain Climbers", sets: 4, reps: "20 each", rest: 20 },
      { name: "Sprint Intervals", sets: 6, reps: "30 sec", rest: 30 },
      { name: "Jump Squats", sets: 4, reps: "15", rest: 30 },
      { name: "High Knees", sets: 4, reps: "30 sec", rest: 20 },
    ],
  },
  "yoga-flow": {
    title: "YOGA FLOW",
    duration: 60,
    calories: "250",
    exercises: [
      { name: "Sun Salutation", sets: 3, reps: "5 breaths", rest: 10 },
      { name: "Warrior I & II", sets: 2, reps: "30 sec each", rest: 10 },
      { name: "Triangle Pose", sets: 2, reps: "30 sec each", rest: 10 },
      { name: "Tree Pose Balance", sets: 2, reps: "45 sec each", rest: 10 },
      { name: "Pigeon Pose", sets: 2, reps: "60 sec each", rest: 10 },
      { name: "Savasana", sets: 1, reps: "5 min", rest: 0 },
    ],
  },
};

const WorkoutSession = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const workout = workoutData[slug || ""];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  // Main timer
  useEffect(() => {
    if (isPaused || finished) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [isPaused, finished]);

  // Rest timer
  useEffect(() => {
    if (!isResting || isPaused) return;
    if (restTimer <= 0) {
      setIsResting(false);
      return;
    }
    const id = setInterval(() => setRestTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isResting, restTimer, isPaused]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleCompleteSet = useCallback(() => {
    if (!workout) return;
    const ex = workout.exercises[currentExercise];

    if (currentSet < ex.sets) {
      setCurrentSet((s) => s + 1);
      if (ex.rest > 0) {
        setRestTimer(ex.rest);
        setIsResting(true);
      }
    } else {
      setCompleted((c) => [...c, currentExercise]);
      if (currentExercise < workout.exercises.length - 1) {
        setCurrentExercise((e) => e + 1);
        setCurrentSet(1);
        setRestTimer(ex.rest);
        setIsResting(true);
      } else {
        setFinished(true);
      }
    }
  }, [workout, currentExercise, currentSet]);

  const skipRest = () => {
    setRestTimer(0);
    setIsResting(false);
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Workout not found</p>
          <button onClick={() => navigate("/")} className="mt-4 text-primary underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground">WORKOUT COMPLETE!</h1>
          <p className="text-muted-foreground mt-3">You crushed it! 💪</p>

          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{formatTime(elapsed)}</p>
              <p className="text-xs text-muted-foreground mt-1">Duration</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{workout.exercises.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Exercises</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">~{workout.calories}</p>
              <p className="text-xs text-muted-foreground mt-1">Calories</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-10 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const exercise = workout.exercises[currentExercise];
  const progress = ((completed.length) / workout.exercises.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" /> Exit
          </button>
          <h1 className="font-display text-lg font-bold">{workout.title}</h1>
          <div className="flex items-center gap-1 text-primary font-mono text-lg font-bold">
            <Clock className="w-4 h-4" /> {formatTime(elapsed)}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="container py-8 max-w-2xl mx-auto">
        {/* Current exercise */}
        <AnimatePresence mode="wait">
          {isResting ? (
            <motion.div
              key="rest"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Rest</p>
              <p className="text-7xl font-display font-bold text-primary mt-4">{restTimer}s</p>
              <p className="text-muted-foreground mt-4">Next: Set {currentSet} of {exercise.name}</p>
              <button
                onClick={skipRest}
                className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition"
              >
                <SkipForward className="w-4 h-4" /> Skip Rest
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`exercise-${currentExercise}-${currentSet}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Dumbbell className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                Exercise {currentExercise + 1} of {workout.exercises.length}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">{exercise.name}</h2>
              <div className="flex justify-center gap-6 mt-6 text-muted-foreground text-sm">
                <span>Set <span className="text-primary font-bold text-lg">{currentSet}</span> / {exercise.sets}</span>
                <span>Reps: <span className="text-primary font-bold text-lg">{exercise.reps}</span></span>
              </div>

              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={() => setIsPaused((p) => !p)}
                  className="p-4 rounded-full bg-muted text-foreground hover:bg-muted/80 transition"
                >
                  {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                </button>
                <button
                  onClick={handleCompleteSet}
                  className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exercise list */}
        <div className="mt-8 border-t border-border pt-8">
          <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">All Exercises</h3>
          <div className="space-y-3">
            {workout.exercises.map((ex, i) => (
              <div
                key={ex.name}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  i === currentExercise
                    ? "bg-primary/10 border border-primary/30"
                    : completed.includes(i)
                    ? "opacity-50"
                    : "bg-card border border-border"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  completed.includes(i) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {completed.includes(i) ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{ex.name}</p>
                  <p className="text-xs text-muted-foreground">{ex.sets} sets × {ex.reps}</p>
                </div>
                {i === currentExercise && (
                  <span className="text-xs text-primary font-semibold uppercase">Current</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-8 p-4 rounded-xl bg-card border border-border flex justify-around text-center">
          <div>
            <Flame className="w-5 h-5 text-primary mx-auto" />
            <p className="text-lg font-bold mt-1">~{Math.round((elapsed / (workout.duration * 60)) * parseInt(workout.calories))}</p>
            <p className="text-xs text-muted-foreground">Cal burned</p>
          </div>
          <div>
            <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
            <p className="text-lg font-bold mt-1">{completed.length}/{workout.exercises.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div>
            <Clock className="w-5 h-5 text-primary mx-auto" />
            <p className="text-lg font-bold mt-1">{formatTime(elapsed)}</p>
            <p className="text-xs text-muted-foreground">Elapsed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
