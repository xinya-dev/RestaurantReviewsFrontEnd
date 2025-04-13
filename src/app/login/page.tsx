"use client";
import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@/shared/Alert";

interface PageLoginProps {
  className?: string;
}

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

interface AlertState {
  type: 'success' | 'error';
  message: string;
  show: boolean;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email_or_username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    type: 'success',
    message: '',
    show: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: 'success', message: '', show: false });

    try {
      const response = await fetch('http://35.92.149.12:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens and user data
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Dispatch auth state change event
        window.dispatchEvent(new Event('authStateChange'));

        setAlert({
          type: 'success',
          message: 'Login successful!',
          show: true
        });

        // Redirect to home page
        router.push('/');
      } else {
        setAlert({
          type: 'error',
          message: data.detail || 'Login failed. Please try again.',
          show: true
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'An error occurred. Please try again.',
        show: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
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
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert
                type={alert.type}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert({ ...alert, show: false })}
              />
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email or Username
              </span>
              <Input
                type="text"
                name="email_or_username"
                value={formData.email_or_username}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="mt-1"
                required
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/login" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
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
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link
              href="/signup"
              className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
