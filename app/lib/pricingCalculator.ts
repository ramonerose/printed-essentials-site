/**
 * PRICING CALCULATOR
 *
 * This module handles all pricing calculations for the instant quote tool.
 * It uses the configuration from pricingConfig.ts
 */

import {
  COST_LEVELS,
  QUANTITY_BANDS,
  MARKUP_PERCENTAGES,
} from './pricingConfig';

/**
 * Determine which cost level a garment falls into
 */
export function getCostLevel(cost: number): number {
  const level = COST_LEVELS.find(
    (level) => cost >= level.min && cost <= level.max
  );
  return level?.level || 1;
}

/**
 * Find the appropriate quantity band index for markup calculation
 * Returns the index in the QUANTITY_BANDS array
 */
export function getQuantityBandIndex(quantity: number): number {
  let index = 0;
  for (let i = 0; i < QUANTITY_BANDS.length; i++) {
    if (quantity >= QUANTITY_BANDS[i]) {
      index = i;
    }
  }
  return index;
}

/**
 * Get the markup percentage for a given cost and quantity
 */
export function getMarkupPercentage(cost: number, quantity: number): number {
  const level = getCostLevel(cost);
  const quantityIndex = getQuantityBandIndex(quantity);

  const markupArray = MARKUP_PERCENTAGES[level as keyof typeof MARKUP_PERCENTAGES];
  return markupArray[quantityIndex];
}

/**
 * Calculate the garment price per piece
 * Formula: cost * (1 + markupPercent / 100)
 */
export function calculateGarmentPrice(cost: number, quantity: number): number {
  const markupPercent = getMarkupPercentage(cost, quantity);
  const multiplier = 1 + markupPercent / 100;
  return cost * multiplier;
}

/**
 * Calculate the total per-piece price including garment and DTF add-ons
 */
export function calculatePerPiecePrice(
  garmentCost: number,
  quantity: number,
  dtfAddOns: number
): number {
  const garmentPrice = calculateGarmentPrice(garmentCost, quantity);
  const totalPerPiece = garmentPrice + dtfAddOns;

  // Round to nearest $0.25
  return Math.round(totalPerPiece * 4) / 4;
}

/**
 * Calculate the total order price
 */
export function calculateOrderTotal(perPiecePrice: number, quantity: number): number {
  const total = perPiecePrice * quantity;

  // Round to nearest whole dollar
  return Math.round(total);
}

/**
 * Main pricing calculation function
 * Returns both per-piece and total prices
 */
export function calculateQuote(
  garmentCost: number,
  quantity: number,
  dtfAddOns: number
) {
  const perPiece = calculatePerPiecePrice(garmentCost, quantity, dtfAddOns);
  const total = calculateOrderTotal(perPiece, quantity);

  return {
    perPiece,
    total,
    garmentPrice: calculateGarmentPrice(garmentCost, quantity),
    dtfAddOns,
    quantity,
  };
}
