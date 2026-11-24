"use server";

import { revalidatePath } from "next/cache";
import { UpdateStatusInputSchema, type AuditEntry, type Transaction } from "@/lib/schemas";
import { updateTransactionStatus } from "@/lib/store";

export interface UpdateStatusResult {
  ok: boolean;
  error?: string;
  transaction?: Transaction;
  audit?: AuditEntry;
}

export async function updateStatusAction(input: {
  transactionId: string;
  nextStatus: string;
  reason: string;
}): Promise<UpdateStatusResult> {
  const parsed = UpdateStatusInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid status update payload.",
    };
  }

  const updated = updateTransactionStatus(
    parsed.data.transactionId,
    parsed.data.nextStatus,
    parsed.data.reason
  );

  if (!updated) {
    return { ok: false, error: `Transaction ${parsed.data.transactionId} not found.` };
  }

  revalidatePath("/");
  return {
    ok: true,
    transaction: updated.transaction,
    audit: updated.audit,
  };
}
