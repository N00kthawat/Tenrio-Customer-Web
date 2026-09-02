import React from "react";

interface AuthShellProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  centerHeader?: boolean;
}

export function AuthShell({ title, description, children, footer, centerHeader = false }: AuthShellProps) {
  return (
    <div className="mx-auto max-w-md w-full p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className={`mb-8 ${centerHeader ? "text-center" : ""}`}>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">{title}</h1>
        {description && <div className="text-sm text-slate-600">{description}</div>}
      </div>
      
      {children}
      
      {footer && (
        <div className="mt-6 text-center text-sm text-slate-600">
          {footer}
        </div>
      )}
    </div>
  );
}
