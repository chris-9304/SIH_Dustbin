-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CITIZEN', 'ADMIN');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARN_PENDING', 'EARN_RELEASED', 'BONUS', 'REDEEM', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "RedemptionStatus" AS ENUM ('PENDING', 'FULFILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BinStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'OFFLINE', 'FULL');

-- CreateEnum
CREATE TYPE "SensorSource" AS ENUM ('SIMULATED', 'DEVICE');

-- CreateEnum
CREATE TYPE "WasteClassification" AS ENUM ('RECYCLABLE', 'BIODEGRADABLE', 'HAZARDOUS', 'REJECTED');

-- CreateEnum
CREATE TYPE "ScanStatus" AS ENUM ('PENDING_TOKEN', 'TOKEN_ISSUED', 'EXPIRED', 'CONSUMED');

-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('ACTIVE', 'VERIFIED', 'EXPIRED', 'FAILED');

-- CreateEnum
CREATE TYPE "VerificationMethod" AS ENUM ('SELF_PHOTO', 'BIN_CAMERA', 'NFC_TAG');

-- CreateEnum
CREATE TYPE "RouteStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "RouteStopStatus" AS ENUM ('PENDING', 'VISITED', 'SKIPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CITIZEN',
    "wasteCoinBalance" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastThrowDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconEmoji" TEXT NOT NULL DEFAULT '🏅',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "throwEventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedemptionOption" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costPoints" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedemptionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redemption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "redemptionOptionId" TEXT NOT NULL,
    "pointsSpent" INTEGER NOT NULL,
    "status" "RedemptionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "capacityLiters" INTEGER NOT NULL DEFAULT 240,
    "currentFillPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentWeightKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "BinStatus" NOT NULL DEFAULT 'ACTIVE',
    "wardId" TEXT,
    "deviceApiKey" TEXT NOT NULL,
    "lastTelemetryAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorLog" (
    "id" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "fillPercent" DOUBLE PRECISION NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "lidEvent" BOOLEAN NOT NULL DEFAULT false,
    "motionDetected" BOOLEAN NOT NULL DEFAULT false,
    "batteryPercent" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" "SensorSource" NOT NULL DEFAULT 'SIMULATED',

    CONSTRAINT "SensorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinCameraEvent" (
    "id" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "sensorLogId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "segregationQualityScore" DOUBLE PRECISION,
    "contaminationDetected" BOOLEAN NOT NULL DEFAULT false,
    "hazardousDetected" BOOLEAN NOT NULL DEFAULT false,
    "aiRawResult" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BinCameraEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WasteScan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "aiClassification" "WasteClassification" NOT NULL,
    "aiConfidence" DOUBLE PRECISION NOT NULL,
    "pendingPoints" INTEGER NOT NULL,
    "status" "ScanStatus" NOT NULL DEFAULT 'PENDING_TOKEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WasteScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisposalToken" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "TokenStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DisposalToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThrowEvent" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "verificationMethod" "VerificationMethod" NOT NULL,
    "gpsLat" DOUBLE PRECISION NOT NULL,
    "gpsLng" DOUBLE PRECISION NOT NULL,
    "qrMatched" BOOLEAN NOT NULL,
    "tokenValidAtCheck" BOOLEAN NOT NULL,
    "throwVerified" BOOLEAN NOT NULL,
    "pointsAwarded" INTEGER,
    "bonusPercent" DOUBLE PRECISION,
    "evidenceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThrowEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "status" "RouteStatus" NOT NULL DEFAULT 'PLANNED',
    "totalDistanceMeters" DOUBLE PRECISION NOT NULL,
    "totalDurationSeconds" DOUBLE PRECISION NOT NULL,
    "algorithm" TEXT NOT NULL,
    "geometryGeoJson" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "sequenceOrder" INTEGER NOT NULL,
    "distanceFromPrevMeters" DOUBLE PRECISION NOT NULL,
    "durationFromPrevSeconds" DOUBLE PRECISION NOT NULL,
    "status" "RouteStopStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_code_key" ON "Badge"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_userId_badgeId_key" ON "UserBadge"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "RewardTransaction_userId_createdAt_idx" ON "RewardTransaction"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RedemptionOption_code_key" ON "RedemptionOption"("code");

-- CreateIndex
CREATE INDEX "Redemption_userId_createdAt_idx" ON "Redemption"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Ward_code_key" ON "Ward"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Bin_code_key" ON "Bin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Bin_deviceApiKey_key" ON "Bin"("deviceApiKey");

-- CreateIndex
CREATE INDEX "Bin_wardId_idx" ON "Bin"("wardId");

-- CreateIndex
CREATE INDEX "Bin_status_idx" ON "Bin"("status");

-- CreateIndex
CREATE INDEX "SensorLog_binId_recordedAt_idx" ON "SensorLog"("binId", "recordedAt");

-- CreateIndex
CREATE INDEX "BinCameraEvent_binId_createdAt_idx" ON "BinCameraEvent"("binId", "createdAt");

-- CreateIndex
CREATE INDEX "WasteScan_userId_createdAt_idx" ON "WasteScan"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DisposalToken_scanId_key" ON "DisposalToken"("scanId");

-- CreateIndex
CREATE UNIQUE INDEX "DisposalToken_code_key" ON "DisposalToken"("code");

-- CreateIndex
CREATE INDEX "DisposalToken_userId_status_idx" ON "DisposalToken"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ThrowEvent_tokenId_key" ON "ThrowEvent"("tokenId");

-- CreateIndex
CREATE INDEX "ThrowEvent_binId_createdAt_idx" ON "ThrowEvent"("binId", "createdAt");

-- CreateIndex
CREATE INDEX "RouteStop_binId_idx" ON "RouteStop"("binId");

-- CreateIndex
CREATE UNIQUE INDEX "RouteStop_routeId_sequenceOrder_key" ON "RouteStop"("routeId", "sequenceOrder");

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardTransaction" ADD CONSTRAINT "RewardTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardTransaction" ADD CONSTRAINT "RewardTransaction_throwEventId_fkey" FOREIGN KEY ("throwEventId") REFERENCES "ThrowEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_redemptionOptionId_fkey" FOREIGN KEY ("redemptionOptionId") REFERENCES "RedemptionOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bin" ADD CONSTRAINT "Bin_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorLog" ADD CONSTRAINT "SensorLog_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinCameraEvent" ADD CONSTRAINT "BinCameraEvent_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinCameraEvent" ADD CONSTRAINT "BinCameraEvent_sensorLogId_fkey" FOREIGN KEY ("sensorLogId") REFERENCES "SensorLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WasteScan" ADD CONSTRAINT "WasteScan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisposalToken" ADD CONSTRAINT "DisposalToken_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "WasteScan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisposalToken" ADD CONSTRAINT "DisposalToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThrowEvent" ADD CONSTRAINT "ThrowEvent_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "DisposalToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThrowEvent" ADD CONSTRAINT "ThrowEvent_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
