"use client";

import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAuthRegister, clearError } from "../../../store/auth/authSlice"; // Adjust the path
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Facebook, Twitter, Mail } from "lucide-react";
import { useAppDispatch , useAppSelector } from "@/store/hooks";


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(
    (state) => state.auth
  );

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    dispatch(actAuthRegister({ name, email, password }));
  };

  useEffect(() => {
    if (token) {
      // ✅ Redirect or show success message
      console.log("Registration successful");
    }
  }, [token]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Join LostTrace to report and search for missing persons
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and include a number
              and special character.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-teal-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </Link>
            </Label> */}
          </div>
          {error && <p className="text-sm text-red-600 mt-2">Error: {error}</p>}
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
            <Link
              href="#"
              className="text-teal-600 hover:underline"
              onClick={() => document.getElementById("login-tab")?.click()}
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="w-full">
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>
    </Card>
  );
}
