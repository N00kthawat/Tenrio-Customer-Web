import { IBM_Plex_Sans_Thai } from "next/font/google";

const ibmPlex = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600"],
  subsets: ["thai", "latin"],
});

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return <div className={ibmPlex.className}>{children}</div>;
}
