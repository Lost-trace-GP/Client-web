"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchReports } from "@/store/report/reportSlice";
import { formatDate } from "@/utils/formatDate";



const AllReports = () => {
     const dispatch = useAppDispatch();
      const { reports, loading, error } = useAppSelector(
        (state: RootState) => state.report
      );
    
      console.log(reports);
      useEffect(() => {
        dispatch(fetchReports());
      }, [dispatch]);
      console.log(reports);



    
  return (
    <div>
      <TabsContent value="reports" className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Active Reports</h2>
        </div>

        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4 lg:w-1/5">
                      <div className="aspect-square rounded-md overflow-hidden">
                        <img
                          src={report.imageUrl || "/placeholder.svg"}
                          alt={
                            report.imageUrl ? report.imageUrl : "Placeholder"
                          }
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{report.location}</span>
                              <Calendar className="h-4 w-4 ml-2" />
                              <span> {formatDate(report.submittedAt)}</span>
                            </div>
                            <h3 className="font-semibold text-lg">
                              <p>Nmae :{report.personName}</p>
                              <p>Age : {report.age}</p>
                            </h3>

                            <div className="mt-2">
                              <p>Description: {report.description}</p>
                            </div>
                            <div className="mt-2">
                              <p>Gender: {report.gender}</p>
                            </div>

                            <div className="mt-2">
                              <p>Report Id: {report.id}</p>
                            </div>
                            <div className="mt-2">
                              <p>
                                Report MatchedWith:{" "}
                                {report.matchedWith ? (
                                  report.matchedWith
                                ) : (
                                  <span className="text-orange-500">
                                    Match does not exist yet
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                report.status === "PENDING"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {report.status === "PENDING"
                                ? "Missing"
                                : "Found"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-300 border-teal-200 dark:border-teal-800"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-2 text-sm mb-4">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {report.views} views
                            </span>
                          </div> */}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {/* <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button> */}
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Edit Report
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Mark as Resolved
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No active reports</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created any reports yet.
              </p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/missing/report">Create Your First Report</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </div>
  );
};

export default AllReports;
