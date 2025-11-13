import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Target, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const quickLinks = [
  {
    title: "About Us",
    description: "Learn about our mission and founder.",
    href: "/about",
    icon: <Info className="h-8 w-8 text-primary" />,
  },
  {
    title: "Our Team",
    description: "Meet the minds behind the machines.",
    href: "/organization",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "Activities",
    description: "See our past and upcoming events.",
    href: "/activities",
    icon: <Trophy className="h-8 w-8 text-primary" />,
  },
  {
    title: "Robocon",
    description: "Explore our journey in the Robocon competition.",
    href: "/robocon",
    icon: <Target className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto flex h-full max-w-screen-2xl flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Welcome to REC Robotics Hub
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            At the forefront of innovation, our club is dedicated to exploring the fascinating world of robotics, fostering teamwork, and pushing the boundaries of technology.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/about">
                Discover More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Card key={link.title} className="hover:border-primary/80 hover:shadow-lg transition-all transform hover:-translate-y-1 bg-card">
                <Link href={link.href} className="flex flex-col h-full p-6">
                    <div className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                        {link.icon}
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
