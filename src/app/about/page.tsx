import Image from "next/image";
import { CheckCircle, Users, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";
import { fetchAboutContent } from "@/lib/content-fetcher";

export default async function AboutPage() {
  const content = await fetchAboutContent();

  const founderImage = PlaceHolderImages.find(p => p.id === 'founder');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-about');

  const benefits = [
    {
      title: "Hands-On Experience",
      description: content.handsOnExperienceText,
      icon: <Rocket className="h-6 w-6 text-primary" />,
    },
    {
      title: "Team Collaboration",
      description: content.teamCollaborationText,
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Career Opportunities",
      description: content.careerOpportunitiesText,
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col">
       <section className="relative w-full h-screen">
        {(content.heroImageUrl || heroImage) && (
          <Image
            src={content.heroImageUrl || heroImage?.imageUrl || ''}
            alt={heroImage?.description || "About REC"}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage?.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            About REC
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            Pioneering innovation and fostering a culture of technical excellence.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-lg py-12 px-4 md:py-20 md:px-6">
        <div className="space-y-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3 items-center">
              <div className="p-8 md:col-span-2">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold">Our Founder</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground">
                    {content.ourFounderText}
                  </p>
                </CardContent>
              </div>
              {(content.ourFounderImageUrl || founderImage) && (
                <div className="relative h-full">
                  <Image
                    src={content.ourFounderImageUrl || founderImage?.imageUrl || ''}
                    alt={founderImage?.description || "Our Founder"}
                    fill
                    className="object-contain"
                    data-ai-hint={founderImage?.imageHint}
                  />
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              {content.ourMissionText}
            </p>
          </div>

          <Separator className="my-8" />

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              {content.ourVisionText}
            </p>
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Why Join Us?</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card key={index} className="flex flex-col items-center p-6 text-center">
                  {benefit.icon}
                  <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
