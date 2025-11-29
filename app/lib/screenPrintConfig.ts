/**
 * SCREEN PRINTING CONFIGURATION
 *
 * This file contains all pricing data for the screen printing instant quote tool.
 * Update the values below to adjust pricing without touching the calculation logic.
 */

// ============================================================================
// GARMENT COSTS (INTERNAL - NOT SHOWN TO CUSTOMER)
// ============================================================================

export const SCREEN_PRINT_GARMENT_COSTS = {
  tshirts: {
    good: { name: 'Gildan 5000 or SoftStyle', cost: 2.49 },
    better: { name: 'Bella Canvas 3001', cost: 4.00 },
    best: { name: 'AS Colour Staple or Comfort Colors 1717', cost: 5.40 },
  },
  hoodies: {
    good: { name: 'Gildan 18500', cost: 9.85 },
    better: { name: 'AS Colour Supply Hood', cost: 15.00 },
    best: { name: 'Independent Trading Co hoodie', cost: 17.00 },
  },
  sweatshirts: {
    good: { name: 'Gildan 18000', cost: 7.20 },
  },
} as const;

// ============================================================================
// GARMENT MARKUP MATRIX (Same as DTF)
// ============================================================================

export const SCREEN_PRINT_COST_LEVELS = [
  { min: 0, max: 2.50, level: 1 },
  { min: 2.51, max: 3.50, level: 2 },
  { min: 3.51, max: 5.50, level: 3 },
  { min: 5.51, max: 8.50, level: 4 },
  { min: 8.51, max: 13.50, level: 5 },
  { min: 13.51, max: 15.50, level: 6 },
  { min: 15.51, max: 18.50, level: 7 },
  { min: 18.51, max: Infinity, level: 8 },
] as const;

// Quantity bands: [0-23, 24-47, 48-71, 72-143, 144-287, 288-575, 576-1007, 1008+]
export const SCREEN_PRINT_QUANTITY_BANDS = [
  { min: 0, max: 23, index: 0 },
  { min: 24, max: 47, index: 1 },
  { min: 48, max: 71, index: 2 },
  { min: 72, max: 143, index: 3 },
  { min: 144, max: 287, index: 4 },
  { min: 288, max: 575, index: 5 },
  { min: 576, max: 1007, index: 6 },
  { min: 1008, max: Infinity, index: 7 },
] as const;

export const SCREEN_PRINT_MARKUP_PERCENTAGES = {
  1: [425, 375, 325, 275, 250, 225, 200, 188],
  2: [335, 285, 240, 210, 190, 175, 163, 150],
  3: [260, 220, 193, 173, 160, 148, 138, 128],
  4: [210, 175, 155, 140, 130, 120, 113, 105],
  5: [160, 135, 120, 108, 100, 93, 88, 83],
  6: [130, 110, 98, 88, 83, 78, 73, 68],
  7: [110, 93, 83, 75, 70, 65, 61, 58],
  8: [90, 76, 68, 61, 58, 54, 51, 48],
} as const;

// ============================================================================
// SCREEN PRINT CONTRACT PRICING (MY COSTS)
// ============================================================================
// Cost per location based on quantity and color count

export const CONTRACT_PRINT_COSTS = {
  // Quantities 36-71
  '36-71': {
    1: 1.37,
    2: 1.56,
    3: 1.72,
    4: 1.88,
    5: 2.03,
    6: 2.18,
  },
  // Quantities 72-143
  '72-143': {
    1: 1.13,
    2: 1.34,
    3: 1.54,
    4: 1.60,
    5: 1.71,
    6: 1.81,
  },
  // Quantities 144-239
  '144-239': {
    1: 1.05,
    2: 1.31,
    3: 1.42,
    4: 1.58,
    5: 1.65,
    6: 1.70,
  },
  // Quantities 240-359
  '240-359': {
    1: 0.99,
    2: 1.15,
    3: 1.36,
    4: 1.42,
    5: 1.52,
    6: 1.63,
  },
  // Quantities 360-499
  '360-499': {
    1: 0.94,
    2: 1.10,
    3: 1.16,
    4: 1.26,
    5: 1.36,
    6: 1.47,
  },
} as const;

// ============================================================================
// SCREEN AND FILM SETUP COSTS
// ============================================================================
// TO ADJUST: Change these values to update setup pricing

export const SCREEN_COST = 10.00;  // Cost per screen
export const FILM_COST = 8.00;     // Cost per film
export const SETUP_COST_PER_COLOR = SCREEN_COST + FILM_COST;  // Total: 18.00

// ============================================================================
// POLY BASE UPCHARGE (For Hoodies and Sweatshirts only)
// ============================================================================
// TO ADJUST: Change this value to update poly base upcharge

export const POLY_BASE_COST_PER_LOCATION = 0.35;

// ============================================================================
// PRINT MARKUP MULTIPLIER
// ============================================================================
// TO ADJUST: Change this value to update print markup (currently 2.0x)

export const PRINT_MARKUP_MULTIPLIER = 2.0;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const MINIMUM_QUANTITY = 36;
export const MAX_COLORS_UNDER_72 = 4;
export const MAX_COLORS_72_PLUS = 6;
