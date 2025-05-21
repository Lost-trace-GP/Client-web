"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, FileText, MessageSquare, AlertTriangle, CheckCircle, Clock, Eye, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for user reports
const userReports = [
  {
    id: "1",
    name: "John Doe",
    age: 32,
    location: "Seattle, WA",
    date: "May 10, 2025",
    type: "missing",
    status: "active",
    views: 245,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Sarah Williams",
    age: 19,
    location: "Los Angeles, CA",
    date: "May 9, 2025",
    type: "missing",
    status: "active",
    views: 189,
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Mock data for notifications
const notifications = [
  {
    id: "1",
    type: "match",
    message: "Potential match found for John Doe",
    date: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "view",
    message: "Your report for Sarah Williams has 50 new views",
    date: "Yesterday",
    read: false,
  },
  {
    id: "3",
    type: "message",
    message: "New message regarding John Doe report",
    date: "2 days ago",
    read: true,
  },
]

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "Officer Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I have some information regarding the John Doe case. Please contact me at your earliest convenience.",
    date: "3 hours ago",
    read: false,
  },
  {
    id: "2",
    sender: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I think I may have seen Sarah Williams at Central Park yesterday afternoon.",
    date: "Yesterday",
    read: true,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("reports")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your reports, notifications, and messages.</p>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <FileText className="h-6 w-6 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Reports</p>
              <p className="text-2xl font-bold">{userReports.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
              <Bell className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Notifications</p>
              <p className="text-2xl font-bold">{notifications.filter((n) => !n.read).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
              <p className="text-2xl font-bold">{messages.filter((m) => !m.read).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Active Reports</h2>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/missing/report">Create New Report</Link>
            </Button>
          </div>

          {userReports.length > 0 ? (
            <div className="space-y-4">
              {userReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 lg:w-1/5">
                        <div className="aspect-square rounded-md overflow-hidden">
                          <img
                            src={report.image || "/placeholder.svg"}
                            alt={report.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {report.name}, {report.age}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <MapPin className="h-4 w-4" />
                                <span>{report.location}</span>
                                <Calendar className="h-4 w-4 ml-2" />
                                <span>{report.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={report.type === "missing" ? "destructive" : "default"}>
                                {report.type === "missing" ? "Missing" : "Found"}
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
                          <div className="flex items-center gap-2 text-sm mb-4">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{report.views} views</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
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
                <p className="text-muted-foreground mb-6">You haven't created any reports yet.</p>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/missing/report">Create Your First Report</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "match"
                          ? "bg-green-100 dark:bg-green-900"
                          : notification.type === "view"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "bg-amber-100 dark:bg-amber-900"
                      }`}
                    >
                      {notification.type === "match" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
                      ) : notification.type === "view" ? (
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
                      <p className="text-sm text-muted-foreground">{notification.date}</p>
                    </div>
                    {!notification.read && <div className="h-2 w-2 rounded-full bg-teal-500"></div>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Messages</h2>
            <Button variant="outline" size="sm">
              View All Messages
            </Button>
          </div>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={message.read ? "opacity-70" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`${message.read ? "" : "font-medium"}`}>{message.sender}</h4>
                          <p className="text-xs text-muted-foreground">{message.date}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                      </div>
                      {!message.read && <div className="h-2 w-2 rounded-full bg-teal-500 mt-2"></div>}
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2 flex justify-end">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No messages</h3>
                <p className="text-muted-foreground">You don't have any messages at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
