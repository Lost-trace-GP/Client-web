"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchReports } from "@/store/report/reportSlice";
// pages 
import AllReports from "./pages/AllReports";
import ActiveRecords from "./pages/ActiveRecords";
import AllUsers from "./pages/AllUsers";


export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { reports, loading, error } = useAppSelector(
    (state: RootState) => state.report
  );



  console.log(reports);
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);
  console.log(reports);






  const [activeTab, setActiveTab] = useState("reports");


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Manage your reports, notifications, and messages.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* active reports card */}
        <ActiveRecords />
      </div>

      <Tabs
        defaultValue="reports"
        className="mb-8"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          {/* <TabsTrigger value="messages">Messages</TabsTrigger> */}
        </TabsList>
        {/* all reports tab */}
        <>
          <AllReports />
        </>
        {/* all users */}
        <>
          <AllUsers />
        </>
      </Tabs>
    </div>
  );
}
