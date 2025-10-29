import { Zap, Shield, Smartphone, Sparkles, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Book your tickets in seconds with our streamlined checkout process",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Bank-grade encryption keeps your data and payments protected",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your tickets anywhere with our mobile-optimized platform",
  },
  {
    icon: Sparkles,
    title: "Exclusive Access",
    description: "Get early bird access to the hottest events before they sell out",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help with any questions",
  },
  {
    icon: Heart,
    title: "Best Prices",
    description: "No hidden fees. Just transparent, fair pricing every time",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">Vibe Pass</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just selling tickets - we're creating experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary rounded-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}