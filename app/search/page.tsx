"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SearchIcon, Filter, MapPin, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"

// Mock data for search results
const searchResults = [
  {
    id: "1",
    name: "John Doe",
    age: 32,
    location: "Seattle, WA",
    date: "May 10, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    location: "Portland, OR",
    date: "May 8, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Michael Johnson",
    age: 45,
    location: "San Francisco, CA",
    date: "May 12, 2025",
    type: "found",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Sarah Williams",
    age: 19,
    location: "Los Angeles, CA",
    date: "May 9, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Robert Brown",
    age: 52,
    location: "Denver, CO",
    date: "May 7, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Emily Davis",
    age: 34,
    location: "Chicago, IL",
    date: "May 11, 2025",
    type: "found",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    name: "David Wilson",
    age: 41,
    location: "Phoenix, AZ",
    date: "May 6, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    age: 23,
    location: "Miami, FL",
    date: "May 13, 2025",
    type: "missing",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [ageRange, setAgeRange] = useState([0, 100])

  // Filter results based on search query and active tab
  const filteredResults = searchResults.filter((result) => {
    const matchesQuery =
      searchQuery === "" ||
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "missing" && result.type === "missing") ||
      (activeTab === "found" && result.type === "found")

    const matchesAgeRange = result.age >= ageRange[0] && result.age <= ageRange[1]

    return matchesQuery && matchesTab && matchesAgeRange
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Search Reports</h1>
      <p className="text-muted-foreground mb-8">Search for missing or found persons reports in our database.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>Refine your search with these filters.</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="type-missing" defaultChecked />
                    <Label htmlFor="type-missing">Missing Persons</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="type-found" defaultChecked />
                    <Label htmlFor="type-found">Found Persons</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Age Range: {ageRange[0]} - {ageRange[1]}
                </Label>
                <Slider defaultValue={[0, 100]} max={100} step={1} value={ageRange} onValueChange={setAgeRange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    <SelectItem value="west">West Coast</SelectItem>
                    <SelectItem value="midwest">Midwest</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="northeast">Northeast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select>
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Past week</SelectItem>
                    <SelectItem value="month">Past month</SelectItem>
                    <SelectItem value="year">Past year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Apply Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="missing">Missing Persons</TabsTrigger>
          <TabsTrigger value="found">Found Persons</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredResults.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.name}
                  className="object-cover w-full h-full"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    result.type === "missing" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {result.type === "missing" ? "Missing" : "Found"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {result.name}, {result.age}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{result.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{result.date}</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={`/report/${result.id}`} className="flex items-center justify-center gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setActiveTab("all")
              setAgeRange([0, 100])
            }}
          >
            Reset Search
          </Button>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-2">
          Previous
        </Button>
        <Button variant="outline" className="mx-2">
          Next
        </Button>
      </div>
    </div>
  )
}
