export type Role = "CITIZEN" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  wasteCoinBalance: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
}

export type BinStatus = "ACTIVE" | "MAINTENANCE" | "OFFLINE" | "FULL";

export interface Bin {
  id: string;
  code: string;
  label: string;
  latitude: number;
  longitude: number;
  capacityLiters: number;
  currentFillPercent: number;
  currentWeightKg: number;
  status: BinStatus;
  wardId: string | null;
  ward?: { id: string; name: string; code: string } | null;
  lastTelemetryAt: string | null;
}

export interface SensorLog {
  id: string;
  binId: string;
  fillPercent: number;
  weightKg: number;
  lidEvent: boolean;
  motionDetected: boolean;
  recordedAt: string;
  source: "SIMULATED" | "DEVICE";
}

export interface BinCameraEvent {
  id: string;
  binId: string;
  imageUrl: string;
  segregationQualityScore: number | null;
  contaminationDetected: boolean;
  hazardousDetected: boolean;
  createdAt: string;
}

export type WasteClassification = "RECYCLABLE" | "BIODEGRADABLE" | "HAZARDOUS" | "REJECTED";

export interface WasteScan {
  id: string;
  imageUrls: string[];
  aiClassification: WasteClassification;
  aiConfidence: number;
  pendingPoints: number;
  status: "PENDING_TOKEN" | "TOKEN_ISSUED" | "EXPIRED" | "CONSUMED";
  createdAt: string;
}

export interface DisposalToken {
  id: string;
  scanId: string;
  code: string;
  status: "ACTIVE" | "VERIFIED" | "EXPIRED" | "FAILED";
  expiresAt: string;
}

export interface ThrowResult {
  success: boolean;
  reason?: "GPS_OUT_OF_RANGE" | "TOKEN_EXPIRED" | "THROW_NOT_VERIFIED";
  pointsAwarded?: number;
  bonusAmount?: number;
}

export interface RewardTransaction {
  id: string;
  type: "EARN_PENDING" | "EARN_RELEASED" | "BONUS" | "REDEEM" | "ADJUSTMENT";
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  iconEmoji: string;
  earned: boolean;
  earnedAt: string | null;
}

export interface RedemptionOption {
  id: string;
  code: string;
  title: string;
  description: string;
  costPoints: number;
  provider: string;
}

export interface RouteStop {
  id: string;
  binId: string;
  sequenceOrder: number;
  distanceFromPrevMeters: number;
  durationFromPrevSeconds: number;
  bin: Bin;
}

export interface OptimizedRoute {
  id: string;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  algorithm: string;
  geometryGeoJson: [number, number][];
  generatedAt: string;
  stops: RouteStop[];
}

export interface WardSummary {
  wardId: string;
  wardName: string;
  wardCode: string;
  binCount: number;
  averageFillPercent: number;
  binsNeedingCollection: number;
}

export interface SegregationTrendPoint {
  day: string;
  eventCount: number;
  averageSegregationScore: number;
  contaminationRate: number;
  hazardousCount: number;
}
