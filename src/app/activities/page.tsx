import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchActivitiesContent, fetchActivitiesUpcoming, fetchActivitiesPast, fetchActivitiesAchievements } from "@/lib/content-fetcher";

export default async function ActivitiesPage() {
  const content = await fetchActivitiesContent();
  const upcomingActivities = await fetchActivitiesUpcoming();
  const pastActivities = await fetchActivitiesPast();
  const achievements = await fetchActivitiesAchievements();

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-activities');


  return (
    <div className="flex flex-col">
       <section className="relative w-full h-screen">
        {(content.heroImageUrl || heroImage) && (
          <Image
            src={content.heroImageUrl || heroImage?.imageUrl || ''}
            alt={heroImage?.description || "Club Activities"}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage?.imageHint}
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
              {upcomingActivities.length > 0 ? (
                upcomingActivities.map((activity, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div>
                      {activity["Image Url"] && (
                        <div className="relative h-80 w-full">
                          <Image
                            src={activity["Image Url"]}
                            alt="Upcoming Activity"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>Upcoming Event</CardTitle>
                            <Badge variant="secondary">{activity["Activity Date"]}</Badge>
                          </div>
                          <CardDescription className="pt-2">{activity["Activity Description"]}</CardDescription>
                        </CardHeader>
                        {activity["Activity Link"] && activity["Activity Link"] !== "#" && (
                          <CardFooter>
                            <Button asChild>
                              <Link href={activity["Activity Link"]}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No upcoming activities at the moment.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid gap-6">
              {pastActivities.length > 0 ? (
                pastActivities.map((activity, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{activity.name}</CardTitle>
                        <Badge variant="outline">{activity.date}</Badge>
                      </div>
                      <CardDescription className="pt-2">{activity.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No past activities recorded.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid gap-6">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <Card key={index} className="flex items-center p-4">
                    <Trophy className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge>{achievement.date}</Badge>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No achievements recorded yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
