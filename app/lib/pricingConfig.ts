/**
 * PRICING CONFIGURATION
 *
 * This file contains all pricing data for the instant quote tool.
 * Update the values below to adjust pricing without touching the calculation logic.
 */

// ============================================================================
// GARMENT COSTS
// ============================================================================
// These are your internal costs for each garment tier
// To update pricing, simply change the cost values below

export const GARMENT_COSTS = {
  tshirts: {
    good: { name: 'Gildan 5000 or SoftStyle', cost: 3.00 },
    better: { name: 'Bella Canvas 3001', cost: 4.00 },
    best: { name: 'AS Colour / Comfort Colors', cost: 6.00 },
  },
  hoodies: {
    good: { name: 'Gildan 18500', cost: 9.85 },
    better: { name: 'AS Colour Supply Hood', cost: 15.00 },
    best: { name: 'Independent Trading Co', cost: 17.00 },
  },
  sweatshirts: {
    good: { name: 'Gildan 18000', cost: 7.20 },
    better: { name: 'Standard Sweatshirt', cost: 10.00 }, // Add if needed
    best: { name: 'Premium Sweatshirt', cost: 13.00 }, // Add if needed
  },
  polos: {
    good: { name: 'Sport Tek ST550', cost: 6.72 },
    better: { name: 'Sport Tek ST650', cost: 11.89 },
    best: { name: 'Nike Dri Fit Micro Pique 2.0', cost: 22.76 },
  },
} as const;

// ============================================================================
// MARKUP MATRIX (Teesom Style)
// ============================================================================
// Cost levels define price ranges for garments
// Markup percentages determine profit margin based on cost level and quantity

export const COST_LEVELS = [
  { min: 0, max: 2.50, level: 1 },
  { min: 2.51, max: 3.50, level: 2 },
  { min: 3.51, max: 5.50, level: 3 },
  { min: 5.51, max: 8.50, level: 4 },
  { min: 8.51, max: 13.50, level: 5 },
  { min: 13.51, max: 15.50, level: 6 },
  { min: 15.51, max: 18.50, level: 7 },
  { min: 18.51, max: Infinity, level: 8 },
] as const;

// Quantity bands for the markup matrix
export const QUANTITY_BANDS = [0, 24, 48, 72, 144, 288, 576, 1008] as const;

// Markup multipliers by level (rows) and quantity index (columns)
// Higher quantities = lower markup multiplier = better per-piece pricing
export const MARKUP_PERCENTAGES = {
  1: [425, 375, 325, 275, 250, 225, 200, 188],  // Level 1: $0 - $2.50
  2: [335, 285, 240, 210, 190, 175, 163, 150],  // Level 2: $2.51 - $3.50
  3: [260, 220, 193, 173, 160, 148, 138, 128],  // Level 3: $3.51 - $5.50
  4: [210, 175, 155, 140, 130, 120, 113, 105],  // Level 4: $5.51 - $8.50
  5: [160, 135, 120, 108, 100, 93, 88, 83],     // Level 5: $8.51 - $13.50
  6: [130, 110, 98, 88, 83, 78, 73, 68],        // Level 6: $13.51 - $15.50
  7: [110, 93, 83, 75, 70, 65, 61, 58],         // Level 7: $15.51 - $18.50
  8: [90, 76, 68, 61, 58, 54, 51, 48],          // Level 8: $18.51+
} as const;

// ============================================================================
// DTF IMPRINT ADD-ON PRICING
// ============================================================================
// Flat add-ons per location for DTF printing
// To adjust DTF pricing, simply change the values below

export const DTF_PRICING = {
  leftChest: 2.00,
  mediumPrint: 4.00,      // Medium front or back (up to 10x12)
  largePrint: 7.00,       // Large front or back (up to 12x16)
  sleevSmall: 1.50,      // Small sleeve (up to 3x3)
  sleeveLarge: 2.50,     // Large sleeve (up to 3.5x15)
  neckLabel: 1.50,
} as const;

// ============================================================================
// PRINT LAYOUT PRESETS
// ============================================================================
// Common print location combinations
// Each layout defines which DTF add-ons to apply

export type PrintLayout = {
  id: string;
  name: string;
  description: string;
  addOns: number;  // Total DTF cost for this layout
};

export const PRINT_LAYOUTS: PrintLayout[] = [
  {
    id: 'leftChest',
    name: 'Left Chest Only',
    description: 'Single small print on left chest',
    addOns: DTF_PRICING.leftChest,
  },
  {
    id: 'leftChestMediumBack',
    name: 'Left Chest + Medium Back',
    description: 'Left chest plus medium back print (up to 10x12)',
    addOns: DTF_PRICING.leftChest + DTF_PRICING.mediumPrint,
  },
  {
    id: 'leftChestLargeBack',
    name: 'Left Chest + Large Back',
    description: 'Left chest plus large back print (up to 12x16)',
    addOns: DTF_PRICING.leftChest + DTF_PRICING.largePrint,
  },
  {
    id: 'largeFront',
    name: 'Large Front Only',
    description: 'Single large print on front (up to 12x16)',
    addOns: DTF_PRICING.largePrint,
  },
  {
    id: 'largeBack',
    name: 'Large Back Only',
    description: 'Single large print on back (up to 12x16)',
    addOns: DTF_PRICING.largePrint,
  },
  {
    id: 'frontAndBack',
    name: 'Large Front + Large Back',
    description: 'Large prints on both front and back',
    addOns: DTF_PRICING.largePrint + DTF_PRICING.largePrint,
  },
];

// ============================================================================
// QUANTITY BAND OPTIONS
// ============================================================================
// Quantity ranges displayed to customers in the instant quote tool

export type QuantityBand = {
  id: string;
  label: string;
  min: number;
  max: number;
  midpoint: number;  // Used for calculations
};

export const CUSTOMER_QUANTITY_BANDS: QuantityBand[] = [
  { id: '12-23', label: '12 - 23 pieces', min: 12, max: 23, midpoint: 18 },
  { id: '24-47', label: '24 - 47 pieces', min: 24, max: 47, midpoint: 36 },
  { id: '48-71', label: '48 - 71 pieces', min: 48, max: 71, midpoint: 60 },
  { id: '72-143', label: '72 - 143 pieces', min: 72, max: 143, midpoint: 108 },
  { id: '144-287', label: '144 - 287 pieces', min: 144, max: 287, midpoint: 216 },
  { id: '288+', label: '288+ pieces', min: 288, max: 999999, midpoint: 288 },
];
