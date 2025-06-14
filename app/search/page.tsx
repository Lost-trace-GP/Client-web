"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useSearchReports } from "./useSearchReports";

export default function SearchPage() {
  const {
    reports,
    error,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    ageRange,
    setAgeRange,
  } = useSearchReports();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Search Reports</h1>
      <p className="text-muted-foreground mb-8">
        Search for missing or found persons reports in our database.
      </p>

      <div className="mb-8">
        <Input
          placeholder="Search by name ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="missing">Missing Persons</TabsTrigger>
          <TabsTrigger value="found">Found Persons</TabsTrigger>
        </TabsList>
      </Tabs>

      {error && <p className="text-red-600">Error: {error}</p>}

      {reports.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={report.imageUrl || "/placeholder.svg"}
                  alt={report.personName || "Person"}
                  className="object-cover w-full h-full"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    report.status === "PENDING"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {report.status === "PENDING" ? "Missing" : "Found"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {report.personName}, {report.age}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{report.location || "Unknown Location"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span> {formatDate(report.submittedAt)}</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link
                    href={`/report/${report.id}`}
                    className="flex items-center justify-center gap-2"
                  >
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
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
              setAgeRange([0, 100]);
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
  );
}
