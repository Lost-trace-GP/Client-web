"use client";

import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReports } from "@/store/report/reportSlice";
import { RootState } from "@/store";
import { Report } from "@/types/report";

export function useSearchReports() {
  const dispatch = useAppDispatch();
  const { reports, loading, error } = useAppSelector(
    (state: RootState) => state.report
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "missing" | "found">(
    "all"
  );
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const reportsFiltered = useMemo(() => {
    return reports.filter((report) => {
      const matchesQuery =
        !searchQuery ||
        report.personName?.toLowerCase().includes(searchQuery.toLowerCase());

      const status = report.status?.toUpperCase();
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "missing" && status === "PENDING") ||
        (activeTab === "found" && status === "MATCHED");

      const matchesAge =
        typeof report.age === "number" &&
        report.age >= ageRange[0] &&
        report.age <= ageRange[1];

      return matchesQuery && matchesTab && matchesAge;
    });
  }, [reports, searchQuery, activeTab, ageRange]);

  const uniqueReports = useMemo(() => {
    const map = new Map<string, Report>();

    for (const report of reportsFiltered) {
      const key = report.id.toLowerCase();
      const existing = map.get(key);

      if (
        !existing ||
        (existing.status === "PENDING" && report.status === "MATCHED")
      ) {
        map.set(key, report);
      }
    }

    return Array.from(map.values());
  }, [reportsFiltered]);

  return {
    reports: uniqueReports,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    ageRange,
    setAgeRange,
  };
}
