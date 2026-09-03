"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { OrganizationService } from "@/services/organizations/organization.service";
import { ROUTES } from "@/config/routes";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

type OrgStatus = 'loading' | 'error' | 'zero' | 'resolved' | 'ambiguous';

export function OrganizationGuard({ 
  children, 
  requireSetup = false 
}: { 
  children: React.ReactNode, 
  requireSetup?: boolean 
}) {
  const router = useRouter();
  const [status, setStatus] = useState<OrgStatus>('loading');
  const { t } = useTranslation();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  
  const requestCountRef = useRef(0);

  const fetchOrgs = useCallback(async () => {
    const requestId = ++requestCountRef.current;
    setStatus('loading');
    try {
      const orgs = await OrganizationService.getOrganizations();
      
      if (requestCountRef.current !== requestId) return;
      
      if (orgs.length === 0) setStatus('zero');
      else if (orgs.length === 1) setStatus('resolved');
      else setStatus('ambiguous');
    } catch {
      if (requestCountRef.current !== requestId) return;
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    
    fetchOrgs();
    
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestCountRef.current++; // Invalidate pending requests on cleanup
    };
  }, [isAuthenticated, isAuthLoading, fetchOrgs]);

  useEffect(() => {
    if (status === 'zero' && !requireSetup) {
      router.replace(ROUTES.ORGANIZATION.SETUP);
    } else if (status === 'resolved' && requireSetup) {
      router.replace(ROUTES.DASHBOARD.HOME);
    }
  }, [status, requireSetup, router]);

  if (isAuthLoading || status === 'loading') {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <Alert variant="error" className="mb-4">
            {t("organization.guard.errorTitle")}
          </Alert>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {t("organization.guard.errorDesc")}
          </p>
          <Button onClick={() => fetchOrgs()} fullWidth>
            {t("organization.guard.retry")}
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'ambiguous') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <Alert variant="error" className="mb-4">
            {t("organization.unresolved.title")}
          </Alert>
          <p className="text-slate-600 text-sm leading-relaxed text-left">
            {t("organization.unresolved.desc")}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'zero' && !requireSetup) return null;
  if (status === 'resolved' && requireSetup) return null;

  return <>{children}</>;
}
