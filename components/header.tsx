"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-teal-600">LostTrace</span>
          </Link>
        </div>

        <nav
          className={cn(
            "absolute left-0 right-0 top-16 z-50 bg-background border-b md:static md:border-0 md:bg-transparent",
            isMenuOpen ? "block" : "hidden md:block",
          )}
        >
          <ul className="container flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-0">
            <li>
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === "/" ? "text-teal-600" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === "/search" ? "text-teal-600" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/missing/report"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === "/missing/report" ? "text-teal-600" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Report Missing
              </Link>
            </li>
            <li>
              <Link
                href="/found/report"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === "/found/report" ? "text-teal-600" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Report Found
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  pathname === "/dashboard" ? "text-teal-600" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative">
              <Input type="search" placeholder="Search reports..." className="w-[200px] md:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={toggleSearch}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <ModeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex bg-teal-600 hover:bg-teal-700">
            <Link href="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
