"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/s2c/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful login
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData));
        // Redirect to dashboard
        window.location.href = "/supplier/dashboard";
      } else {
        // Handle error
        setError(responseData.message || responseData.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-emerald-50">
      {/* Header */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <span className="text-xl font-semibold text-zinc-900">supplyNest</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600">Don't have an account?</span>
            <Link href="/onboarding/playbook">
              <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-zinc-900">Welcome back</h1>
            <p className="mt-2 text-zinc-600">Sign in to access your supplier dashboard</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Supplier Login</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="supplier@company.com"
                    {...register("email")}
                    disabled={isLoading}
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    disabled={isLoading}
                    className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-zinc-700">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 rounded-md bg-emerald-50 border border-emerald-200 p-3">
                <p className="text-xs font-semibold text-emerald-900 mb-1">Demo Credentials:</p>
                <p className="text-xs text-emerald-800">Email: supplier@example.com</p>
                <p className="text-xs text-emerald-800">Password: password123</p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-zinc-600">
            <p>
              Need help?{" "}
              <a href="mailto:support@supplynest.com" className="text-emerald-600 hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
