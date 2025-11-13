import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const teamMembers = [
  { name: "Alex Dynamo", role: "Club Director", imageUrlId: "team-member-1" },
  { name: "Brenda Circuit", role: "Head of Mechanical", imageUrlId: "team-member-2" },
  { name: "Charlie Gear", role: "Head of Electrical", imageUrlId: "team-member-3" },
  { name: "Dana Logic", role: "Head of Programming", imageUrlId: "team-member-4" },
];

const pastDirectors = [
    { name: "Edward Volt", term: "2022-2023", imageUrlId: "past-director-1" },
    { name: "Fiona Servo", term: "2021-2022", imageUrlId: "past-director-2" },
    { name: "George Piston", term: "2020-2021", imageUrlId: "past-director-3" },
];

export default function OrganizationPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-organization');

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
            Our Organization
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            The talented individuals driving our club forward.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-lg py-12 px-4 md:py-20 md:px-6">
        <div className="space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Current Team Hierarchy</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => {
                const memberImage = PlaceHolderImages.find(p => p.id === member.imageUrlId);
                return (
                  <Card key={member.name} className="text-center border-2 border-transparent hover:border-primary/80 hover:shadow-lg transition-all transform hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center pt-6">
                      <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/50">
                        {memberImage && (
                          <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />
                        )}
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary">{member.role}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Past Directors</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {pastDirectors.map((director) => {
                  const directorImage = PlaceHolderImages.find(p => p.id === director.imageUrlId);
                  return (
                    <Card key={director.name} className="overflow-hidden text-center">
                      <div className="relative h-56 w-full">
                        {directorImage && (
                          <Image
                            src={directorImage.imageUrl}
                            alt={director.name}
                            fill
                            className="object-cover"
                            data-ai-hint={directorImage.imageHint}
                          />
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{director.name}</h3>
                        <p className="text-sm text-muted-foreground">{director.term}</p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
