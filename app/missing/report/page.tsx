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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Upload, Camera, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportMissingPage() {
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("personal")

  // Mock function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  // Mock function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert("Report submitted successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report a Missing Person</h1>
        <p className="text-muted-foreground mb-8">
          Please provide as much detail as possible to help us find this person.
        </p>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            If this is an emergency situation, please contact your local emergency services (911) immediately before
            submitting this report.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="details">Incident Details</TabsTrigger>
              <TabsTrigger value="photos">Photos & Identification</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter the missing person's personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="Age" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input id="height" type="number" placeholder="Height in cm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physicalDescription">Physical Description</Label>
                    <Textarea
                      id="physicalDescription"
                      placeholder="Hair color, eye color, build, distinguishing features, etc."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="Any medical conditions, medications, or special needs"
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button type="button" onClick={() => setActiveTab("details")}>
                    Continue to Incident Details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                  <CardDescription>Provide information about when and where the person was last seen.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="lastSeenDate">Date Last Seen</Label>
                      <Input id="lastSeenDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastSeenTime">Time Last Seen (Approximate)</Label>
                      <Input id="lastSeenTime" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastSeenLocation">Last Seen Location</Label>
                    <Input id="lastSeenLocation" placeholder="Address, city, state, country" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastSeenWearing">Last Seen Wearing</Label>
                    <Textarea
                      id="lastSeenWearing"
                      placeholder="Describe the clothing and accessories the person was wearing when last seen"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="circumstances">Circumstances</Label>
                    <Textarea
                      id="circumstances"
                      placeholder="Describe the circumstances of the disappearance"
                      rows={4}
                      required
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Police Report Filed?</Label>
                    <RadioGroup defaultValue="yes">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="police-yes" />
                        <Label htmlFor="police-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="police-no" />
                        <Label htmlFor="police-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policeReference">Police Reference Number (if applicable)</Label>
                    <Input id="policeReference" placeholder="Police reference number" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("personal")}>
                    Back to Personal Information
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
                  <CardTitle>Photos & Identification</CardTitle>
                  <CardDescription>
                    Upload recent photos to help with identification. These will be used for facial recognition
                    matching.
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

                    <div className="space-y-2">
                      <Label htmlFor="identificationDetails">Additional Identification Details</Label>
                      <Textarea
                        id="identificationDetails"
                        placeholder="Any other identifying information such as tattoos, birthmarks, scars, etc."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Your Contact Information</Label>
                      <Input id="contactInfo" placeholder="Phone number or email address" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relationship">Your Relationship to Missing Person</Label>
                      <Select>
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family">Family Member</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="colleague">Colleague</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                    Back to Incident Details
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
