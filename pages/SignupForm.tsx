"use client";

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
import { Button } from "@/components/ui/button";

import { useSignupForm } from "./useSignupForm"; // Adjust path accordingly

interface SignupFormProps {
  onSuccess: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const { formData, errors, loading, error, handleChange, handleSubmit } =
    useSignupForm(onSuccess);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Join LostTrace to report and search for missing persons
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01012345678"
              value={formData.phone}
              onChange={handleChange("phone")}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and include a special
              character.
            </p>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {error &&
            !errors.name &&
            !errors.email &&
            !errors.phone &&
            !errors.password &&
            !errors.confirmPassword && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={loading === "loading"}
          >
            {loading === "loading" ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <span>Already have an account? </span>
            <button
              type="button"
              className="text-teal-600 hover:underline"
              onClick={() => onSuccess()}
            >
              Login
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
