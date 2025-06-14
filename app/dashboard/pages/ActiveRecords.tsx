"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchReports } from "@/store/report/reportSlice";
import { fetchAllUsers } from "@/store/admin/adminSlice";

const ActiveRecords = () => {
  const dispatch = useAppDispatch();

  const { reports } = useAppSelector((state: RootState) => state.report);
  const { users } = useAppSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Active Reports */}
      <Card className="w-full h-full shadow-md transition hover:shadow-lg duration-200">
        <CardContent className="flex items-center gap-4 p-6 h-full">
          <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
            <FileText className="h-6 w-6 text-teal-600 dark:text-teal-300" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">Active Reports</p>
            <p className="text-2xl font-bold">{reports.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card className="w-full h-full shadow-md transition hover:shadow-lg duration-200">
        <CardContent className="flex items-center gap-4 p-6 h-full">
          <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
            <Users className="h-6 w-6 text-amber-600 dark:text-amber-300" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">
              {users.filter((n) => n.role === "USER").length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveRecords;
