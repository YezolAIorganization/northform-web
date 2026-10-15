import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import TrialForm from "./TrialForm";

export const metadata: Metadata = {
  title: "Free Trial | Northform",
  description: "Book your free session. Experience our boutique strength studio.",
};

export default function TrialPage() {
  return (
    <AuthShell
      size="wide"
      eyebrow="Free session"
      title="Book your free session."
      description="Tell us a bit about you. We'll confirm within a day."
    >
      <TrialForm />
    </AuthShell>
  );
}