"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginForm } from "@/app/auth/pages/useLoginForm"; // Adjust path accordingly

type LoginFormProps = {
  onSwitchToSignup?: () => void;
};

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const {
    formData,
    loading,
    error,
    validationError,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  // console.log({ error, validationError , loading});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to LostTrace</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-teal-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>

          <p className="text-sm text-red-600 font-medium">
            {validationError ?? error }
          </p>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={loading === "loading"}
          >
            {loading === "loading" ? "Logging in..." : "Login"}
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-teal-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
