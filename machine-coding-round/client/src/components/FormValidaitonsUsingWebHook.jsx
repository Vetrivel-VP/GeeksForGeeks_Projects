import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// validation schema for our react-hook-from by using zod
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be 10 digits long"),
    postalCode: z
      .string()
      .regex(/^\d{5}$/, "Postal Code must be 5 digits long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])/,
        "Password must include atleast one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const FormValidaitonsUsingWebHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-gray-50">
        <h2 className=" text-xl text-center mb-6 text-gray-800">
          Form Validations Using React Hook Form & Zod Resolver
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className="form-input"
            />

            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          {/* email input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className="form-input"
            />

            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              {...register("mobile")}
              className="form-input"
            />

            {errors.mobile && (
              <p className="form-error">{errors.mobile.message}</p>
            )}
          </div>

          {/* postal code input */}

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter your postal code number"
              {...register("postalCode")}
              className="form-input"
            />

            {errors.postalCode && (
              <p className="form-error">{errors.postalCode.message}</p>
            )}
          </div>

          {/* password input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="form-input"
            />

            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          {/* confirm password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter your password"
              {...register("confirmPassword")}
              className="form-input"
            />

            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="p-3 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormValidaitonsUsingWebHook;
