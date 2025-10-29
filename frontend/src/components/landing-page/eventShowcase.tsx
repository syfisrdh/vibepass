import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";

const events = [
  {
    title: "Summer Music Festival 🎵",
    date: "July 15-17, 2025",
    location: "Central Park, NY",
    attendees: "15K",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    category: "Music",
  },
  {
    title: "Tech Innovation Summit 💡",
    date: "August 5, 2025",
    location: "Silicon Valley, CA",
    attendees: "3K",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    category: "Technology",
  },
  {
    title: "Food & Wine Festival 🍷",
    date: "September 10-12, 2025",
    location: "Miami Beach, FL",
    attendees: "8K",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "Food",
  },
  {
    title: "Comedy Night Special 😂",
    date: "July 28, 2025",
    location: "Chicago, IL",
    attendees: "2K",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    category: "Comedy",
  },
  {
    title: "Art & Culture Expo 🎨",
    date: "August 20-22, 2025",
    location: "Boston, MA",
    attendees: "5K",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    category: "Art",
  },
  {
    title: "Sports Championship 🏆",
    date: "September 1, 2025",
    location: "Los Angeles, CA",
    attendees: "20K",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    category: "Sports",
  },
];

export function EventsShowcase() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trending <span className="text-primary">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these incredible experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {events.map((event, index) => (
            <Card
              key={event.title}
              className="overflow-hidden border-border/50 hover:scale-105 transition-transform duration-300 group py-0 gap-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  width={0}
                  height={0}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary rounded-full text-xs font-medium text-white">
                  {event.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.attendees} attending
                  </div>
                </div>
                <Button className="w-full bg-primary hover:opacity-90 transition-opacity">
                  Get Tickets
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-border/50 hover:bg-secondary rounded-xl">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}