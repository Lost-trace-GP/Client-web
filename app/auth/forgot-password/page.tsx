"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError, resetUI } from "@/store/auth/authSlice";
import { RootState, AppDispatch } from "@/store";
import { z } from "zod";
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
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setValidationError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }
    setValidationError(null);

    const action = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(action)) {
      setSuccessMsg("Password reset email sent. Check your inbox.");
      setEmail("");
      dispatch(resetUI());
      // Optionally redirect to reset password page or show instructions
      // router.push("/auth/reset-password");
    }
  };

  return (
    <Card className="max-w-md mx-auto my-16">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive reset instructions
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {(validationError || successMsg) && (
            <p
              className={`text-sm font-medium ${
                validationError ? "text-red-600" : "text-green-600"
              }`}
            >
              {validationError ?? successMsg}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading === "loading"}
            className="w-full"
          >
            {loading === "loading" ? "Sending..." : "Send Reset Email"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
