/**
 * PRICING CALCULATOR
 *
 * This module handles all pricing calculations for the instant quote tool.
 * It uses the configuration from pricingConfig.ts
 */

import {
  COST_LEVELS,
  QUANTITY_BANDS,
  MARKUP_MATRIX,
  SHIPPING_CONFIG,
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
 * Get the markup multiplier for a given cost and quantity
 * Returns a direct multiplier (e.g., 2.5, 1.9, 1.75)
 */
export function getMultiplier(cost: number, quantity: number): number {
  const level = getCostLevel(cost);
  const quantityIndex = getQuantityBandIndex(quantity);

  const multiplierArray = MARKUP_MATRIX[level as keyof typeof MARKUP_MATRIX];
  return multiplierArray[quantityIndex];
}

/**
 * Calculate the shipping cost per piece based on blanks subtotal
 * Free shipping if blanks subtotal >= $200, otherwise $45 flat fee
 */
export function getShippingPerPiece(garmentCost: number, quantity: number): number {
  const blanksSubtotal = garmentCost * quantity;

  if (blanksSubtotal >= SHIPPING_CONFIG.freeShippingThreshold) {
    return 0;
  }

  return SHIPPING_CONFIG.flatShippingFee / quantity;
}

/**
 * Calculate the garment price per piece
 * Formula: cost * multiplier (direct multiplication, not percentage)
 */
export function calculateGarmentPrice(cost: number, quantity: number): number {
  const multiplier = getMultiplier(cost, quantity);
  return cost * multiplier;
}

/**
 * Calculate the total per-piece price including garment, DTF add-ons, and shipping
 */
export function calculatePerPiecePrice(
  garmentCost: number,
  quantity: number,
  dtfAddOns: number
): number {
  const garmentPrice = calculateGarmentPrice(garmentCost, quantity);
  const shippingPerPiece = getShippingPerPiece(garmentCost, quantity);
  const totalPerPiece = garmentPrice + dtfAddOns + shippingPerPiece;

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
  const garmentPrice = calculateGarmentPrice(garmentCost, quantity);
  const shippingPerPiece = getShippingPerPiece(garmentCost, quantity);
  const perPiece = calculatePerPiecePrice(garmentCost, quantity, dtfAddOns);
  const total = calculateOrderTotal(perPiece, quantity);

  return {
    perPiece,
    total,
    garmentPrice,
    dtfAddOns,
    shippingPerPiece,
    quantity,
  };
}
