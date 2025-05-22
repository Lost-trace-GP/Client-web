"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError, resetUI } from "@/store/auth/authSlice";
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
import { useRouter, useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const tokenFromUrl = searchParams.get("token") ?? "";

  const [formData, setFormData] = useState({
    token: tokenFromUrl,
    newPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setValidationError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }
    setValidationError(null);

    const action = await dispatch(
      resetPassword({
        token: formData.token,
        newPassword: formData.newPassword,
      })
    );

    if (resetPassword.fulfilled.match(action)) {
      setSuccessMsg("Password reset successful! You can now log in.");
      setFormData({ token: "", newPassword: "", confirmPassword: "" });
      dispatch(resetUI());
      // Optionally redirect to login after a delay
      setTimeout(() => router.push("/auth/login"), 3000);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter a new password for your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Reset Token</Label>
            <Input
              id="token"
              type="text"
              value={formData.token}
              onChange={handleChange("token")}
              placeholder="Enter reset token"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="New password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm new password"
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
            {loading === "loading" ? "Resetting..." : "Reset Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
