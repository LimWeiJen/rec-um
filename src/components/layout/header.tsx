"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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

  const isHomePage = pathname === "/";
  const showNav = !isHomePage || scrolled || mouseAtTop;

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-transform duration-300",
      showNav ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="container px-4 md:px-6 mt-2">
        <div className={cn(
          "relative flex h-14 max-w-screen-2xl items-center rounded-full border bg-background/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}>
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">REC Robotics Hub</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 pt-6">
                  <Link href="/" className="mb-4 flex items-center space-x-2">
                    <Bot className="h-8 w-8 text-primary" />
                    <span className="font-bold text-xl">REC Robotics Hub</span>
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