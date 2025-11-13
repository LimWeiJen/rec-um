import Image from "next/image";
import { CheckCircle, Users, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const benefits = [
  {
    title: "Hands-On Experience",
    description: "Gain practical skills in designing, building, and programming robots.",
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
  {
    title: "Team Collaboration",
    description: "Work with a diverse team of passionate students and learn from each other.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Career Opportunities",
    description: "Network with industry professionals and enhance your resume for future careers.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
];

export default function AboutPage() {
  const founderImage = PlaceHolderImages.find(p => p.id === 'founder');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-about');

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
            About REC Robotics
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
                    Founded by a visionary with a passion for robotics, our club started as a small group of enthusiasts and has grown into a thriving community of innovators. Our founder's dedication to hands-on learning and competitive excellence continues to be the driving force behind our success.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Avatar className="h-16 w-16">
                      {founderImage && (
                        <AvatarImage src={founderImage.imageUrl} alt="Founder" data-ai-hint={founderImage.imageHint} />
                      )}
                      <AvatarFallback>FN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">Dr. Visionary</p>
                      <p className="text-sm text-muted-foreground">Founder & Chief Mentor</p>
                    </div>
                  </div>
                </CardContent>
              </div>
              {founderImage && (
                <div className="relative h-60 md:h-full">
                  <Image
                    src={founderImage.imageUrl}
                    alt={founderImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={founderImage.imageHint}
                  />
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics, develop technical and leadership skills, and collaborate on innovative projects that solve real-world problems. We aim to be a center of excellence that inspires the next generation of engineers and leaders.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              To be a leading university robotics club, recognized for our innovation, competitive spirit, and contribution to the field of robotics. We envision a future where our members are at the forefront of technological advancement, shaping the world with their creativity and expertise.
            </p>
          </div>

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
