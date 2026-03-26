import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Crown, Sparkles, CheckCircle2 } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  priceId: string;
  amountInPaise: number;
}

interface PaymentModalProps {
  plan: Plan | null;
  onClose: () => void;
}

// Load Razorpay script dynamically
const loadRazorpay = (): Promise<boolean> =>
  new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentModal = ({ plan, onClose }: PaymentModalProps) => {
  const { subscribe } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handlePayment = async () => {
    setLoading(true);
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      setLoading(false);
      return;
    }

    const user = JSON.parse(localStorage.getItem("fitcoach_user") || "{}");

    const options = {
      // Replace with your Razorpay Key ID from https://dashboard.razorpay.com
      key: "rzp_test_YOUR_RAZORPAY_KEY_ID",
      amount: plan!.amountInPaise, // amount in paise (e.g. 99900 = ₹999)
      currency: "USD",
      name: "BeastFit AI",
      description: `${plan!.name} Subscription`,
      image: "/favicon.ico",
      // In production: generate order_id from your backend using Razorpay Orders API
      // order_id: "order_xxxx",
      prefill: {
        name: user.name || "",
        email: user.email || "",
      },
      theme: {
        color: "#84cc16", // matches --primary (lime green)
      },
      handler: (response: any) => {
        subscribe(plan!.name as "BEAST PRO" | "ELITE", response.razorpay_payment_id);
        setLoading(false);
        setSuccess(true);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", () => {
      setLoading(false);
      alert("Payment failed. Please try again.");
    });
    rzp.open();
  };

  return (
    <Dialog open={!!plan} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm">
              Welcome to <span className="text-primary font-semibold">{plan?.name}</span>. Your subscription is now active.
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary w-full"
            >
              START TRAINING
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground font-display tracking-wide">Complete Your Purchase</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Secure payment powered by Razorpay.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 mt-1">
              {/* Plan summary */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  {plan?.name === "BEAST PRO"
                    ? <Crown className="w-5 h-5 text-primary" />
                    : <Sparkles className="w-5 h-5 text-primary" />}
                  <div>
                    <p className="font-display font-bold text-foreground text-sm">{plan?.name}</p>
                    <p className="text-xs text-muted-foreground">Billed monthly · Cancel anytime</p>
                  </div>
                </div>
                <span className="font-display text-xl font-bold text-primary">
                  {plan?.price}<span className="text-xs text-muted-foreground font-normal">{plan?.period}</span>
                </span>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                You'll be redirected to Razorpay's secure checkout to complete your payment.
              </p>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-wide glow-primary disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Opening Razorpay...
                  </span>
                ) : (
                  `Pay ${plan?.price}${plan?.period}`
                )}
              </Button>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" /> SSL Secured
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" /> 256-bit Encryption
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
