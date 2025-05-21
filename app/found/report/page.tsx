"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Upload, Camera, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReportFoundPage() {
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("details")
  const [showMatches, setShowMatches] = useState(false)

  // Mock function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])

      // Simulate facial recognition processing
      if (newImages.length > 0) {
        setTimeout(() => {
          setShowMatches(true)
        }, 2000)
      }
    }
  }

  // Mock function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert("Report submitted successfully!")
  }

  // Mock potential matches
  const potentialMatches = [
    {
      id: "1",
      name: "John Doe",
      age: 32,
      location: "Seattle, WA",
      date: "May 10, 2025",
      matchPercentage: 89,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "2",
      name: "Michael Johnson",
      age: 45,
      location: "San Francisco, CA",
      date: "May 12, 2025",
      matchPercentage: 72,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report a Found Person</h1>
        <p className="text-muted-foreground mb-8">
          Please provide information about a person you've found who may be reported missing.
        </p>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            If the person requires immediate medical attention, please contact emergency services (911) before
            submitting this report.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="details">Encounter Details</TabsTrigger>
              <TabsTrigger value="description">Person Description</TabsTrigger>
              <TabsTrigger value="photos">Photos & Matching</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Encounter Details</CardTitle>
                  <CardDescription>
                    Provide information about when and where you encountered this person.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="encounterDate">Date of Encounter</Label>
                      <Input id="encounterDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="encounterTime">Time of Encounter</Label>
                      <Input id="encounterTime" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="encounterLocation">Location of Encounter</Label>
                    <Input id="encounterLocation" placeholder="Address, city, state, country" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="circumstances">Circumstances</Label>
                    <Textarea
                      id="circumstances"
                      placeholder="Describe how you encountered this person and any relevant details"
                      rows={4}
                      required
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Current Status of the Person</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select current status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safe">Safe with me or someone I know</SelectItem>
                        <SelectItem value="shelter">At a shelter or facility</SelectItem>
                        <SelectItem value="hospital">At a hospital or medical facility</SelectItem>
                        <SelectItem value="police">With police or authorities</SelectItem>
                        <SelectItem value="unknown">Unknown (I only saw them)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentLocation">Current Location (if known)</Label>
                    <Input id="currentLocation" placeholder="Where is the person now?" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("description")}>
                    Continue to Person Description
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Person Description</CardTitle>
                  <CardDescription>
                    Provide as much detail as possible about the person you encountered.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="approximateAge">Approximate Age</Label>
                      <Input id="approximateAge" type="number" placeholder="Estimated age" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Apparent Gender</Label>
                      <Select>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="unknown">Unknown/Uncertain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physicalDescription">Physical Description</Label>
                    <Textarea
                      id="physicalDescription"
                      placeholder="Height, build, hair color, eye color, distinguishing features, etc."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clothing">Clothing Description</Label>
                    <Textarea id="clothing" placeholder="Describe what the person was wearing" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentalState">Mental State</Label>
                    <Textarea
                      id="mentalState"
                      placeholder="Describe the person's mental state, behavior, or any signs of confusion/distress"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communication">Communication</Label>
                    <Textarea
                      id="communication"
                      placeholder="Did they speak? What language? Were they able to communicate clearly?"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="hasID" />
                    <Label htmlFor="hasID">Person has identification documents</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDetails">Identification Details (if available)</Label>
                    <Textarea
                      id="idDetails"
                      placeholder="Any name, ID number, or other identifying information the person shared or had with them"
                      rows={2}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                    Back to Encounter Details
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("photos")}>
                    Continue to Photos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Photos & Facial Recognition Matching</CardTitle>
                  <CardDescription>
                    Upload photos to help identify the person and match with existing missing person reports.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4">
                      <Label>Upload Photos</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Drag and drop files or click to browse</p>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <Button variant="outline" onClick={() => document.getElementById("photo-upload")?.click()}>
                            Upload Photos
                          </Button>
                        </div>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                          <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Take a photo using your camera</p>
                          <Button variant="outline">Use Camera</Button>
                        </div>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Photos</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Uploaded image ${index + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showMatches && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-lg font-semibold">Potential Matches</Label>
                          <p className="text-sm text-muted-foreground">Facial recognition complete</p>
                        </div>

                        <div className="space-y-4">
                          {potentialMatches.map((match) => (
                            <div key={match.id} className="border rounded-lg p-4">
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/4">
                                  <div className="aspect-square rounded-md overflow-hidden">
                                    <img
                                      src={match.image || "/placeholder.svg"}
                                      alt={match.name}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:w-3/4 flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start mb-2">
                                      <h3 className="font-semibold text-lg">
                                        {match.name}, {match.age}
                                      </h3>
                                      <div className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 px-2 py-1 rounded text-sm font-medium">
                                        {match.matchPercentage}% Match
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Missing since {match.date} • Last seen in {match.location}
                                    </p>
                                    <p className="text-sm mb-4">
                                      This person matches the description and facial features of someone reported
                                      missing.
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      View Full Report
                                    </Button>
                                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                      Confirm Match
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Your Contact Information</Label>
                      <Input id="contactInfo" placeholder="Phone number or email address" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any other information that might help identify this person"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("description")}>
                    Back to Person Description
                  </Button>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Submit Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}
