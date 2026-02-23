import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters"),

    gender: z
        .string()
        .min(1, "Gender is required")
        .refine((val) => val === "Male" || val === "Female", {
            message: "Invalid gender",
        }),

    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine(
        (date) => new Date(date) < new Date(),
        "Date of birth must be in the past"
      ),

    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address must be at least 5 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),

    confirmpassword: z.string().min(1, "Confirm password is required"),

    
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });
