import { z } from "zod";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),

    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, {
      message:
        "Phone number must be a valid Egyptian number (e.g., 01234567890)",
    }),
    password: z
      .string()
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password must have a special character",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is Required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
