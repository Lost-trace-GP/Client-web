import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for recent reports
const recentReports = [
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
]

export function RecentReports() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {recentReports.map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img src={report.image || "/placeholder.svg"} alt={report.name} className="object-cover w-full h-full" />
            <Badge
              className={`absolute top-2 right-2 ${
                report.type === "missing" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {report.type === "missing" ? "Missing" : "Found"}
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              {report.name}, {report.age}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{report.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{report.date}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/report/${report.id}`} className="flex items-center justify-center gap-2">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
