import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Target, Info, Instagram, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'founder');
  const teamImage = PlaceHolderImages.find(p => p.id === 'team-member-1');
  const activityImage = PlaceHolderImages.find(p => p.id === 'activity-1');
  const roboconImage = PlaceHolderImages.find(p => p.id === 'robocon-prep');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen">
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
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-4">
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

      <div className="container mx-auto max-w-screen-lg py-12 px-4 md:py-20 md:px-6 space-y-20">
        
        {/* About Us Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {aboutImage && (
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline">About Us</h2>
            <p className="text-muted-foreground">
              Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics, develop technical and leadership skills, and collaborate on innovative projects that solve real-world problems.
            </p>
            <Button asChild>
              <Link href="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 md:order-2">
            <h2 className="text-3xl font-bold font-headline">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the talented and dedicated individuals who form the backbone of our club. Our team is a diverse group of students passionate about pushing the boundaries of robotics and innovation.
            </p>
            <Button asChild>
              <Link href="/organization">
                Meet the Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {teamImage && (
            <div className="relative h-80 rounded-lg overflow-hidden md:order-1">
              <Image
                src={teamImage.imageUrl}
                alt={teamImage.description}
                fill
                className="object-cover"
                data-ai-hint={teamImage.imageHint}
              />
            </div>
          )}
        </section>

        {/* Activities Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {activityImage && (
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={activityImage.imageUrl}
                alt={activityImage.description}
                fill
                className="object-cover"
                data-ai-hint={activityImage.imageHint}
              />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline">Activities</h2>
            <p className="text-muted-foreground">
              From workshops and guest lectures to fierce competitions, there's always something happening at REC Robotics. Check out our past events and see what we have planned for the future.
            </p>
            <Button asChild>
              <Link href="/activities">
                View Activities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Robocon Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 md:order-2">
            <h2 className="text-3xl font-bold font-headline">Robocon</h2>
            <p className="text-muted-foreground">
              We are passionate competitors in the annual ABU Robocon. Explore our journey, our strategies, and our achievements in this prestigious Asia-Pacific robotics competition.
            </p>
            <Button asChild>
              <Link href="/robocon">
                Explore Robocon <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {roboconImage && (
            <div className="relative h-80 rounded-lg overflow-hidden md:order-1">
              <Image
                src={roboconImage.imageUrl}
                alt={roboconImage.description}
                fill
                className="object-cover"
                data-ai-hint={roboconImage.imageHint}
              />
            </div>
          )}
        </section>

      </div>

      <section className="py-12 md:py-20 bg-muted/40">
        <div className="container mx-auto max-w-screen-2xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Get In Touch</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Follow our journey, get the latest updates, and connect with us on social media.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg" variant="outline">
                    <Link href="#" target="_blank">
                        <Instagram className="mr-2 h-5 w-5" />
                        Instagram
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="#" target="_blank">
                        <Facebook className="mr-2 h-5 w-5" />
                        Facebook
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
