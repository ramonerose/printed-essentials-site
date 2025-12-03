'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GARMENT_COSTS,
  DTF_PRICING,
  CUSTOMER_QUANTITY_BANDS,
  type QuantityBand,
} from '../lib/pricingConfig';
import { calculateQuote } from '../lib/pricingCalculator';
import { SCREEN_PRINT_GARMENT_COSTS, MINIMUM_QUANTITY, MAX_COLORS_UNDER_72 } from '../lib/screenPrintConfig';
import { calculateScreenPrintQuote } from '../lib/screenPrintCalculator';

type GarmentCategory = 'tshirts' | 'hoodies' | 'sweatshirts' | 'polos';
type QualityTier = 'good' | 'better' | 'best';
type ScreenPrintGarmentType = 'tshirts' | 'hoodies' | 'sweatshirts';

// Embroidery types
type EmbroideryItem = 'hats' | 'beanies' | 'polos';
type EmbroideryPoloTier = 'good' | 'better' | 'best';

const EMBROIDERY_COSTS = {
  hats: { name: 'Richardson 112', cost: 6.95 },
  beanies: { name: 'SP12', cost: 2.88 },
  polos: {
    good: { name: 'Sport-Tek ST550', cost: 6.72 },
    better: { name: 'Sport-Tek ST650', cost: 11.89 },
    best: { name: 'Nike Dri-FIT Micro Pique 2.0 (NKDC1963)', cost: 22.76 },
  },
};

// DTF Print Location types
type DTFLocation = {
  id: string;
  label: string;
  price: number;
};

const DTF_LOCATIONS: DTFLocation[] = [
  { id: 'leftChest', label: 'Left Chest', price: DTF_PRICING.leftChest },
  { id: 'rightChest', label: 'Right Chest', price: DTF_PRICING.leftChest },
  { id: 'leftSleeveSmall', label: 'Left Sleeve (Small)', price: DTF_PRICING.sleeveSmall },
  { id: 'rightSleeveSmall', label: 'Right Sleeve (Small)', price: DTF_PRICING.sleeveSmall },
  { id: 'leftSleeveLarge', label: 'Left Sleeve Large (Long Sleeve)', price: DTF_PRICING.sleeveLarge },
  { id: 'rightSleeveLarge', label: 'Right Sleeve Large (Long Sleeve)', price: DTF_PRICING.sleeveLarge },
  { id: 'frontMedium', label: 'Front Medium (up to 10x12)', price: DTF_PRICING.mediumPrint },
  { id: 'backMedium', label: 'Back Medium (up to 10x12)', price: DTF_PRICING.mediumPrint },
  { id: 'frontLarge', label: 'Front Large (up to 12x16)', price: DTF_PRICING.largePrint },
  { id: 'backLarge', label: 'Back Large (up to 12x16)', price: DTF_PRICING.largePrint },
];

// Screen Print Location types
type ScreenPrintLocation = 'front' | 'back' | 'leftSleeve' | 'rightSleeve';

const SCREEN_PRINT_LOCATIONS: { id: ScreenPrintLocation; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'back', label: 'Back' },
  { id: 'leftSleeve', label: 'Left Sleeve' },
  { id: 'rightSleeve', label: 'Right Sleeve' },
];

