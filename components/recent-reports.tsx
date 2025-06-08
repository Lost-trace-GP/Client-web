"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

import { useEffect } from "react";
import { fetchReports } from "@/store/report/reportSlice";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function RecentReports() {
  const dispatch = useAppDispatch();
  const { reports, loading, error } = useAppSelector(
    (state: RootState) => state.report
  );

  console.log(reports);
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading === "loading") return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">Error: {"u need to sign in"}</p>;

  // Map personName to their reports grouped by status priority: "Found" first, else "Missing"
  // Filter reports logic:

  const filteredReports = (() => {
    const map = new Map<string, (typeof reports)[0]>();

    for (const report of reports) {
      // Use fallback if personName is null/undefined
      const key = report.personName ?? "unknown";

      const existing = map.get(key);

      if (!existing) {
        map.set(key, report);
      } else {
        if (existing.status === "PENDING" && report.status !== "PENDING") {
          map.set(key, report);
        }
      }
    }

    return Array.from(map.values());
  })();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {filteredReports.map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={report.imageUrl || "/placeholder.svg"}
              // alt={report.personName}
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
            <div className="font-semibold text-lg mb-2">
              <h1>Person Name: {report.personName}</h1>
              <h1>Age: {report.age}</h1>
              <h1>Age: {report.status}</h1>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location:{report.location || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(report.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link
                href={`/report/${report.id}`}
                className="flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
