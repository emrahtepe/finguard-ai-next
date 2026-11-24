import { Suspense } from "react";
import { FinGuardDashboard } from "@/components/FinGuardDashboard";
import { getAuditLog, getTransactions } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const transactions = getTransactions();
  const auditLog = getAuditLog();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">
          Loading FinGuard AI ledger...
        </div>
      }
    >
      <FinGuardDashboard
        initialTransactions={transactions}
        initialAuditLog={auditLog}
      />
    </Suspense>
  );
}
