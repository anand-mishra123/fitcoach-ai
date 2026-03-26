import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";

const AuthModal = () => {
  const { isModalOpen, closeAuthModal, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    const err = await login(signUpData.name, signUpData.email, signUpData.password, true);
    setLoading(false);
    if (err) setError(err);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    const err = await login("", signInData.email, signInData.password, false);
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) { closeAuthModal(); setError(""); } }}>
      <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span className="font-display text-2xl font-bold tracking-wider">
              BEAST<span className="text-primary">FIT</span>
            </span>
          </div>
          <DialogTitle className="text-center text-foreground">Welcome</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Sign in or create an account to continue
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" onValueChange={() => setError("")}>
          <TabsList className="grid grid-cols-2 w-full bg-secondary">
            <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 mt-4">
              <div className="space-y-1">
                <Label className="text-foreground">Email</Label>
                <Input type="email" placeholder="you@example.com"
                  className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-foreground">Password</Label>
                <Input type="password" placeholder="••••••••"
                  className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary disabled:opacity-60">
                {loading ? "Signing in..." : "SIGN IN"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-1">
                <Label className="text-foreground">Full Name</Label>
                <Input type="text" placeholder="John Doe"
                  className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-foreground">Email</Label>
                <Input type="email" placeholder="you@example.com"
                  className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-foreground">Password</Label>
                <Input type="password" placeholder="••••••••"
                  className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary disabled:opacity-60">
                {loading ? "Creating account..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
