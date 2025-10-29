import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { Sparkles, Ticket } from "lucide-react";
import "@/app/globals.css";    

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles className="absolute inset-0" quantity={150} ease={80} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
      
      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-glass backdrop-blur-md backdrop-saturate-150 border border-border/20 rounded-2xl shadow-sm">
          <Sparkles className="w-4 h-4 text-primary-glow" />
          <span className="text-sm font-medium">Your Gateway to Amazing Events</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
          Experience the
          <span className="block text-primary">Vibe Pass</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in">
          🎉 Your ultimate ticket to unforgettable moments. Discover, book, and attend the hottest events in town with just a few clicks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
            <Ticket className="mr-2 h-5 w-5" />
            Get Your Pass
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-5.5 rounded-xl">
            Explore Events
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "Events", value: "1000+", emoji: "🎪" },
            { label: "Happy Attendees", value: "50K+", emoji: "😊" },
            { label: "Cities", value: "25+", emoji: "🌆" },
            { label: "Satisfaction", value: "98%", emoji: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl border border-border">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}