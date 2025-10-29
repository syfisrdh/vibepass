import { Search, Ticket, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse thousands of events across multiple categories and find what speaks to your vibe",
    step: "01",
  },
  {
    icon: Ticket,
    title: "Book",
    description: "Select your tickets, choose your seats, and complete your purchase in just a few clicks",
    step: "02",
  },
  {
    icon: Smartphone,
    title: "Experience",
    description: "Show your digital ticket at the venue and immerse yourself in unforgettable moments",
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to your next adventure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent -translate-y-1/2 -z-10" />
                )}
                
                <div className="text-center bg-background border border-border p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="relative inline-block mb-4">
                    <div className="absolute -inset-4 bg-gradient-primary rounded-full blur-lg opacity-50" />
                    <div className="relative p-6 bg-primary rounded-full">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="text-6xl font-bold gradient-text mb-4 opacity-20">
                    {step.step}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}