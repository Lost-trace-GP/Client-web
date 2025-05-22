"use client";

import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="max-w-md w-full">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" id="login-tab">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" id="signup-tab">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
