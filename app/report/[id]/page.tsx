// app/found/report/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation"; // ← Changed from "next/router"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; // ← Fixed path
import { fetchReportById } from "../../../store/report/reportSlice"; // ← Fixed path
import { formatDate } from "@/utils/formatDate";


export default function ReportDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // ← Added optional chaining

  const dispatch = useAppDispatch();
  const report = useAppSelector((state) => state.report.selectedReport);
  console.log("Selected report:", report);
  const loading = useAppSelector((state) => state.report.loading);
  const error = useAppSelector((state) => state.report.error);

  useEffect(() => {
    if (id && typeof id === "string") {
      // ← Added extra check for string type
      dispatch(fetchReportById(id));
    }
  }, [id, dispatch]);

  // Loading state
  if (loading === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading report details...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={() => router.push("/found")} // ← Updated route
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  // No report found
  if (!report) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Notice:</strong> No report found with ID: {id}
        </div>
        <button
          onClick={() => router.push("/found")} // ← Updated route
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  // Format date for better display


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {report.personName}
            </h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img
              src={report.imageUrl ?? "/placeholder.jpg"}
              alt={`Photo of ${report.personName}`}
              className="w-full max-w-md mx-auto h-64 object-contain rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.jpg";
              }}
            />
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status
                </label>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === "MATCHED"
                      ? "bg-green-100 text-green-800"
                      : report.status === "PENDING"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Age
                </label>
                <p className="text-lg text-gray-900">{report.age} years old</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <p className="text-lg text-gray-900">{report.location}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Submitted At
                </label>
                <p className="text-lg text-gray-900">
                  {formatDate(report.submittedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {report.description && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Description
              </label>
              <p className="text-gray-900 leading-relaxed">
                {report.description}
              </p>
            </div>
          )}

          {/* Report ID for debugging */}
          <div className="mt-6 text-sm text-gray-500">
            Report ID: {id || "Not available"}
          </div>
        </div>
      </div>
    </div>
  );
}
