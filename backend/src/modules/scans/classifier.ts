import type { WasteClassification } from "@prisma/client";

/**
 * Deterministic mock waste classifier: no external AI call, no API key. Swappable behind this
 * same signature for a real vision model later (e.g. Claude Vision) without touching callers.
 * Deterministic-per-input (hashed from the image URLs) so the same demo photos classify
 * consistently across runs, while different inputs vary — closer to real classifier behavior
 * than pure randomness.
 */
export function classifyWaste(imageUrls: string[]): {
  classification: WasteClassification;
  confidence: number;
} {
  const seed = imageUrls.join("|");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  // Weighted distribution: mostly recyclable/biodegradable, occasional hazardous/rejected.
  const bucket = hash % 100;
  let classification: WasteClassification;
  if (bucket < 45) classification = "RECYCLABLE";
  else if (bucket < 80) classification = "BIODEGRADABLE";
  else if (bucket < 92) classification = "HAZARDOUS";
  else classification = "REJECTED";

  const confidence = 0.7 + ((hash >> 8) % 30) / 100; // 0.70 - 0.99

  return { classification, confidence };
}
