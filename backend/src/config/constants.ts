/** Domain constants shared across modules. Centralized so demo tuning is one edit, not a hunt. */

export const POINTS_PER_CLASSIFICATION: Record<string, number> = {
  RECYCLABLE: 10,
  BIODEGRADABLE: 8,
  HAZARDOUS: 15,
  REJECTED: 0,
};

/** How long a disposal token/QR stays valid after a scan, per dustbin_arch.md ("30-60 mins"). */
export const TOKEN_TTL_MINUTES = 45;

/** Bonus applied to pending points when the full triple-lock + throw chain completes successfully. */
export const FULL_CHAIN_BONUS_PERCENT = 20;

/** GPS proximity radius (meters) a user must be within to pass the bin-presence check. */
export const GPS_PROXIMITY_RADIUS_METERS = 100;

/** Significant-change thresholds mirrored from the ESP32 telemetry logic in dustbin_arch.md. */
export const SENSOR_SIGNIFICANT_FILL_DELTA_PERCENT = 10;

export const BIN_CAMERA_TRIGGER_FILL_PERCENT = 80;

/** A bin at or above this fill level transitions to FULL status (unless MAINTENANCE/OFFLINE). */
export const BIN_FULL_THRESHOLD_PERCENT = 95;

/**
 * How recent a device-authenticated BinCameraEvent for a bin must be to corroborate a
 * BIN_CAMERA or NFC_TAG throw verification. See throws.service.ts.
 */
export const THROW_CAMERA_CORROBORATION_WINDOW_MINUTES = 5;
