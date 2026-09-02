"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { ROUTES } from "@/config/routes";

interface HomeCTAProps {
  btnPricing: string;
  btnRegister: string;
  btnDashboard: string;
}

export function HomeCTA({ btnPricing, btnRegister, btnDashboard }: HomeCTAProps) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-wrap gap-3">
      <Link className={buttonClasses({ variant: "primary" })} href={ROUTES.MARKETING.PRICING}>
        {btnPricing}
      </Link>
      
      {!isLoading && (
        isAuthenticated ? (
          <Link className={buttonClasses({ variant: "secondary" })} href={ROUTES.DASHBOARD.HOME}>
            {btnDashboard}
          </Link>
        ) : (
          <Link className={buttonClasses({ variant: "secondary" })} href={ROUTES.AUTH.REGISTER}>
            {btnRegister}
          </Link>
        )
      )}
    </div>
  );
}
