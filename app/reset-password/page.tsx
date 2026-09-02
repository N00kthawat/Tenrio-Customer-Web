import { ResetPasswordClient } from "./client";

export default async function ResetPasswordPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await searchParams;
  const token = typeof resolvedParams.token === "string" ? resolvedParams.token : undefined;

  return <ResetPasswordClient token={token} />;
}
