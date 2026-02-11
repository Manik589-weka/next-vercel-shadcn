"use client";

import { Logo } from "@/components/pro-blocks/e-commerce/examples/shared/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const DEFAULT_MENU_ITEMS = [
  { label: "Products", href: "#" },
  { label: "Use cases", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQ", href: "#" },
] as const;

export interface NavItem {
  label: string;
  href: string;
}

export interface LpNavbar3Props {
  /** Navigation links (label + href). Defaults to standard placeholder items. */
  menuItems?: NavItem[];
  signInHref?: string;
  signUpHref?: string;
  className?: string;
}

interface NavMenuItemsProps {
  items: NavItem[];
  className?: string;
}

const NavMenuItems = ({ items, className }: NavMenuItemsProps) => (
  <div className={`flex flex-col gap-1 md:flex-row ${className ?? ""}`}>
    {items.map(({ label, href }) => (
      <Link key={label} href={href}>
        <Button variant="ghost" className="w-full md:w-auto">
          {label}
        </Button>
      </Link>
    ))}
  </div>
);

export function LpNavbar3({
  menuItems = [...DEFAULT_MENU_ITEMS],
  signInHref = "/signin",
  signUpHref = "/signup",
  className,
}: LpNavbar3Props = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav
      className={`sticky top-0 isolate z-50 bg-[var(--base-background)] py-3.5 md:py-4 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Go to homepage">
              <Logo className="h-7 w-auto" />
            </Link>
            <div className="hidden md:flex">
              <NavMenuItems items={menuItems} />
            </div>
          </div>
          <div className="hidden gap-3 md:flex">
            <Link href={signInHref}>
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href={signUpHref}>
              <Button>Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="flex size-9 items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-2.5 pt-4 md:hidden">
            <NavMenuItems items={menuItems} />
            <Separator className="my-2" />
            <div className="flex flex-col gap-3">
              <Link href={signInHref}>
                <Button variant="ghost" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href={signUpHref}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
