import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setError("All fields are required.");
      return;
    }
    localStorage.setItem("fitcoach_user", JSON.stringify({ name: signUpData.name, email: signUpData.email }));
    navigate("/");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("fitcoach_user");
    if (!stored) {
      setError("No account found. Please sign up first.");
      return;
    }
    const user = JSON.parse(stored);
    if (user.email !== signInData.email) {
      setError("Invalid email or password.");
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Dumbbell className="w-8 h-8 text-primary" />
            <span className="font-display text-3xl font-bold tracking-wider text-foreground">
              BEAST<span className="text-primary">FIT</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Your AI-powered fitness companion</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-foreground">Welcome</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" onValueChange={() => setError("")}>
              <TabsList className="grid grid-cols-2 w-full bg-secondary">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <Label className="text-foreground">Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-foreground">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary">
                    SIGN IN
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <Label className="text-foreground">Full Name</Label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-foreground">Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-foreground">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-muted border-input text-foreground placeholder:text-muted-foreground"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary">
                    CREATE ACCOUNT
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
