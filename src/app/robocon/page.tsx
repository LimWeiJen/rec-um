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

const departments = [
  { name: "Mechanical Team", icon: <Wrench className="h-5 w-5 text-primary" />, description: "Designs and fabricates the robot's structure, ensuring durability and agility." },
  { name: "Electrical Team", icon: <Cpu className="h-5 w-5 text-primary" />, description: "Manages all wiring, power distribution, and sensor integration." },
  { name: "Programming Team", icon: <Code className="h-5 w-5 text-primary" />, description: "Develops the robot's control software, from autonomous logic to manual controls." },
];

const roboconAchievements = [
  { title: "National Champions", year: "2022" },
  { title: "Best Innovative Design", year: "2021" },
  { title: "Quarter-finalists", year: "2023" },
];

export default function RoboconPage() {
  const prepImage = PlaceHolderImages.find(p => p.id === 'robocon-prep');
  const achievementImage = PlaceHolderImages.find(p => p.id === 'robocon-achievement');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-robocon');

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
              <p>
                ABU Robocon is an annual international robotics competition for undergraduate students in the Asia-Pacific region. Each year, a new theme and set of challenges are released, requiring teams to design and build multiple robots to complete complex tasks autonomously and manually within a time limit.
              </p>
              <p>
                It's a test of engineering skill, teamwork, and strategy, pushing teams to innovate and perform under pressure.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">How We Prepare</AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-muted-foreground space-y-4">
                  <p>Our preparation is a year-long cycle of dedication and hard work. It involves:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" /><span><strong>Brainstorming & Strategy:</strong> Analyzing the year's theme and devising a winning strategy.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" /><span><strong>Prototyping:</strong> Rapidly testing different mechanisms and designs.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" /><span><strong>Manufacturing & Assembly:</strong> Precisely building the final robots.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" /><span><strong>Testing & Refinement:</strong> Rigorous testing and code optimization to ensure peak performance.</span></li>
                  </ul>
                </div>
                {prepImage && (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image src={prepImage.imageUrl} alt={prepImage.description} fill className="object-cover" data-ai-hint={prepImage.imageHint} />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">Team Departments</AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                {departments.map(dept => (
                  <div key={dept.name} className="flex items-start gap-4 p-4 border rounded-lg bg-card/50">
                    {dept.icon}
                    <div>
                      <h4 className="font-semibold">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">Our Robocon Achievements</AccordionTrigger>
            <AccordionContent className="pt-2">
               <div className="grid md:grid-cols-2 gap-8 items-center">
                {achievementImage && (
                    <div className="relative h-64 rounded-lg overflow-hidden order-last md:order-first">
                      <Image src={achievementImage.imageUrl} alt={achievementImage.description} fill className="object-cover" data-ai-hint={achievementImage.imageHint} />
                    </div>
                )}
                <div className="space-y-3">
                  {roboconAchievements.map(ach => (
                    <div key={ach.title} className="flex items-center gap-4 p-3 bg-card/50 rounded-lg">
                      <Trophy className="h-6 w-6 text-primary flex-shrink-0" />
                      <p className="font-medium flex-grow">{ach.title}</p>
                      <Badge>{ach.year}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
