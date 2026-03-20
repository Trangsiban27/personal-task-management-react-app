import { Button } from "@/components/ui/button";
import { X, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-router-dom";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const schema = yup.object({
  userName: yup
    .string()
    .required("Username is required!")
    .min(3, "Username must be at least 3 characters"),
  email: yup.string().required("Email is required!").email("Invalid email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirm is required!")
    .oneOf([yup.ref("password")], "Password not match!"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg flex w-2/3 h-2/3 border border-gray-300 overflow-hidden">
        <div className="bg-pink-100 w-1/2 relative">
          <img src="/logo.png" alt="" className="absolute w-52 h-16" />

          <div className="absolute w-147.5 h-150 -left-4">
            <img
              src="/sign-up-image.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="w-full flex flex-col justify-center items-center p-10 overflow-y-scroll">
            <span className="font-extrabold text-2xl mt-6">Sign Up</span>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 w-full flex flex-col gap-y-4 h-full"
            >
              <div className="flex flex-col justify-start items-start w-full">
                <Controller
                  name="userName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Your name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your name..."
                        autoComplete="off"
                        className={cn(
                          "outline-none focus-visible:ring-0",
                          fieldState.invalid &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </Field>
                  )}
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-start items-start w-full">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email..."
                        autoComplete="off"
                        className={cn(
                          "outline-none focus-visible:ring-0",
                          fieldState.invalid &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </Field>
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col justify-start items-start w-full">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password..."
                          autoComplete="off"
                          className={cn(
                            "outline-none focus-visible:ring-0",
                            fieldState.invalid &&
                              "border-red-500 focus-visible:ring-red-500",
                          )}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-start items-start w-full">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Confirm Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your password..."
                          autoComplete="off"
                          className={cn(
                            "outline-none focus-visible:ring-0",
                            fieldState.invalid &&
                              "border-red-500 focus-visible:ring-red-500",
                          )}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                variant="default"
                type="submit"
                className={
                  "bg-black w-full text-white mt-6 py-6 cursor-pointer"
                }
              >
                Sign Up
              </Button>
            </form>

            <div className="w-full flex justify-end">
              <span className="text-blue-500 underline cursor-pointer">
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
