"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReports } from "@/store/report/reportSlice";
import { RootState } from "@/store";
import { formatDate } from "@/utils/formatDate";

export function RecentReports() {
  const dispatch = useAppDispatch();
  const { reports, loading, error } = useAppSelector(
    (state: RootState) => state.report
  );

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const filteredReports = useMemo(() => {
    const map = new Map<string, (typeof reports)[0]>();
    for (const report of reports) {
      const key = report.personName ?? "unknown";
      const existing = map.get(key);
      if (
        !existing ||
        (existing.status === "PENDING" && report.status !== "PENDING")
      ) {
        map.set(key, report);
      }
    }
    return Array.from(map.values());
  }, [reports]);

  const getBadgeColor = (status: string) =>
    status === "PENDING"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-green-500 hover:bg-green-600";

  if (loading === "loading") {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: You need to sign in.</p>;
  }

  if (filteredReports.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">
          No recent reports available
        </h2>
        <p className="text-muted-foreground">
          There are currently no reports to show. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {filteredReports.slice(0, 4).map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={report.imageUrl ?? "/placeholder.svg"}
              alt={report.personName ?? "Missing person"}
              className="object-cover w-full h-full"
            />
            <Badge
              className={`absolute top-2 right-2 ${getBadgeColor(
                report.status
              )}`}
            >
              {report.status === "PENDING" ? "Missing" : "Found"}
            </Badge>
          </div>

          <CardContent className="p-4">
            <div className="font-semibold text-lg mb-2 space-y-1">
              <p>Person Name: {report.personName}</p>
              <p>Age: {report.age}</p>
              <p>Status: {report.status}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location: {report.location ?? "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(report.submittedAt)}</span>
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
