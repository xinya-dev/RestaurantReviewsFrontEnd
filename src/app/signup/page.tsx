"use client";
import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import Alert from "@/shared/Alert";
import { useRouter } from "next/navigation";

export interface PageSignUpProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const userTypes = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "OWNER", label: "Restaurant Owner" },
];

const genderOptions = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
  { value: "N", label: "Prefer not to say" },
];

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    about_me: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "error",
    message: "",
  });

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
    setFormData(prev => ({ ...prev, user_type: type }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Username validation
    if (formData.username.length < 3) {
      setAlert({
        show: true,
        type: "error",
        message: "Username must be at least 3 characters long",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setAlert({
        show: true,
        type: "error",
        message: "Password must be at least 8 characters long",
      });
      return false;
    }

    // Password confirmation
    if (formData.password !== formData.confirm_password) {
      setAlert({
        show: true,
        type: "error",
        message: "Passwords do not match",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Include confirm_password in the API request
      const apiData = {
        ...formData,
        confirm_password: formData.confirm_password
      };
      
      // Log the request data
      console.log('Sending registration data:', JSON.stringify(apiData, null, 2));
      
      const response = await fetch("http://35.92.149.12:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(apiData),
      });

      let data;
      const responseText = await response.text();
      console.log('Raw server response:', responseText);
      
      try {
        data = JSON.parse(responseText);
        console.log('Parsed server response:', data);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400) {
          if (data.error) {
            // If error is an object with field-specific errors
            if (typeof data.error === 'object') {
              const errors = Object.entries(data.error)
                .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`)
                .join(', ');
              throw new Error(errors);
            }
            // If error is a string
            throw new Error(data.error);
          } else if (data.errors) {
            // Handle alternative error format
            const errors = Object.entries(data.errors)
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`)
              .join(', ');
            throw new Error(errors);
          }
        }
        throw new Error(`Registration failed. Status: ${response.status}. ${JSON.stringify(data)}`);
      }

      setAlert({
        show: true,
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setAlert({
        show: true,
        type: "error",
        message: error instanceof Error ? error.message : "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`nc-PageSignUp`}>
      <Alert 
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* User Type Selection */}
          {!selectedUserType && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center text-neutral-900 dark:text-neutral-100">
                Select User Type
              </h3>
              <div className="grid gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleUserTypeSelect(type.value)}
                    className="w-full py-4 px-6 rounded-lg bg-primary-50 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-neutral-100 font-medium"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Social Login and Form */}
          {selectedUserType && (
            <>
              {/* Selected User Type Indicator */}
              <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-primary-50 dark:bg-neutral-800">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Registering as:
                  </span>
                  <span className="ml-2 font-semibold text-primary-900 dark:text-primary-100">
                    {userTypes.find(type => type.value === selectedUserType)?.label}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedUserType("");
                    setFormData(prev => ({ ...prev, user_type: "" }));
                  }}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="grid gap-3">
                {loginSocials.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  >
                    <Image
                      className="flex-shrink-0"
                      src={item.icon}
                      alt={item.name}
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </a>
                ))}
              </div>
              <div className="relative text-center">
                <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                  OR
                </span>
                <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
              </div>
              
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                {/* Required Fields */}
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Username <span className="text-red-500">*</span>
                  </span>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="mt-1"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Email address <span className="text-red-500">*</span>
                  </span>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    className="mt-1"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Password <span className="text-red-500">*</span>
                  </span>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Confirm Password <span className="text-red-500">*</span>
                  </span>
                  <Input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </label>

                {/* Optional Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      First Name
                    </span>
                    <Input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First name"
                      className="mt-1"
                    />
                  </label>

                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Last Name
                    </span>
                    <Input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="mt-1"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Phone Number
                  </span>
                  <Input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="mt-1"
                  />
                </label>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    About Me
                  </span>
                  <textarea
                    name="about_me"
                    value={formData.about_me}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    className="mt-1 block w-full rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                    rows={3}
                  />
                </label>

                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Gender
                  </span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <ButtonPrimary type="submit" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </ButtonPrimary>
              </form>
            </>
          )}

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
