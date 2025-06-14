"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserReports,
  deleteReport,
  updateReport,
} from "@/store/report/reportSlice";
import { Report } from "@/types/report";
import { formatDate } from "@/utils/formatDate";

export default function ReportFoundPage() {
  const dispatch = useAppDispatch();
  const { userReports, loading } = useAppSelector((state) => state.report);

  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [formData, setFormData] = useState({
    personName: "",
    age: "",
    location: "",
    gender: "",
    description: "",
    contact_number: "", // ✅ Add here
  });

  useEffect(() => {
    dispatch(fetchUserReports());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      await dispatch(deleteReport(id));
      dispatch(fetchUserReports());
    }
  };

  const handleEditClick = (report: Report) => {
    setEditingReport(report);
    setFormData({
      personName: report.personName || "",
      age: report.age?.toString() ?? "",
      location: report.location || "",
      gender: report.gender || "",
      description: report.description || "",
      contact_number: report.contact_number || "", // ✅ Prefill
    });
  };

  const handleUpdate = async () => {
    if (!editingReport) return;

    const updatedForm = new FormData();
    updatedForm.append("personName", formData.personName);
    updatedForm.append("age", String(Number(formData.age)));
    updatedForm.append("location", formData.location);
    updatedForm.append("gender", formData.gender);
    updatedForm.append("description", formData.description);
    updatedForm.append("contact_number", formData.contact_number); // ✅ Include here

    const result = await dispatch(
      updateReport({ id: editingReport.id, formData: updatedForm })
    );

    if (updateReport.fulfilled.match(result)) {
      setEditingReport(null);
      dispatch(fetchUserReports());
    }
  };

  if (loading === "loading") {
    return <p className="text-center mt-10">Loading your reports...</p>;
  }

  if (!userReports || userReports.length === 0) {
    return (
      <p className="text-center mt-10 text-red-500">
        No reports found. Please submit one from the dashboard.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Submitted Reports</h1>
      <p className="text-muted-foreground mb-6">
        These are all the people you reported. If a match is found for any, it
        will be shown within the card.
      </p>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          You can delete or edit your reports here.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.personName}</CardTitle>
              <CardDescription>
                {formatDate(report.submittedAt)}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <img
                src={report.imageUrl ?? "/placeholder.jpg"}
                alt={report.personName ?? "Placeholder"}
                className="aspect-video object-contain w-full rounded-xl shadow-md border border-gray-300"
              />

              <Separator />

              <p>
                <strong>Name:</strong> {report.personName}
              </p>
              <p>
                <strong>Age:</strong> {report.age}
              </p>
              <p>
                <strong>Location:</strong> {report.location}
              </p>
              <p>
                <strong>Gender:</strong> {report.gender}
              </p>
              <p>
                <strong>Description:</strong> {report.description}
              </p>
              <p>
                <strong>Contact Number:</strong> {report.contact_number}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    report.status === "MATCHED"
                      ? "text-green-600 font-semibold"
                      : report.status === "PENDING"
                      ? "text-red-600 font-semibold"
                      : "text-gray-600 font-semibold"
                  }
                >
                  {report.status}
                </span>
              </p>

              {report.matchedWith ? (
                <div className="p-3 border rounded-md bg-green-50 text-green-800">
                  <strong>Matched With:</strong> {report.matchedWith}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No match found yet.
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditClick(report)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Report Dialog */}
      <Dialog
        open={!!editingReport}
        onOpenChange={() => setEditingReport(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.personName}
                onChange={(e) =>
                  setFormData({ ...formData, personName: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Input
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input
                value={formData.contact_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact_number: e.target.value,
                  })
                }
              />
            </div>

            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
