import { VerifyEmailClient } from "./client";

export default async function VerifyEmailPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await searchParams;
  const token = typeof resolvedParams.token === "string" ? resolvedParams.token : undefined;

  return <VerifyEmailClient token={token} />;
}
