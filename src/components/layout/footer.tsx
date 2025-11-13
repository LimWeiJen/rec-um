import { Bot } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            REC Robotics Hub
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
