import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login, clearError } from "@/store/auth/authSlice";
import { RootState, AppDispatch } from "@/store";
import { loginSchema, type LoginFormType } from "@/validations/loginSchema";

export function useLoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, user, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Clear error on input change
  useEffect(() => {
    if (error) dispatch(clearError());
  }, [formData.email, formData.password, dispatch, error]);

  // Redirect on successful login
  useEffect(() => {
    if (token && user && loading === "succeeded") {
      router.push("/");
    }
  }, [token, user, loading, router]);

  console.log("Raw error from Redux:", error);

  // Helper to safely extract error message
  const getErrorMessage = (err: unknown): string | null => {
    if (!err) return null;
    if (typeof err === "string") return err;
    if (typeof err === "object" && err !== null && "error" in err) {
      // @ts-ignore
      return err.error || "Login failed";
    }
    return "Login failed";
  };

  const handleChange =
    (field: keyof LoginFormType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    setValidationError(null);
    dispatch(login(formData));
  };

  return {
    formData,
    loading,
    error: getErrorMessage(error),
    validationError,
    handleChange,
    handleSubmit,
  };
}
