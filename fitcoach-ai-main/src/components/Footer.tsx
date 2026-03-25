import { Dumbbell } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-card border-t border-border">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-primary" />
          <span className="font-display text-lg font-bold">
            BEAST<span className="text-primary">FIT</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 BeastFit. All rights reserved. Train hard, stay consistent.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
