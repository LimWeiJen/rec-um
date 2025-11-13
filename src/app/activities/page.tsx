import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const upcomingActivities = [
  { title: "Annual Robotics Expo", date: "Oct 25, 2024", description: "Showcasing our latest projects and innovations to the university community.", imageUrlId: 'activity-2', link: '#' },
];

const pastActivities = [
  { title: "National Robocon 2023", date: "Aug 15, 2023", description: "Competed against top universities, showcasing our autonomous robot 'Phoenix'." },
  { title: "TechKriti Festival", date: "Mar 20, 2023", description: "Participated in various robotics challenges and won 'Best Design'." },
  { title: "Guest Lecture: AI in Robotics", date: "Feb 05, 2023", description: "Hosted an insightful session with a leading AI researcher." },
];

const achievements = [
  { title: "Winner, National Robocon 2022", year: "2022", description: "Secured the first position with our robot 'Atlas'." },
  { title: "Best Design Award, TechFest 2023", year: "2023", description: "Recognized for innovative mechanical design." },
  { title: "Runners Up, Inter-University Robotics Challenge", year: "2021", description: "Achieved second place in a tough competition." },
];

export default function ActivitiesPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-activities');
  const upcomingActivityImage = PlaceHolderImages.find(p => p.id === upcomingActivities[0].imageUrlId);


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
            Club Activities & Achievements
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            A glimpse into our journey of learning, building, and competing.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-lg py-12 px-4 md:py-20 md:px-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming"><Zap className="mr-2 h-4 w-4" />Upcoming</TabsTrigger>
            <TabsTrigger value="past"><Calendar className="mr-2 h-4 w-4" />Past</TabsTrigger>
            <TabsTrigger value="achievements"><Trophy className="mr-2 h-4 w-4" />Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-6">
              {upcomingActivities.map((activity, index) => (
                <Card key={index} className="overflow-hidden">
                  <div>
                    {upcomingActivityImage && (
                      <div className="relative h-80 w-full">
                        <Image
                          src={upcomingActivityImage.imageUrl}
                          alt={activity.title}
                          fill
                          className="object-cover"
                          data-ai-hint={upcomingActivityImage.imageHint}
                        />
                      </div>
                    )}
                    <div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{activity.title}</CardTitle>
                          <Badge variant="secondary">{activity.date}</Badge>
                        </div>
                        <CardDescription className="pt-2">{activity.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                         <Button asChild>
                            <Link href={activity.link}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid gap-6">
              {pastActivities.map((activity, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant="outline">{activity.date}</Badge>
                    </div>
                    <CardDescription className="pt-2">{activity.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="flex items-center p-4">
                  <Trophy className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge>{achievement.year}</Badge>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
