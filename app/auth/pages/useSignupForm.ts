"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthRegister, clearError, resetUI } from "@/store/auth/authSlice";
import { signUpSchema, signUpType } from "@/validations/registerSchema";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

type UseSignupFormReturn = {
  formData: signUpType;
  errors: Partial<Record<keyof signUpType, string>>;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  handleChange: (
    field: keyof signUpType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
};

export function useSignupForm(onSuccess: () => void): UseSignupFormReturn {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const [formData, setFormData] = useState<signUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof signUpType, string>>
  >({});

  // Clear Redux error on input change
  useEffect(() => {
    if (error) dispatch(clearError());
  }, [formData, dispatch, error]);

  // On successful registration
  useEffect(() => {
    if (token) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created! Please log in.",
      });
      dispatch(resetUI());
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
      onSuccess();
    }
  }, [token, dispatch, onSuccess, toast]);

  const handleChange =
    (field: keyof signUpType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(clearError());
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error for this field on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = signUpSchema.safeParse(formData);

    if (!parsed.success) {
      // Collect and set validation errors
      const fieldErrors: Partial<Record<keyof signUpType, string>> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          const key = err.path[0] as keyof signUpType;
          fieldErrors[key] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    dispatch(
      actAuthRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  return {
    formData,
    errors,
    loading,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
