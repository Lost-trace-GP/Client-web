"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReportById } from "@/store/report/reportSlice";
import { formatDate } from "@/utils/formatDate";

export default function ReportDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    selectedReport: report,
    loading,
    error,
  } = useAppSelector((state) => state.report);

  useEffect(() => {
    if (id) dispatch(fetchReportById(id));
  }, [id, dispatch]);

  const handleBack = () => router.push("/found");

  if (loading === "loading") {
    return <CenteredMessage message="Loading report details..." />;
  }

  if (error) {
    return <ErrorState message={error} onBack={handleBack} />;
  }

  if (!report) {
    return (
      <ErrorState
        message={`No report found with ID: ${id}`}
        onBack={handleBack}
        type="notice"
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-5 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {report.personName}
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={report.imageUrl ?? "/placeholder.jpg"}
              alt={`Photo of ${report.personName}`}
              className="w-full max-w-md h-64 object-contain rounded-xl shadow"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.jpg";
              }}
            />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard label="Status">
              <StatusBadge status={report.status} />
            </DetailCard>
            <DetailCard label="Location">{report.location || "N/A"}</DetailCard>
            <DetailCard label="Age">{report.age} years old</DetailCard>
            <DetailCard label="Submitted At">
              {formatDate(report.submittedAt)}
            </DetailCard>
            <DetailCard label="Contact Number">
              {report.contact_number || "N/A"}
            </DetailCard>
          </div>

          {/* Description */}
          {report.description && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Description
              </label>
              <p className="text-gray-900 leading-relaxed">
                {report.description}
              </p>
            </div>
          )}

          {/* Report ID */}
          <div className="text-sm text-gray-500 pt-4 border-t">
            Report ID: {id || "Not available"}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function DetailCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <p className="text-lg text-gray-900">{children}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "MATCHED"
      ? "bg-green-100 text-green-800"
      : status === "PENDING"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${style}`}
    >
      {status}
    </span>
  );
}

function CenteredMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
}

function ErrorState({
  message,
  onBack,
  type = "error",
}: {
  message: string;
  onBack: () => void;
  type?: "error" | "notice";
}) {
  const styles =
    type === "error"
      ? "bg-red-100 border-red-400 text-red-700"
      : "bg-yellow-100 border-yellow-400 text-yellow-700";

  return (
    <div className="p-6">
      <div className={`${styles} border px-4 py-3 rounded mb-4`}>
        <strong>{type === "error" ? "Error" : "Notice"}:</strong> {message}
      </div>
      <button
        onClick={onBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Back to Reports
      </button>
    </div>
  );
}
