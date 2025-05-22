"use client";

import { useState } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="max-w-md w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onSuccess={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
