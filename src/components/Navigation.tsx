import { useState } from "react";
import { Button } from "@/components/ui/button"; // You will create this file next
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Placeholder function for future navigation
  const handleAuthNav = (path: string) => {
    console.log(`Maps to ${path}`);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logotype */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-serif font-bold text-foreground">
              The Verdict
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => handleAuthNav('/login')}>
              Log In
            </Button>
            <Button onClick={() => handleAuthNav('/signup')}>
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" onClick={() => handleAuthNav('/login')}>
                Log In
              </Button>
              <Button className="w-full" onClick={() => handleAuthNav('/signup')}>
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};