import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, AlertTriangle, Heart } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { RecentReports } from "@/components/recent-reports"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Help Find Missing Persons</h1>
            <p className="text-muted-foreground md:text-xl">
              LostTrace connects communities to help locate missing individuals through collaborative reporting and
              advanced facial recognition technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="/missing/report">Report Missing Person</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/found/report">Report Found Person</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="People helping each other"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 border-t border-b">
        <h2 className="text-3xl font-bold text-center mb-12">Making a Difference Together</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-8 w-8 text-teal-500" />} value="12,458" label="People Found" />
          <StatCard icon={<Search className="h-8 w-8 text-teal-500" />} value="3,721" label="Active Searches" />
          <StatCard icon={<AlertTriangle className="h-8 w-8 text-teal-500" />} value="85%" label="Resolution Rate" />
          <StatCard icon={<Heart className="h-8 w-8 text-teal-500" />} value="50K+" label="Community Members" />
        </div>
      </section> */}

      {/* How It Works */}
      <section className="py-12 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">How LostTrace Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>1. Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Submit detailed information about a missing or found person, including photos and identifying
                characteristics.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Match</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our facial recognition technology compares reports to identify potential matches between missing and
                found individuals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Reunite</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                When matches are confirmed, we facilitate communication between parties to help reunite missing persons
                with their families.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-12 md:py-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recent Reports</h2>
          <Button asChild variant="outline">
            <Link href="/search">View All</Link>
          </Button>
        </div>
        <RecentReports />
      </section>
    </div>
  )
}