export default function InstantQuote() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'dtf' | 'screenprint' | 'embroidery'>('dtf');

  // DTF state
  const [step, setStep] = useState(1);
  const [garmentCategory, setGarmentCategory] = useState<GarmentCategory | null>(null);
  const [qualityTier, setQualityTier] = useState<QualityTier | null>(null);
  const [selectedDTFLocations, setSelectedDTFLocations] = useState<Set<string>>(new Set());
  const [dtfQuantity, setDtfQuantity] = useState<number>(12);

  // Screen Print state
  const [spGarmentType, setSpGarmentType] = useState<ScreenPrintGarmentType | null>(null);
  const [spQualityTier, setSpQualityTier] = useState<QualityTier | null>(null);
  const [spSelectedLocations, setSpSelectedLocations] = useState<Set<ScreenPrintLocation>>(new Set());
  const [spLocationColors, setSpLocationColors] = useState<Record<ScreenPrintLocation, number>>({
    front: 0,
    back: 0,
    leftSleeve: 0,
    rightSleeve: 0,
  });
  const [spQuantity, setSpQuantity] = useState(36);
  const [spValidationError, setSpValidationError] = useState('');

  // Embroidery state
  const [embItem, setEmbItem] = useState<EmbroideryItem | null>(null);
  const [embPoloTier, setEmbPoloTier] = useState<EmbroideryPoloTier | null>(null);
  const [embQuantity, setEmbQuantity] = useState(12);

  // Calculate total DTF add-ons
  const dtfAddOns = Array.from(selectedDTFLocations).reduce((total, locationId) => {
    const location = DTF_LOCATIONS.find(loc => loc.id === locationId);
    return total + (location?.price || 0);
  }, 0);

  // Helper functions for screen print pricing (must be defined before use)
  const getCostLevel = (cost: number): number => {
    const COST_LEVELS = [
      { min: 0, max: 2.50, level: 1 },
      { min: 2.51, max: 3.50, level: 2 },
      { min: 3.51, max: 5.50, level: 3 },
      { min: 5.51, max: 8.50, level: 4 },
      { min: 8.51, max: 13.50, level: 5 },
      { min: 13.51, max: 15.50, level: 6 },
      { min: 15.51, max: 18.50, level: 7 },
      { min: 18.51, max: Infinity, level: 8 },
    ];
    const level = COST_LEVELS.find((level) => cost >= level.min && cost <= level.max);
    return level?.level || 1;
  };

  const getQuantityBandIndex = (quantity: number): number => {
    const QUANTITY_BANDS = [
      { min: 0, max: 23, index: 0 },
      { min: 24, max: 47, index: 1 },
      { min: 48, max: 71, index: 2 },
      { min: 72, max: 143, index: 3 },
      { min: 144, max: 287, index: 4 },
      { min: 288, max: 575, index: 5 },
      { min: 576, max: 1007, index: 6 },
      { min: 1008, max: Infinity, index: 7 },
    ];
    const band = QUANTITY_BANDS.find((band) => quantity >= band.min && quantity <= band.max);
    return band?.index || 0;
  };

  const getMarkupPercentage = (level: number, bandIndex: number): number => {
    const MARKUP_PERCENTAGES: Record<number, number[]> = {
      1: [425, 375, 325, 275, 250, 225, 200, 188],
      2: [335, 285, 240, 210, 190, 175, 163, 150],
      3: [260, 220, 193, 173, 160, 148, 138, 128],
      4: [210, 175, 155, 140, 130, 120, 113, 105],
      5: [160, 135, 120, 108, 100, 93, 88, 83],
      6: [130, 110, 98, 88, 83, 78, 73, 68],
      7: [110, 93, 83, 75, 70, 65, 61, 58],
      8: [90, 76, 68, 61, 58, 54, 51, 48],
    };
    const markupArray = MARKUP_PERCENTAGES[level];
    return markupArray[bandIndex];
  };

  const getContractPrintCost = (quantity: number, colors: number): number => {
    const CONTRACT_PRINT_COSTS: Record<string, Record<number, number>> = {
      '36-71': { 1: 1.37, 2: 1.56, 3: 1.72, 4: 1.88, 5: 2.03, 6: 2.18 },
      '72-143': { 1: 1.13, 2: 1.34, 3: 1.54, 4: 1.60, 5: 1.71, 6: 1.81 },
      '144-239': { 1: 1.05, 2: 1.31, 3: 1.42, 4: 1.58, 5: 1.65, 6: 1.70 },
      '240-359': { 1: 0.99, 2: 1.15, 3: 1.36, 4: 1.42, 5: 1.52, 6: 1.63 },
      '360-499': { 1: 0.94, 2: 1.10, 3: 1.16, 4: 1.26, 5: 1.36, 6: 1.47 },
    };

    let band: string;
    if (quantity >= 36 && quantity <= 71) band = '36-71';
    else if (quantity >= 72 && quantity <= 143) band = '72-143';
    else if (quantity >= 144 && quantity <= 239) band = '144-239';
    else if (quantity >= 240 && quantity <= 359) band = '240-359';
    else band = '360-499';

    const costs = CONTRACT_PRINT_COSTS[band];
    return costs[colors] || 0;
  };

  // Embroidery contract cost helper
  const getEmbroideryContractCostPerPiece = (quantity: number): number => {
    const EMBROIDERY_CONTRACT_COSTS: Record<string, number> = {
      '1-11': 7.00,
      '12-23': 6.00,
      '24-47': 5.00,
      '48-95': 4.00,
      '96-143': 3.50,
      '144-287': 3.00,
      '288-575': 2.50,
      '576-1007': 2.25,
      '1008+': 2.00,
    };

    let band: string;
    if (quantity >= 1 && quantity <= 11) band = '1-11';
    else if (quantity >= 12 && quantity <= 23) band = '12-23';
    else if (quantity >= 24 && quantity <= 47) band = '24-47';
    else if (quantity >= 48 && quantity <= 95) band = '48-95';
    else if (quantity >= 96 && quantity <= 143) band = '96-143';
    else if (quantity >= 144 && quantity <= 287) band = '144-287';
    else if (quantity >= 288 && quantity <= 575) band = '288-575';
    else if (quantity >= 576 && quantity <= 1007) band = '576-1007';
    else band = '1008+';

    return EMBROIDERY_CONTRACT_COSTS[band];
  };

  // Calculate DTF quote
  const dtfQuote = garmentCategory && qualityTier && selectedDTFLocations.size > 0 && dtfQuantity >= 12
    ? calculateQuote(
        GARMENT_COSTS[garmentCategory][qualityTier].cost,
        dtfQuantity,
        dtfAddOns
      )
    : null;

  // Calculate Screen Print quote with multiple locations
  const calculateMultiLocationScreenPrint = () => {
    if (!spGarmentType || !spQualityTier || spSelectedLocations.size === 0 || spQuantity < MINIMUM_QUANTITY) {
      return null;
    }

    const garmentCost = SCREEN_PRINT_GARMENT_COSTS[spGarmentType][spQualityTier as keyof typeof SCREEN_PRINT_GARMENT_COSTS[typeof spGarmentType]].cost;

    // Calculate garment retail price (same for all)
    const level = getCostLevel(garmentCost);
    const bandIndex = getQuantityBandIndex(spQuantity);
    const markupPercent = getMarkupPercentage(level, bandIndex);
    const garmentRetailPerPiece = garmentCost * (1 + markupPercent / 100);

    // Calculate print costs for each location
    let totalPrintCost = 0;
    let totalColors = 0;
    let numberOfLocations = 0;

    Array.from(spSelectedLocations).forEach(location => {
      const colors = spLocationColors[location];
      if (colors > 0) {
        numberOfLocations++;
        totalColors += colors;
        totalPrintCost += getContractPrintCost(spQuantity, colors);
      }
    });

    if (totalColors === 0) return null;

    // Setup cost per shirt
    const totalSetupCost = totalColors * 18; // $18 per color
    const setupPerShirt = totalSetupCost / spQuantity;

    // Poly base upcharge (for hoodies and sweatshirts only)
    const polyUpcharge = (spGarmentType === 'hoodies' || spGarmentType === 'sweatshirts')
      ? 0.35 * numberOfLocations
      : 0;

    // True print cost per shirt
    const truePrintCostPerShirt = totalPrintCost + setupPerShirt + polyUpcharge;

    // Retail print price (2x markup)
    const retailPrintPerShirt = truePrintCostPerShirt * 2.0;

    // Total per piece
    const perPiece = garmentRetailPerPiece + retailPrintPerShirt;

    // Round to nearest $0.25
    const perPieceRounded = Math.round(perPiece * 4) / 4;

    // Total estimate
    const totalEstimate = Math.round(perPieceRounded * spQuantity);

    return {
      perPiece: perPieceRounded,
      total: totalEstimate,
      garmentRetail: garmentRetailPerPiece,
      printCost: retailPrintPerShirt,
      setupCost: totalSetupCost,
      quantity: spQuantity,
    };
  };

  const screenPrintQuote = calculateMultiLocationScreenPrint();

  // Calculate Embroidery quote
  const calculateEmbroideryQuote = () => {
    if (!embItem || embQuantity < 12) return null;
    if (embItem === 'polos' && !embPoloTier) return null;

    // Get garment cost
    let garmentCost: number;
    if (embItem === 'polos' && embPoloTier) {
      garmentCost = EMBROIDERY_COSTS.polos[embPoloTier].cost;
    } else if (embItem === 'hats') {
      garmentCost = EMBROIDERY_COSTS.hats.cost;
    } else if (embItem === 'beanies') {
      garmentCost = EMBROIDERY_COSTS.beanies.cost;
    } else {
      return null;
    }

    // Get garment retail price using existing helpers
    const level = getCostLevel(garmentCost);
    const bandIndex = getQuantityBandIndex(embQuantity);
    const markupPercent = getMarkupPercentage(level, bandIndex);
    const garmentRetailPerPiece = garmentCost * (1 + markupPercent / 100);

    // Get embroidery contract cost and apply 2.0x markup
    const embContractCost = getEmbroideryContractCostPerPiece(embQuantity);
    const embRetailPerPiece = embContractCost * 2.0;

    // Total per piece
    const perPiece = garmentRetailPerPiece + embRetailPerPiece;

    // Round to nearest $0.25
    const perPieceRounded = Math.round(perPiece * 4) / 4;

    // Total estimate
    const totalEstimate = Math.round(perPieceRounded * embQuantity);

    return {
      perPiece: perPieceRounded,
      total: totalEstimate,
      quantity: embQuantity,
    };
  };

  const embroideryQuote = calculateEmbroideryQuote();

  const resetDTF = () => {
    setStep(1);
    setGarmentCategory(null);
    setQualityTier(null);
    setSelectedDTFLocations(new Set());
    setDtfQuantity(12);
  };

  const resetScreenPrint = () => {
    setSpGarmentType(null);
    setSpQualityTier(null);
    setSpSelectedLocations(new Set());
    setSpLocationColors({ front: 0, back: 0, leftSleeve: 0, rightSleeve: 0 });
    setSpQuantity(36);
    setSpValidationError('');
  };

  const resetEmbroidery = () => {
    setEmbItem(null);
    setEmbPoloTier(null);
    setEmbQuantity(12);
  };

  // Toggle DTF location selection
  const toggleDTFLocation = (locationId: string) => {
    const newSet = new Set(selectedDTFLocations);
    if (newSet.has(locationId)) {
      newSet.delete(locationId);
    } else {
      newSet.add(locationId);
    }
    setSelectedDTFLocations(newSet);
  };

  // Toggle Screen Print location selection
  const toggleScreenPrintLocation = (location: ScreenPrintLocation) => {
    const newSet = new Set(spSelectedLocations);
    if (newSet.has(location)) {
      newSet.delete(location);
      // Reset colors for this location
      setSpLocationColors(prev => ({ ...prev, [location]: 0 }));
    } else {
      newSet.add(location);
    }
    setSpSelectedLocations(newSet);
    setSpValidationError('');
  };

  // Update colors for a specific screen print location
  const updateLocationColors = (location: ScreenPrintLocation, colors: number) => {
    // Validate
    if (colors > 6) return;
    if (spQuantity < 72 && colors > MAX_COLORS_UNDER_72) {
      setSpValidationError('5–6 color screen prints require a minimum of 72 pieces per design.');
      return;
    }
    setSpValidationError('');
    setSpLocationColors(prev => ({ ...prev, [location]: colors }));
  };

  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-black">
            Instant Quote Tool
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Looking for a quick ballpark quote? You're in the right place. Pick the print method you want and follow the prompts. It won't be exact, but it'll give you a solid idea of what to expect. If you need help deciding which method to choose, just reach out.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('dtf')}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-all ${
                activeTab === 'dtf'
                  ? 'border-b-4 border-[#00a3ad] text-[#00a3ad]'
                  : 'text-gray-600 hover:text-[#00a3ad]'
              }`}
            >
              DTF (Under 36 or Full Color Designs)
            </button>
            <button
              onClick={() => setActiveTab('screenprint')}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-all ${
                activeTab === 'screenprint'
                  ? 'border-b-4 border-[#00a3ad] text-[#00a3ad]'
                  : 'text-gray-600 hover:text-[#00a3ad]'
              }`}
            >
              Screen Printing (36+ Pieces)
            </button>
            <button
              onClick={() => setActiveTab('embroidery')}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-all ${
                activeTab === 'embroidery'
                  ? 'border-b-4 border-[#00a3ad] text-[#00a3ad]'
                  : 'text-gray-600 hover:text-[#00a3ad]'
              }`}
            >
              Embroidery
            </button>
          </div>
        </div>

        {/* DTF Tab Content */}
        {activeTab === 'dtf' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
                DTF Printing (Under 36 or Full Color Designs)
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                DTF is perfect for small runs, full color artwork, gradients, and detailed designs. It delivers vibrant results with no color limits. Use this tool for a quick ballpark estimate.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s
                          ? 'bg-[#00a3ad] text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`w-8 h-1 ${
                          step > s ? 'bg-[#00a3ad]' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Garment Type */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-black mb-4">
                Step 1: Choose Garment Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(GARMENT_COSTS).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setGarmentCategory(category as GarmentCategory);
                      setStep(Math.max(step, 2));
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      garmentCategory === category
                        ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                        : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                    }`}
                  >
                    <div className="font-bold capitalize">{category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quality Tier */}
            {garmentCategory && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 2: Choose Quality Tier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(GARMENT_COSTS[garmentCategory]).map(([tier, info]) => (
                    <button
                      key={tier}
                      onClick={() => {
                        setQualityTier(tier as QualityTier);
                        setStep(Math.max(step, 3));
                      }}
                      className={`p-6 border-2 rounded-lg transition-all ${
                        qualityTier === tier
                          ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                          : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                      }`}
                    >
                      <div className="font-bold uppercase mb-2">{tier}</div>
                      <div className="text-sm opacity-90">{info.name} (or similar)</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Print Locations */}
            {qualityTier && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 3: Choose Print Locations
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select all locations that apply. Each location adds to the total cost.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DTF_LOCATIONS.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => {
                        toggleDTFLocation(location.id);
                        setStep(Math.max(step, 4));
                      }}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedDTFLocations.has(location.id)
                          ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                          : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                      }`}
                    >
                      <span className="font-semibold">{location.label}</span>
                    </button>
                  ))}
                </div>
                {selectedDTFLocations.size > 0 && (
                  <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="text-sm font-semibold text-black">
                      Total DTF Add-ons: ${dtfAddOns.toFixed(2)} per piece
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Quantity */}
            {selectedDTFLocations.size > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 4: Enter Quantity
                </h3>
                <div className="max-w-xs">
                  <label className="block text-sm font-semibold text-black mb-2">
                    Quantity (Minimum 12):
                  </label>
                  <input
                    type="number"
                    min={12}
                    value={dtfQuantity}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value);
                      setDtfQuantity(val === '' ? 12 : val);
                    }}
                    onBlur={(e) => {
                      // Enforce minimum on blur
                      const val = parseInt(e.target.value) || 12;
                      setDtfQuantity(Math.max(12, val));
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a3ad] text-black font-semibold"
                  />
                  {dtfQuantity < 12 && (
                    <p className="mt-2 text-sm text-red-600">
                      Minimum quantity for DTF is 12 pieces.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* DTF Quote Results */}
            {dtfQuote && (
              <div className="mt-12 p-8 bg-gradient-to-r from-[#00a3ad] to-[#008a93] rounded-lg shadow-lg text-white">
                <h3 className="text-2xl font-black mb-6 text-center">Your Ballpark Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Per Piece</p>
                    <p className="text-5xl font-black">${dtfQuote.perPiece.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Total Estimate</p>
                    <p className="text-5xl font-black">${dtfQuote.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Note:</strong> This is a ballpark estimate. Final pricing may vary slightly after artwork review, garment selection, and sizing mix.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-block bg-white text-[#00a3ad] px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-100 transition-all hover:shadow-lg text-center"
                  >
                    Request Official Quote
                  </Link>
                  <button
                    onClick={resetDTF}
                    className="inline-block bg-gray-600 text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-700 transition-all hover:shadow-lg"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Screen Print Tab Content */}
        {activeTab === 'screenprint' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
                Screen Printing (36+ Pieces)
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
                Screen printing is ideal for larger orders and solid color artwork. Minimum 36 pieces. If your design is full color or highly detailed, DTF may be the better fit. Use this tool for a quick ballpark estimate.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Color limits by quantity:</strong> 36 to 71 pieces support up to 4 colors per location. 72+ pieces support up to 6 colors per location.
              </p>
            </div>

            {/* Validation Error */}
            {spValidationError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                {spValidationError}
              </div>
            )}

            {/* Step 1: Garment Type */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-black mb-4">
                Step 1: Choose Garment Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(SCREEN_PRINT_GARMENT_COSTS).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSpGarmentType(type as ScreenPrintGarmentType)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      spGarmentType === type
                        ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                        : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                    }`}
                  >
                    <div className="font-bold capitalize">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quality Tier */}
            {spGarmentType && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 2: Choose Quality Tier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(SCREEN_PRINT_GARMENT_COSTS[spGarmentType]).map(([tier, info]) => (
                    <button
                      key={tier}
                      onClick={() => setSpQualityTier(tier as QualityTier)}
                      className={`p-6 border-2 rounded-lg transition-all ${
                        spQualityTier === tier
                          ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                          : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                      }`}
                    >
                      <div className="font-bold uppercase mb-2">{tier}</div>
                      <div className="text-sm opacity-90">{info.name} (or similar)</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Print Locations and Colors */}
            {spQualityTier && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 3: Choose Print Locations and Colors
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select all locations that apply, then choose the number of colors for each location.
                </p>

                <div className="space-y-4">
                  {SCREEN_PRINT_LOCATIONS.map((location) => (
                    <div key={location.id} className="border-2 border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => toggleScreenPrintLocation(location.id)}
                          className={`flex-1 p-3 border-2 rounded-lg transition-all font-semibold ${
                            spSelectedLocations.has(location.id)
                              ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                              : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                          }`}
                        >
                          {location.label}
                        </button>
                      </div>

                      {/* Color selector for this location */}
                      {spSelectedLocations.has(location.id) && (
                        <div>
                          <label className="block text-sm font-semibold text-black mb-2">
                            Colors for {location.label}:
                          </label>
                          <div className="flex gap-2 flex-wrap">
                            {[1, 2, 3, 4, 5, 6].map((colorCount) => {
                              const isDisabled = spQuantity < 72 && colorCount > MAX_COLORS_UNDER_72;
                              return (
                                <button
                                  key={colorCount}
                                  onClick={() => !isDisabled && updateLocationColors(location.id, colorCount)}
                                  disabled={isDisabled}
                                  className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                                    spLocationColors[location.id] === colorCount
                                      ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                                      : isDisabled
                                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : 'border-gray-300 hover:border-[#00a3ad] text-black'
                                  }`}
                                >
                                  {colorCount}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Quantity */}
            {spSelectedLocations.size > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 4: Enter Quantity
                </h3>
                <div className="max-w-xs">
                  <label className="block text-sm font-semibold text-black mb-2">
                    Quantity (Minimum 36):
                  </label>
                  <input
                    type="number"
                    min={MINIMUM_QUANTITY}
                    value={spQuantity}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value);
                      const newVal = val === '' ? 36 : val;
                      setSpQuantity(newVal);
                      // Reset 5-6 color selections if going under 72
                      if (newVal < 72) {
                        const newColors = { ...spLocationColors };
                        Object.keys(newColors).forEach((key) => {
                          const location = key as ScreenPrintLocation;
                          if (newColors[location] > 4) {
                            newColors[location] = 0;
                          }
                        });
                        setSpLocationColors(newColors);
                      }
                    }}
                    onBlur={(e) => {
                      // Enforce minimum on blur
                      const val = parseInt(e.target.value) || MINIMUM_QUANTITY;
                      setSpQuantity(Math.max(MINIMUM_QUANTITY, val));
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a3ad] text-black font-semibold"
                  />
                  {spQuantity < 36 && (
                    <p className="mt-2 text-sm text-red-600">
                      Minimum quantity for Screen Printing is 36 pieces.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Screen Print Quote Results */}
            {screenPrintQuote && Array.from(spSelectedLocations).some(loc => spLocationColors[loc] > 0) && (
              <div className="mt-12 p-8 bg-gradient-to-r from-[#00a3ad] to-[#008a93] rounded-lg shadow-lg text-white">
                <h3 className="text-2xl font-black mb-6 text-center">Your Ballpark Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Per Piece</p>
                    <p className="text-5xl font-black">${screenPrintQuote.perPiece.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Total Estimate</p>
                    <p className="text-5xl font-black">${screenPrintQuote.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Note:</strong> This is a ballpark estimate. Final pricing may vary slightly after artwork review, garment selection, and sizing mix.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-block bg-white text-[#00a3ad] px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-100 transition-all hover:shadow-lg text-center"
                  >
                    Request Official Quote
                  </Link>
                  <button
                    onClick={resetScreenPrint}
                    className="inline-block bg-gray-600 text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-700 transition-all hover:shadow-lg"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Embroidery Tab Content */}
        {activeTab === 'embroidery' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
                Embroidery
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Embroidery delivers a professional, durable finish that elevates your brand. Perfect for hats, beanies, and polos. Use this tool for a quick ballpark estimate.
              </p>
            </div>

            {/* Step 1: Choose Item */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-black mb-4">
                Step 1: Choose Item Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setEmbItem('hats');
                    setEmbPoloTier(null); // Reset polo tier when changing item
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    embItem === 'hats'
                      ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                      : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                  }`}
                >
                  <div className="font-bold">Hats</div>
                  <div className="text-sm opacity-90 mt-1">{EMBROIDERY_COSTS.hats.name}</div>
                </button>
                <button
                  onClick={() => {
                    setEmbItem('beanies');
                    setEmbPoloTier(null); // Reset polo tier when changing item
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    embItem === 'beanies'
                      ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                      : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                  }`}
                >
                  <div className="font-bold">Beanies</div>
                  <div className="text-sm opacity-90 mt-1">{EMBROIDERY_COSTS.beanies.name}</div>
                </button>
                <button
                  onClick={() => {
                    setEmbItem('polos');
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    embItem === 'polos'
                      ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                      : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                  }`}
                >
                  <div className="font-bold">Polos</div>
                  <div className="text-sm opacity-90 mt-1">Choose tier below</div>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Quality Tier (Polos Only) */}
            {embItem === 'polos' && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  Step 2: Choose Quality Tier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(EMBROIDERY_COSTS.polos).map(([tier, info]) => (
                    <button
                      key={tier}
                      onClick={() => setEmbPoloTier(tier as EmbroideryPoloTier)}
                      className={`p-6 border-2 rounded-lg transition-all ${
                        embPoloTier === tier
                          ? 'border-[#00a3ad] bg-[#00a3ad] text-white'
                          : 'border-gray-300 hover:border-[#00a3ad] hover:bg-gray-50 text-black'
                      }`}
                    >
                      <div className="font-bold uppercase mb-2">{tier}</div>
                      <div className="text-sm opacity-90">{info.name} (or similar)</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Enter Quantity */}
            {((embItem === 'hats' || embItem === 'beanies') || (embItem === 'polos' && embPoloTier)) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">
                  {embItem === 'polos' ? 'Step 3: Enter Quantity' : 'Step 2: Enter Quantity'}
                </h3>
                <div className="max-w-xs">
                  <label className="block text-sm font-semibold text-black mb-2">
                    Quantity (Minimum 12):
                  </label>
                  <input
                    type="number"
                    min={12}
                    value={embQuantity}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value);
                      setEmbQuantity(val === '' ? 12 : val);
                    }}
                    onBlur={(e) => {
                      // Enforce minimum on blur
                      const val = parseInt(e.target.value) || 12;
                      setEmbQuantity(Math.max(12, val));
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a3ad] text-black font-semibold"
                  />
                  {embQuantity < 12 && (
                    <p className="mt-2 text-sm text-red-600">
                      Minimum quantity for Embroidery is 12 pieces.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Embroidery Quote Results */}
            {embroideryQuote && (
              <div className="mt-12 p-8 bg-gradient-to-r from-[#00a3ad] to-[#008a93] rounded-lg shadow-lg text-white">
                <h3 className="text-2xl font-black mb-6 text-center">Your Ballpark Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Per Piece</p>
                    <p className="text-5xl font-black">${embroideryQuote.perPiece.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Total Estimate</p>
                    <p className="text-5xl font-black">${embroideryQuote.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Note:</strong> This is a ballpark estimate based on a standard left chest logo (up to 6,000 stitches). Final pricing may vary after artwork review, logo complexity, stitch count, and additional embroidery locations.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-block bg-white text-[#00a3ad] px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-100 transition-all hover:shadow-lg text-center"
                  >
                    Request Official Quote
                  </Link>
                  <button
                    onClick={resetEmbroidery}
                    className="inline-block bg-gray-600 text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-gray-700 transition-all hover:shadow-lg"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
