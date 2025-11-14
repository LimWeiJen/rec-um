import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchOrganizationContent, fetchOrganizationHierarchy, fetchOrganizationPastDirectors } from "@/lib/content-fetcher";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default async function OrganizationPage() {
  const content = await fetchOrganizationContent();
  const hierarchyMembers = await fetchOrganizationHierarchy();
  const pastDirectors = await fetchOrganizationPastDirectors();

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-organization');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen">
        {(content.heroImageUrl || heroImage) && (
          <Image
            src={content.heroImageUrl || heroImage?.imageUrl || ''}
            alt={heroImage?.description || "Our Organization"}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage?.imageHint}
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
            {hierarchyMembers.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {hierarchyMembers.map((member) => {
                  const hasValidLinks = (member["ig-link"] && member["ig-link"] !== "#") ||
                                       (member["ws-link"] && member["ws-link"] !== "#") ||
                                       (member["linkedin-link"] && member["linkedin-link"] !== "#");

                  return (
                    <Card key={member.name} className="text-center border-2 border-transparent hover:border-primary/80 hover:shadow-lg transition-all transform hover:-translate-y-1">
                      <CardContent className="flex flex-col items-center pt-6">
                        <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/50">
                          {member["img-url"] && (
                            <AvatarImage className="object-cover" src={member["img-url"]} alt={member.name} />
                          )}
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-muted-foreground">{member.position}</p>
                        {member.description && (
                          <p className="text-sm text-muted-foreground mt-2">{member.description}</p>
                        )}
                        {hasValidLinks && (
                          <div className="flex gap-4 mt-4 text-muted-foreground">
                            {member["ig-link"] && member["ig-link"] !== "#" && (
                              <Link href={member["ig-link"]} target="_blank" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                              </Link>
                            )}
                            {member["ws-link"] && member["ws-link"] !== "#" && (
                              <Link href={member["ws-link"]} target="_blank" className="hover:text-primary transition-colors">
                                <WhatsAppIcon className="h-5 w-5" />
                              </Link>
                            )}
                            {member["linkedin-link"] && member["linkedin-link"] !== "#" && (
                              <Link href={member["linkedin-link"]} target="_blank" className="hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                              </Link>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No team members available at the moment.</p>
            )}
          </div>

          {pastDirectors.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Past Directors</h2>
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {pastDirectors.map((director) => (
                  <Card key={director.name} className="overflow-hidden group">
                    <div className="relative h-56 w-full">
                      {director["img-url"] && (
                        <Image
                          src={director["img-url"]}
                          alt={director.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold">{director.name}</h3>
                      <p className="text-sm text-muted-foreground">{director.year}</p>
                      {director.description && (
                        <p className="text-sm text-muted-foreground mt-2">{director.description}</p>
                      )}
                      {director["linkedin-link"] && director["linkedin-link"] !== "#" && (
                        <div className="mt-3 flex justify-center">
                          <Button asChild size="icon" variant="outline">
                            <Link href={director["linkedin-link"]} target="_blank">
                              <Linkedin className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
