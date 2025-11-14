"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/organization", label: "Organization" },
  { href: "/activities", label: "Activities" },
  { href: "/robocon", label: "Robocon" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mouseAtTop, setMouseAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMouseAtTop(event.clientY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    // Initial check
    handleScroll();
    setMouseAtTop(true);


    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/80"
        )}
      >
        {label}
      </Link>
    );
  };

  const MobileNavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "block py-2 text-lg font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </Link>
    );
  };

  const showNav = scrolled || mouseAtTop;

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-transform duration-300",
      showNav ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-center px-4 md:px-6">
        <div className={cn(
          "flex h-14 w-full max-w-5xl items-center justify-between rounded-full border bg-background/95 p-2 px-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}>
          <Link href="/" className="flex items-center">
            <Image src="https://rec-um.github.io/images/LOGOPNG.png" alt="REC Logo" width={80} height={40} className="object-contain" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 pt-6">
                  <Link href="/" className="mb-4 flex items-center space-x-2">
                     <Image src="https://rec-um.github.io/images/LOGOPNG.png" alt="REC Logo" width={100} height={50} className="object-contain" />
                  </Link>
                  {navLinks.map((link) => (
                    <MobileNavLink key={link.href} {...link} />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
