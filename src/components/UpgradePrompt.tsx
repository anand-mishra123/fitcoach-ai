import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const UpgradePrompt = () => {
  const { openAuthModal, user } = useAuth();

  const handleClick = () => {
    if (!user) { openAuthModal(); return; }
    document.getElementById("premium")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Lock className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground">Premium Feature</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Subscribe to <span className="text-primary font-semibold">Beast Pro</span> or <span className="text-primary font-semibold">Elite</span> to unlock this section.
      </p>
      <Button onClick={handleClick} className="bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary">
        UPGRADE NOW
      </Button>
    </div>
  );
};

export default UpgradePrompt;
