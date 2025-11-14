import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, Cpu, Wrench, Code, Trophy } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRoboconContent, fetchRoboconAchievements } from "@/lib/content-fetcher";

export default async function RoboconPage() {
  const content = await fetchRoboconContent();
  const roboconAchievements = await fetchRoboconAchievements();

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-robocon');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen">
        {(content.heroImageUrl || heroImage) && (
          <Image
            src={content.heroImageUrl || heroImage?.imageUrl || ''}
            alt={heroImage?.description || "Robocon"}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage?.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Focus: Robocon
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            Our journey in Asia-Pacific's premier robotics competition.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-lg py-12 px-4 md:py-20 md:px-6">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">What is Robocon?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4 pt-2">
              <p>{content.whatIsRoboconText}</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">How We Prepare</AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-muted-foreground space-y-4">
                  <p>{content.howWePrepareText}</p>
                </div>
                {content.howWePrepareImageUrl && (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image src={content.howWePrepareImageUrl} alt="How We Prepare" fill className="object-cover" />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">Team Departments</AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden group">
                  {content.mechanicalTeamImageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={content.mechanicalTeamImageUrl}
                        alt="Mechanical Team"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-lg">Mechanical Team</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{content.mechanicalTeamText}</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden group">
                  {content.electricalTeamImageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={content.electricalTeamImageUrl}
                        alt="Electrical Team"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-lg">Electrical Team</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{content.electricalTeamText}</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden group">
                  {content.programmingTeamImageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={content.programmingTeamImageUrl}
                        alt="Programming Team"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-lg">Programming Team</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{content.programmingTeamText}</p>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">Our Robocon Achievements</AccordionTrigger>
            <AccordionContent className="pt-2">
              {roboconAchievements.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {roboconAchievements.map((ach, index) => (
                    <Card key={index} className="overflow-hidden group text-center">
                      {ach["image-url"] && (
                        <div className="relative h-56 w-full">
                          <Image
                            src={ach["image-url"]}
                            alt={ach.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">{ach.name}</h4>
                        <Badge variant="secondary" className="mt-1">{ach.date}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No achievements recorded yet.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
