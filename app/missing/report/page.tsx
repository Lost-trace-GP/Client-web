"use client";

import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { createReport } from "../../../store/report/reportSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, AlertTriangle, X, CameraOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";


export default function ReportMissingPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Loading state to disable submit button while submitting
  const [loading, setLoading] = useState(false);

  // Form state
  const [activeTab, setActiveTab] = useState("personal");
  const [image, setImage] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [formData, setFormData] = useState({
    personName: "",
    age: "",
    gender: "",
    description: "",
    location: "",
  });

  // Tab order
  const tabOrder = ["personal", "details", "photos"];

  // Input change handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
  };

  // Camera controls
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = document.getElementById("camera-video") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `camera-photo-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            setImage(file);
            stopCamera();
          }
        },
        "image/jpeg",
        0.8
      );
    }
  };

  // Navigation between tabs
  const handleNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  // Submit handler with loading state toggle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showCamera) {
      stopCamera();
    }

    if (!image) {
      alert("Please upload a photo before submitting the report.");
      return;
    }

    const payload = new FormData();
    payload.append("personName", formData.personName);
    payload.append("age", formData.age);
    payload.append("gender", formData.gender);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("image", image);

    try {
      setLoading(true);
      await dispatch(createReport(payload)).unwrap();
      router.push("/found/report"); 
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        `Failed to submit report: ${
          error.payload || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };
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
            If this is an emergency situation, please contact your local
            emergency services (911) immediately before submitting this report.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="details">Incident Details</TabsTrigger>
              <TabsTrigger value="photos">Photos & Identification</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Enter the missing person's personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="personName">Full Name</Label>
                      <Input
                        id="personName"
                        placeholder="Full name"
                        required
                        value={formData.personName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        required
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={handleGenderChange}
                        value={formData.gender}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Physical Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Hair color, eye color, build, distinguishing features, etc."
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={activeTab === "personal"}
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleNextTab}
                  >
                    Continue to Incident Details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                  <CardDescription>
                    Provide information about when and where the person was last
                    seen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Last Known Location</Label>
                      <Input
                        id="location"
                        placeholder="City, neighborhood, or address"
                        required
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleNextTab}
                  >
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
                    Upload a recent photo or take one using your device camera.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {image ? (
                      <div className="relative w-64 h-64 border rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : showCamera ? (
                      <div className="relative w-64 h-64 border rounded overflow-hidden">
                        <video
                          id="camera-video"
                          autoPlay
                          playsInline
                          muted
                          className="object-cover w-full h-full"
                          ref={(video) => {
                            if (video && stream) {
                              video.srcObject = stream;
                            }
                          }}
                        />
                        <div className="flex justify-between mt-2">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={capturePhoto}
                            className="mr-2"
                          >
                            <Camera /> Capture
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            onClick={stopCamera}
                            className="ml-2"
                          >
                            <CameraOff /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex items-center space-x-2 border rounded px-4 py-2 hover:bg-teal-50 transition-colors duration-300 ease-in-out"
                        >
                          <Upload />
                          <span>Upload Photo</span>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>

                        <Button variant="outline" onClick={startCamera}>
                          <Camera /> Use Camera
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!image || loading}
                  >
                    {loading ? "Submitting..." : "Submit Report"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}
