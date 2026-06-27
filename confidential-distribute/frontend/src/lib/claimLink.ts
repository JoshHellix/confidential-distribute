import type { ClaimPayload } from "@/components/AirdropAdmin";

export function encodeClaimPayload(payload: ClaimPayload): string {
  return btoa(JSON.stringify(payload));
}

export function decodeClaimPayload(encoded: string): ClaimPayload | null {
  try {
    const json = atob(decodeURIComponent(encoded));
    const parsed = JSON.parse(json) as ClaimPayload;
    if (!parsed.airdropAddress?.startsWith("0x")) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildClaimUrl(payload: ClaimPayload): string {
  if (typeof window === "undefined") return "";
  const encoded = encodeClaimPayload(payload);
  return `${window.location.origin}/app?claim=${encodeURIComponent(encoded)}`;
}

export function parseUsdcInput(value: string): bigint {
  const trimmed = value.trim() || "0";
  const [whole, frac = ""] = trimmed.split(".");
  const padded = (frac + "000000").slice(0, 6);
  return BigInt(whole) * 1_000_000n + BigInt(padded || "0");
}

export function parseUsdcLines(text: string): bigint[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseUsdcInput);
}
