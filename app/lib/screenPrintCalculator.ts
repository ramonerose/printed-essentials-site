/**
 * SCREEN PRINTING CALCULATOR
 *
 * This module handles all pricing calculations for screen printing quotes.
 */

import {
  SCREEN_PRINT_COST_LEVELS,
  SCREEN_PRINT_QUANTITY_BANDS,
  SCREEN_PRINT_MARKUP_PERCENTAGES,
  CONTRACT_PRINT_COSTS,
  SETUP_COST_PER_COLOR,
  POLY_BASE_COST_PER_LOCATION,
  PRINT_MARKUP_MULTIPLIER,
} from './screenPrintConfig';

/**
 * Get cost level for a garment
 */
function getCostLevel(cost: number): number {
  const level = SCREEN_PRINT_COST_LEVELS.find(
    (level) => cost >= level.min && cost <= level.max
  );
  return level?.level || 1;
}

/**
 * Get quantity band index
 */
function getQuantityBandIndex(quantity: number): number {
  const band = SCREEN_PRINT_QUANTITY_BANDS.find(
    (band) => quantity >= band.min && quantity <= band.max
  );
  return band?.index || 0;
}

/**
 * Get markup percentage for garment
 */
function getMarkupPercentage(cost: number, quantity: number): number {
  const level = getCostLevel(cost);
  const bandIndex = getQuantityBandIndex(quantity);

  const markupArray = SCREEN_PRINT_MARKUP_PERCENTAGES[level as keyof typeof SCREEN_PRINT_MARKUP_PERCENTAGES];
  return markupArray[bandIndex];
}

/**
 * Calculate garment retail price per piece
 */
export function calculateGarmentRetailPrice(cost: number, quantity: number): number {
  const markupPercent = getMarkupPercentage(cost, quantity);
  const multiplier = 1 + markupPercent / 100;
  return cost * multiplier;
}

/**
 * Get contract print cost per location based on quantity and colors
 */
function getContractPrintCost(quantity: number, colors: number): number {
  let band: keyof typeof CONTRACT_PRINT_COSTS;

  if (quantity >= 36 && quantity <= 71) {
    band = '36-71';
  } else if (quantity >= 72 && quantity <= 143) {
    band = '72-143';
  } else if (quantity >= 144 && quantity <= 239) {
    band = '144-239';
  } else if (quantity >= 240 && quantity <= 359) {
    band = '240-359';
  } else if (quantity >= 360 && quantity <= 499) {
    band = '360-499';
  } else {
    // Default to highest band for 500+
    band = '360-499';
  }

  const costs = CONTRACT_PRINT_COSTS[band];
  return costs[colors as keyof typeof costs] || 0;
}

/**
 * Calculate screen printing quote
 */
export function calculateScreenPrintQuote(
  garmentCost: number,
  quantity: number,
  garmentType: 'tshirts' | 'hoodies' | 'sweatshirts',
  frontColors: number,
  backColors: number
) {
  // Step 1: Calculate garment retail price
  const garmentRetailPerPiece = calculateGarmentRetailPrice(garmentCost, quantity);

  // Step 2: Calculate print costs
  const totalColors = frontColors + backColors;
  const numberOfLocations = (frontColors > 0 ? 1 : 0) + (backColors > 0 ? 1 : 0);

  // Setup cost per shirt
  const totalSetupCost = totalColors * SETUP_COST_PER_COLOR;
  const setupPerShirt = totalSetupCost / quantity;

  // Contract print costs
  const frontPrintCost = frontColors > 0 ? getContractPrintCost(quantity, frontColors) : 0;
  const backPrintCost = backColors > 0 ? getContractPrintCost(quantity, backColors) : 0;

  // Poly base upcharge (for hoodies and sweatshirts only)
  const polyUpcharge = (garmentType === 'hoodies' || garmentType === 'sweatshirts')
    ? POLY_BASE_COST_PER_LOCATION * numberOfLocations
    : 0;

  // True print cost per shirt (my cost)
  const truePrintCostPerShirt = frontPrintCost + backPrintCost + setupPerShirt + polyUpcharge;

  // Retail print price (2x markup)
  const retailPrintPerShirt = truePrintCostPerShirt * PRINT_MARKUP_MULTIPLIER;

  // Step 3: Total per piece
  const perPiece = garmentRetailPerPiece + retailPrintPerShirt;

  // Round to nearest $0.25
  const perPieceRounded = Math.round(perPiece * 4) / 4;

  // Step 4: Total estimate
  const totalEstimate = Math.round(perPieceRounded * quantity);

  return {
    perPiece: perPieceRounded,
    total: totalEstimate,
    garmentRetail: garmentRetailPerPiece,
    printCost: retailPrintPerShirt,
    setupCost: totalSetupCost,
    quantity,
  };
}
