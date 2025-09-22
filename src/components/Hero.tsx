import { useState } from "react";
import { Search, Star, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroProps {
  onSearch: (searchTerm: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };

  return (
    <section id="hero" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
              Shop Smarter, Not Harder.
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground">
              Your AI Expert for Unbiased Product Reviews.
            </p>
          </div>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch} 
            className="w-full max-w-xl mx-auto flex items-center gap-2 p-2 bg-card border rounded-full shadow-lg"
          >
            <Search className="w-5 h-5 ml-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for any product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-transparent border-none focus:ring-0 text-lg h-auto py-2"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="text-lg rounded-full px-8 py-4 group h-auto"
            >
              Find Your Verdict
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
              <Star className="w-4 h-4 text-primary" />
              <span className="font-medium">AI-Powered Scores</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium">Clear Pros & Cons</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="font-medium">Best Alternatives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};