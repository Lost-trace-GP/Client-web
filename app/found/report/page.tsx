"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserReports } from "@/store/report/reportSlice";

export default function ReportFoundPage() {
  const dispatch = useAppDispatch();
  const { userReports, loading, error } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(fetchUserReports());
  }, [dispatch]);

  const report = userReports.length > 0 ? userReports[0] : null;
  const matched = report?.matchedWith;

  if (loading === "loading")
    return <p className="text-center mt-10">Loading your report...</p>;

  if (!report)
    return (
      <p className="text-center mt-10 text-red-500">
        No report found. Please submit one from the dashboard.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Submitted Report</h1>
      <p className="text-muted-foreground mb-6">
        This is the person you reported. If a match is found, it will appear
        below.
      </p>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          You can edit or remove your report from the dashboard. Keep this page
          for your reference.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Report */}
        <Card>
          <CardHeader>
            <CardTitle>{report.personName}</CardTitle>
            <CardDescription>Reported on {report.submittedAt}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <img
              src={report.imageUrl}
              alt="Your report image"
              className="w-full h-60 object-cover rounded-md"
            />
            <Separator />
            <p>
              <strong>Age:</strong> {report.age}
            </p>
            <p>
              <strong>Location:</strong> {report.location}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>
          </CardContent>
        </Card>

 
      </div>

      {!matched && (
        <p className="mt-6 text-center text-muted-foreground">
          No matching report has been found yet. Please check back later.
        </p>
      )}
    </div>
  );
}
