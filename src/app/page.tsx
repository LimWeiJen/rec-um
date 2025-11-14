"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import * as THREE from 'three';

import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { fetchHomeContent, HomeContent } from "@/lib/content-fetcher";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'founder');
  const teamImage = PlaceHolderImages.find(p => p.id === 'team-member-1');
  const activityImage = PlaceHolderImages.find(p => p.id === 'activity-1');
  const roboconImage = PlaceHolderImages.find(p => p.id === 'robocon-prep');

  const containerRef = useRef<any>(null);
  const mouseRef = useRef<any>({x: 0, y: 0});

  // Fetch content on client side
  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchHomeContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Style the canvas element
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // Clear any existing canvas elements first
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple cube placeholders floating around
    const cubes: any = [];
    const cubePositions = [
      { x: -3, y: 2, z: -2 },
      { x: 3, y: -1, z: -1 },
      { x: -2, y: -2, z: 1 },
      { x: 2.5, y: 1.5, z: -3 },
      { x: -3.5, y: -1.5, z: 0 },
      { x: 1, y: 2.5, z: 2 }
    ];

    const cubeColors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0xa8e6cf, 0xff8b94, 0xc7ceea];

    cubePositions.forEach((pos, idx) => {
      const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const cubeMaterial = new THREE.MeshPhongMaterial({
        color: cubeColors[idx],
        shininess: 100
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(pos.x, pos.y, pos.z);
      
      // Store rotation multipliers for varied movement
      cube.userData.rotMultiplier = {
        x: 0.5 + Math.random() * 1.5,
        y: 0.5 + Math.random() * 1.5,
        z: 0.002 + Math.random() * 0.005
      };
      
      cubes.push(cube);
      scene.add(cube);
    });

    // Lighting - improved for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Add a directional light for better definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Mouse move handler
    const handleMouseMove = (e: any) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate cubes with different multipliers for varied movement
      cubes.forEach((cube: any) => {
        cube.rotation.y = mouseRef.current.x * Math.PI * cube.userData.rotMultiplier.y;
        cube.rotation.x = mouseRef.current.y * Math.PI * cube.userData.rotMultiplier.x;
        cube.rotation.z += cube.userData.rotMultiplier.z;
      });

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Debug: Log that Three.js is initialized
    console.log('Three.js scene initialized with', cubes.length, 'cubes and rocket');

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  });

  if (isLoading || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen">

        <div ref={containerRef} className="absolute inset-0 z-0" />

        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Welcome to REC
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            {content.welcomeText}
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
          {(content.aboutUsPreviewImageUrl || aboutImage) && (
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={content.aboutUsPreviewImageUrl || aboutImage?.imageUrl || ''}
                alt={aboutImage?.description || "About Us"}
                fill
                className="object-cover"
                data-ai-hint={aboutImage?.imageHint}
              />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline">About Us</h2>
            <p className="text-muted-foreground">
              {content.aboutUsText}
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
           {(content.ourTeamPreviewImageUrl || teamImage) && (
            <div className="relative h-80 rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src={content.ourTeamPreviewImageUrl || teamImage?.imageUrl || ''}
                alt={teamImage?.description || "Our Team"}
                fill
                className="object-cover"
                data-ai-hint={teamImage?.imageHint}
              />
            </div>
          )}
          <div className="space-y-4 order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline">Our Team</h2>
            <p className="text-muted-foreground">
              {content.ourTeamText}
            </p>
            <Button asChild>
              <Link href="/organization">
                Meet the Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Activities Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {(content.activitiesPreviewImageUrl || activityImage) && (
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={content.activitiesPreviewImageUrl || activityImage?.imageUrl || ''}
                alt={activityImage?.description || "Activities"}
                fill
                className="object-cover"
                data-ai-hint={activityImage?.imageHint}
              />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline">Activities</h2>
            <p className="text-muted-foreground">
              {content.activitiesText}
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
          {(content.roboconPreviewImageUrl || roboconImage) && (
            <div className="relative h-80 rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src={content.roboconPreviewImageUrl || roboconImage?.imageUrl || ''}
                alt={roboconImage?.description || "Robocon"}
                fill
                className="object-cover"
                data-ai-hint={roboconImage?.imageHint}
              />
            </div>
          )}
          <div className="space-y-4 order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline">Robocon</h2>
            <p className="text-muted-foreground">
              {content.roboconText}
            </p>
            <Button asChild>
              <Link href="/robocon">
                Explore Robocon <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

      </div>

      <section className="py-12 md:py-20 bg-muted/40">
        <div className="container mx-auto max-w-screen-2xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Get In Touch</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Follow our journey, get the latest updates, and connect with us on social media.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                {content.instagramLink && content.instagramLink !== "#" && (
                  <Button asChild size="lg" variant="outline">
                      <Link href={content.instagramLink} target="_blank">
                          <Instagram className="mr-2 h-5 w-5" />
                          Instagram
                      </Link>
                  </Button>
                )}
                {content.facebookLink && content.facebookLink !== "#" && (
                  <Button asChild size="lg" variant="outline">
                      <Link href={content.facebookLink} target="_blank">
                          <Facebook className="mr-2 h-5 w-5" />
                          Facebook
                      </Link>
                  </Button>
                )}
                {content.linkedInLink && content.linkedInLink !== "#" && (
                  <Button asChild size="lg" variant="outline">
                      <Link href={content.linkedInLink} target="_blank">
                          <Linkedin className="mr-2 h-5 w-5" />
                          LinkedIn
                      </Link>
                  </Button>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
