import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import "@/app/globals.css";    

export function CallToAction() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="bg-glass p-12 md:p-16 rounded-3xl text-center max-w-4xl mx-auto glow-primary">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-glass backdrop-blur-md backdrop-saturate-150 border border-border/20 rounded-2xl shadow-sm">
            <Sparkles className="w-4 h-4 text-primary-glow" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Feel the <span className="text-">Vibe</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy attendees and start creating unforgettable memories today. Your next adventure is just one click away! 🚀
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:opacity-90 transition-opacity rounded-xl">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border/50 hover:bg-secondary rounded-xl">
              Learn More
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by event-goers worldwide</p>
            <div className="flex justify-center gap-8 flex-wrap">
              {["⭐⭐⭐⭐⭐", "4.9/5 Rating", "50K+ Users", "1000+ Events"].map((item) => (
                <div key={item} className="text-sm font-medium">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}