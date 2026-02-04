// Updated data model: Customer Journey Flow
// ACQUISITION → CONVERSION → RETENTION → OPERATIONS → FINANCIALS

export interface YearlyProjection {
  year: number;
  clinicCount: number;
  benefits: number;
  recurringExpenses: number;
  netBenefit: number;
  cumulativeBenefit: number;
}

export interface BusinessCaseData {
  // ============================================
  // SECTION 0: GLOBAL PARAMETERS
  // Network-wide constants with optional change %
  // ============================================
  clinicCount: number;
  clinicCountChange: number;                // % growth expected
  monthlyLeadsPerClinic: number;
  monthlyLeadsChange: number;               // % change expected
  averageClinicRevenueChange: number;       // % growth expected
  wellnessPlanPriceChange: number;          // % price change
  introPriceChange: number;                 // % price change
  patientLTVChange: number;                 // % change in LTV
  hourlyWageChange: number;                 // % wage inflation
  royaltyChange: number;                    // % change

  // ============================================
  // SECTION 1: LEAD IDENTIFICATION
  // Convert target market → known qualified lead
  // ============================================
  
  // Baseline + Change pattern
  leadQualificationRate: number;            // BASELINE: Current % of leads that are qualified
  leadQualificationImprovement: number;     // CHANGE: % point improvement in lead quality
  
  costPerLead: number;                      // BASELINE: Current cost to acquire a lead ($)
  costPerLeadReductionPercent: number;      // CHANGE: Expected % reduction in cost per lead
  
  // Legacy fields (backward compat)
  unconvertedLeadsPerMonth: number;
  marketingCostPerLead: number;
  marketingCostReductionPercent: number;

  // ============================================
  // SECTION 2: LEAD → PATIENT CONVERSION
  // Qualified lead → first visit (highest leverage stage)
  // ============================================
  // Baseline + Change pattern for each metric
  leadToAppointmentRate: number;            // BASELINE: Current % of qualified leads that book
  appointmentRateImprovement: number;       // CHANGE: % point improvement in booking rate
  
  appointmentShowRate: number;              // BASELINE: Current % of booked that show up  
  showRateImprovement: number;              // CHANGE: % point improvement in show rate
  
  newPatientIntroPrice: number;             // Intro offer price ($29)
  firstVisitValue: number;                  // Value of first full visit after intro
  
  // Legacy
  currentConversionRate: number;
  conversionRateImprovement: number;        // Legacy - maps to appointmentRateImprovement

  // ============================================
  // SECTION 3: PATIENT RETENTION
  // First visit → recurring patient / long-term value
  // ============================================
  // Baseline + Change pattern
  planConversionRate: number;               // BASELINE: Current % who convert to plan
  planConversionImprovement: number;        // CHANGE: % point improvement in plan conversion
  
  currentRetentionRate: number;             // BASELINE: Current patient retention %
  retentionImprovementPercent: number;      // CHANGE: Expected % point improvement
  
  month3ChurnRate: number;                  // BASELINE: Churn at minimum commitment (Month 3)
  churnReductionPercent: number;            // CHANGE: % reduction in Month 3 churn
  
  wellnessPlanPrice: number;                // Monthly wellness plan ($89)
  averagePatientLTVMonths: number;          // Average patient lifetime in months
  valuePerRetentionPoint: number;           // Revenue per % point per clinic

  // ============================================
  // SECTION 4: CLINIC OPERATIONS
  // ============================================
  // Time efficiency
  currentSystemTimeMinutes: number;      // Current daily time staff spends on systems
  timeReductionPercent: number;          // Expected % reduction in system time
  averageVisitsPerDay: number;
  averageHourlyWage: number;
  averageStaffPerClinic: number;
  
  // Error reduction  
  currentRevenueLeakagePercent: number;  // Current % of revenue lost to errors
  revenueLeakageReductionPercent: number; // Expected % recovery of lost revenue
  averageClinicRevenue: number;
  
  // IT costs
  currentAnnualITCosts: number;          // Current annual IT spend
  itCostReductionPercent: number;        // Expected % reduction
  downtimeReductionPercent: number;
  
  // Legacy field mappings (backward compatibility)
  refreshMinutesSavedPerDay: number;     // Maps to: currentSystemTimeMinutes * timeReductionPercent
  workaroundMinutesSavedPerDay: number;
  extraStepsSavedPerVisit: number;
  leadConversionRateImprovement: number; // Maps to: conversionRateImprovement

  // ============================================
  // SECTION 5: FINANCIAL STRUCTURE
  // ============================================
  implementationCost: number;            // Total (for backwards compat)
  implementationCapEx: number;
  implementationOpEx: number;
  recurringAnnualOpEx: number;
  annualInflationRate: number;
  
  // 5-Year Projection
  projectionYears: number;
  yearlyClinicCounts: number[];
  clinicGrowthRate: number;
  
  // Corporate P&L
  corporateRoyaltyPercent: number;
  corporateNMFPercent: number;
  corporateITCostAllocation: number;
  rdCostOfRevenuePercent: number;
  merchantFeesPercent: number;
  
  // Expansion
  baselineAnnualNewClinics: number;
  incrementalAnnualNewClinics: number;
  initialFranchiseFee: number;
  yearsToModel: number;
}

export const defaultBusinessCaseData: BusinessCaseData = {
  // SECTION 0: GLOBAL PARAMETERS
  clinicCount: 880,
  clinicCountChange: 0,
  monthlyLeadsPerClinic: 150,
  monthlyLeadsChange: 0,
  averageClinicRevenueChange: 0,
  wellnessPlanPriceChange: 0,
  introPriceChange: 0,
  patientLTVChange: 0,
  hourlyWageChange: 0,
  royaltyChange: 0,

  // SECTION 1: LEAD IDENTIFICATION
  
  // Baseline + Change (all defaults to 0)
  leadQualificationRate: 70,              // BASELINE: 70% of leads are qualified
  leadQualificationImprovement: 0,        // CHANGE: default 0
  
  costPerLead: 15,                        // BASELINE
  costPerLeadReductionPercent: 0,         // CHANGE: default 0
  
  // Legacy backward compat
  unconvertedLeadsPerMonth: 60,
  marketingCostPerLead: 15,
  marketingCostReductionPercent: 0,

  // SECTION 2: LEAD → PATIENT CONVERSION
  // Baseline + Change (all defaults to 0)
  leadToAppointmentRate: 60,              // BASELINE: 60% book
  appointmentRateImprovement: 0,          // CHANGE: default 0
  
  appointmentShowRate: 85,                // BASELINE: 85% show up
  showRateImprovement: 0,                 // CHANGE: default 0
  
  newPatientIntroPrice: 29,
  firstVisitValue: 79,
  
  // Legacy
  currentConversionRate: 60,
  conversionRateImprovement: 0,

  // SECTION 3: PATIENT RETENTION
  // Baseline + Change (all defaults to 0)
  planConversionRate: 65,                 // BASELINE: 65% convert to plan
  planConversionImprovement: 0,           // CHANGE: default 0
  
  currentRetentionRate: 64,               // BASELINE
  retentionImprovementPercent: 0,         // CHANGE: default 0
  
  month3ChurnRate: 15,                    // BASELINE: 15% churn at Month 3
  churnReductionPercent: 0,               // CHANGE: default 0
  
  wellnessPlanPrice: 89,
  averagePatientLTVMonths: 12,
  valuePerRetentionPoint: 10000,

  // SECTION 4: CLINIC OPERATIONS
  currentSystemTimeMinutes: 60,
  timeReductionPercent: 0,                 // DEFAULT: 0
  averageVisitsPerDay: 40,
  averageHourlyWage: 18,
  averageStaffPerClinic: 2,
  
  currentRevenueLeakagePercent: 1.5,
  revenueLeakageReductionPercent: 0,       // DEFAULT: 0
  averageClinicRevenue: 1000000,
  
  currentAnnualITCosts: 5000000,
  itCostReductionPercent: 0,               // DEFAULT: 0
  downtimeReductionPercent: 0,             // DEFAULT: 0

  // SECTION 5: FINANCIAL STRUCTURE
  implementationCost: 325000,
  implementationCapEx: 225000,
  implementationOpEx: 100000,
  recurringAnnualOpEx: 50000,
  annualInflationRate: 3.0,
  
  projectionYears: 5,
  yearlyClinicCounts: [970, 1020, 1070, 1120, 1170],
  clinicGrowthRate: 5.0,
  
  corporateRoyaltyPercent: 7.0,
  corporateNMFPercent: 2.0,
  corporateITCostAllocation: 100,
  rdCostOfRevenuePercent: 25.0,
  merchantFeesPercent: 0.3,
  
  baselineAnnualNewClinics: 50,
  incrementalAnnualNewClinics: 10,
  initialFranchiseFee: 30000,
  yearsToModel: 5,
  
  // Legacy backward compatibility (computed from new fields)
  refreshMinutesSavedPerDay: 45,           // 60 * 0.75 = 45
  workaroundMinutesSavedPerDay: 15,        // included in time reduction
  extraStepsSavedPerVisit: 1,
  leadConversionRateImprovement: 10        // same as conversionRateImprovement
};

// Section-specific benefit calculations for real-time display
export interface SectionBenefits {
  acquisitionBenefit: number;
  conversionBenefit: number;
  retentionBenefit: number;
  operationsBenefit: number;
  totalBenefit: number;
}

export interface BenefitCalculation {
  // Aggregate totals
  totalAnnualBenefits: number;
  corporateAnnualBenefits: number;
  franchiseAnnualBenefits: number;
  
  // Section-specific (for real-time display)
  sectionBenefits: SectionBenefits;
  
  // ROI metrics
  paybackPeriodMonths: number;
  corporatePaybackPeriodMonths: number;
  firstYearROI: number;
  corporateFirstYearROI: number;
  fiveYearROI: number;
  corporateFiveYearROI: number;
  
  // Detailed breakdowns
  timeSavingsValue: number;
  corporateTimeSavingsValue: number;
  franchiseTimeSavingsValue: number;
  revenueLeakageRecovery: number;
  corporateRevenueLeakageRecovery: number;
  franchiseRevenueLeakageRecovery: number;
  retentionImprovementValue: number;
  corporateRetentionImprovementValue: number;
  franchiseRetentionImprovementValue: number;
  itCostReduction: number;
  corporateRoyaltyRevenue: number;
  
  // 5-year
  fiveYearCumulativeBenefits: number;
  corporateFiveYearCumulativeBenefits: number;
  
  // Legacy category mapping
  timeSavings: number;
  errorReduction: number;
  patientRetention: number;
  microservicesBenefits: number;
  
  // Corporate P&L
  implementationCost: number;
  corporateRoyaltyPercent: number;
  grossRoyaltyRevenue: number;
  rdCostOfRevenue: number;
  netRoyaltyRevenue: number;
  merchantFeesRevenue: number;
  nmfFees: number;
  
  // Per-clinic
  perClinicAnnualBenefit: number;
  perClinicCorporateBenefit: number;
  
  // 5-year projections
  fiveYearProjections: YearlyProjection[];
  fiveYearNetBenefit: number;
  
  // Expansion
  totalIncrementalInitialFees: number;
  totalIncrementalRoyalties: number;
  totalIncrementalNewClinics: number;
  totalCorporateBenefitIncludingExpansion: number;
  
  // Lead Conversion
  leadConversionValue: number;
  corporateLeadConversionValue: number;
  franchiseLeadConversionValue: number;
  annualConvertedLeads: number;
  newPatientsFromLeads: number;
  
  // Marketing savings
  marketingSavingsValue: number;
}

export interface TimeSavingsCalculation {
  refreshTimeSaved: number;
  workaroundTimeSaved: number;
  extraStepsTimeSaved: number;
  totalTimeSavedPerClinicPerDay: number;
  organizationWideSavings: number;
}

export function calculateTotalBenefits(data: BusinessCaseData): BenefitCalculation {
  // ============================================
  // APPLY GLOBAL PARAMETER CHANGES (FORECAST VALUES)
  // ============================================
  const forecastClinicCount = Math.round(data.clinicCount * (1 + data.clinicCountChange / 100));
  const forecastMonthlyLeads = Math.round(data.monthlyLeadsPerClinic * (1 + data.monthlyLeadsChange / 100));
  const forecastClinicRevenue = data.averageClinicRevenue * (1 + data.averageClinicRevenueChange / 100);
  const forecastPlanPrice = data.wellnessPlanPrice * (1 + data.wellnessPlanPriceChange / 100);
  const forecastIntroPrice = data.newPatientIntroPrice * (1 + data.introPriceChange / 100);
  const forecastLTVMonths = data.averagePatientLTVMonths * (1 + data.patientLTVChange / 100);
  const forecastHourlyWage = data.averageHourlyWage * (1 + data.hourlyWageChange / 100);
  // Note: royaltyChange is not applied to forecast as it's a percentage
  
  // ============================================
  // SECTION 1: LEAD IDENTIFICATION BENEFIT
  // Baseline: costPerLead × leads | Change: costPerLeadReductionPercent
  // ============================================
  const annualLeadsPerClinic = forecastMonthlyLeads * 12;
  const totalAnnualLeads = annualLeadsPerClinic * forecastClinicCount;
  
  // Cost per lead savings
  const currentMarketingCost = totalAnnualLeads * data.costPerLead;
  const marketingSavingsValue = currentMarketingCost * (data.costPerLeadReductionPercent / 100);
  
  // Lead quality improvement (more qualified leads from same volume)
  const currentQualifiedLeads = totalAnnualLeads * (data.leadQualificationRate / 100);
  // Note: improvedQualifiedLeads and additionalQualifiedLeads could be used for future enhancements
  // const improvedQualifiedLeads = totalAnnualLeads * ((data.leadQualificationRate + data.leadQualificationImprovement) / 100);
  // const additionalQualifiedLeads = improvedQualifiedLeads - currentQualifiedLeads;
  
  // ============================================
  // SECTION 2: CONVERSION BENEFIT
  // Uses proper baseline + change for booking and show rates
  // ============================================
  // Current conversion funnel
  const baselineEffectiveConversion = (data.leadToAppointmentRate / 100) * (data.appointmentShowRate / 100);
  
  // Improved conversion funnel
  const improvedBookingRate = data.leadToAppointmentRate + data.appointmentRateImprovement;
  const improvedShowRate = data.appointmentShowRate + data.showRateImprovement;
  const improvedEffectiveConversion = (improvedBookingRate / 100) * (improvedShowRate / 100);
  
  // Incremental patients from conversion improvements
  const conversionImprovement = improvedEffectiveConversion - baselineEffectiveConversion;
  const additionalPatientsFromConversion = currentQualifiedLeads * conversionImprovement;
  
  // Revenue per new patient (intro + plan value) - using FORECAST values
  const revenuePerConversion = forecastIntroPrice + (forecastPlanPrice * forecastLTVMonths * (data.planConversionRate / 100));
  const leadConversionValue = additionalPatientsFromConversion * revenuePerConversion;
  const annualConvertedLeads = additionalPatientsFromConversion;
  const newPatientsFromLeads = additionalPatientsFromConversion;
  
  // ============================================
  // SECTION 3: RETENTION BENEFIT
  // Baseline: currentRetentionRate | Change: retentionImprovementPercent
  // Baseline: planConversionRate | Change: planConversionImprovement
  // ============================================
  // Plan conversion improvement value - using FORECAST values
  const annualFirstTimePatients = currentQualifiedLeads * baselineEffectiveConversion;
  const additionalPlanConversions = annualFirstTimePatients * (data.planConversionImprovement / 100);
  const planConversionValue = additionalPlanConversions * forecastPlanPrice * forecastLTVMonths;
  
  // Retention improvement value - using FORECAST clinic count
  const retentionImprovementValue = (data.retentionImprovementPercent * data.valuePerRetentionPoint * forecastClinicCount) + planConversionValue;
  
  // Churn reduction value - using FORECAST values
  // Note: churnReductionValue could be added to retention benefits in future enhancements
  // const currentChurnLoss = annualFirstTimePatients * (data.planConversionRate / 100) * (data.month3ChurnRate / 100) * forecastPlanPrice * (forecastLTVMonths - 3);
  // const churnReductionValue = currentChurnLoss * (data.churnReductionPercent / 100);
  
  // ============================================
  // SECTION 4: OPERATIONS BENEFIT - using FORECAST values
  // ============================================
  // Time savings
  const minutesSaved = data.currentSystemTimeMinutes * (data.timeReductionPercent / 100);
  const annualHoursSaved = (minutesSaved * 260) / 60; // 260 working days
  const timeSavingsValue = annualHoursSaved * forecastHourlyWage * forecastClinicCount * data.averageStaffPerClinic;
  
  // Revenue leakage recovery
  const currentLeakage = forecastClinicRevenue * (data.currentRevenueLeakagePercent / 100);
  const revenueLeakageRecovery = currentLeakage * (data.revenueLeakageReductionPercent / 100) * forecastClinicCount;
  
  // IT cost reduction
  const itCostReduction = data.currentAnnualITCosts * (data.itCostReductionPercent / 100);
  
  // ============================================
  // GLOBAL PARAMETER GROWTH BENEFITS
  // Revenue growth from baseline changes captures royalty
  // ============================================
  
  // Clinic count growth benefit (new clinics = new royalty revenue)
  const additionalClinics = forecastClinicCount - data.clinicCount;
  const clinicGrowthRoyaltyBenefit = additionalClinics * data.averageClinicRevenue * (data.corporateRoyaltyPercent / 100);
  
  // Average revenue growth benefit (existing clinics earning more = more royalty)
  const revenueGrowthPerClinic = forecastClinicRevenue - data.averageClinicRevenue;
  const revenueGrowthRoyaltyBenefit = data.clinicCount * revenueGrowthPerClinic * (data.corporateRoyaltyPercent / 100);
  
  // Plan price increase benefit (higher LTV per patient)
  const planPriceIncrease = forecastPlanPrice - data.wellnessPlanPrice;
  const currentPlanPatients = currentQualifiedLeads * baselineEffectiveConversion * (data.planConversionRate / 100);
  const planPriceIncreaseBenefit = currentPlanPatients * planPriceIncrease * forecastLTVMonths * (data.corporateRoyaltyPercent / 100);
  
  // Total global growth benefit
  const globalGrowthBenefit = clinicGrowthRoyaltyBenefit + revenueGrowthRoyaltyBenefit + planPriceIncreaseBenefit;
  
  // ============================================
  // SECTION TOTALS (for real-time display)
  // ============================================
  const acquisitionBenefit = marketingSavingsValue;
  const conversionBenefit = leadConversionValue;
  const retentionBenefit = retentionImprovementValue + globalGrowthBenefit; // Include growth benefits in retention
  const operationsBenefit = timeSavingsValue + revenueLeakageRecovery + itCostReduction;
  
  // ============================================
  // TOTAL BENEFITS
  // ============================================
  const totalAnnualBenefits = acquisitionBenefit + conversionBenefit + retentionBenefit + operationsBenefit;
  
  // ============================================
  // CORPORATE VS FRANCHISE SPLIT
  // ============================================
  const corporateTimeSavingsValue = timeSavingsValue * (data.corporateRoyaltyPercent / 100);
  const franchiseTimeSavingsValue = timeSavingsValue - corporateTimeSavingsValue;
  
  const corporateRevenueLeakageRecovery = revenueLeakageRecovery * (data.corporateRoyaltyPercent / 100);
  const franchiseRevenueLeakageRecovery = revenueLeakageRecovery - corporateRevenueLeakageRecovery;
  
  const corporateRetentionImprovementValue = retentionImprovementValue * (data.corporateRoyaltyPercent / 100);
  const franchiseRetentionImprovementValue = retentionImprovementValue - corporateRetentionImprovementValue;
  
  const corporateLeadConversionValue = leadConversionValue * (data.corporateRoyaltyPercent / 100);
  const franchiseLeadConversionValue = leadConversionValue - corporateLeadConversionValue;
  
  const corporateITCostReduction = itCostReduction * (data.corporateITCostAllocation / 100);
  
  const corporateAnnualBenefits = 
    (acquisitionBenefit * (data.corporateRoyaltyPercent / 100)) +
    corporateLeadConversionValue +
    corporateRetentionImprovementValue +
    corporateTimeSavingsValue +
    corporateRevenueLeakageRecovery +
    corporateITCostReduction +
    globalGrowthBenefit;  // Global param growth benefits (already has 7% royalty baked in)
  
  const franchiseAnnualBenefits = totalAnnualBenefits - corporateAnnualBenefits;
  
  // ============================================
  // ROI CALCULATIONS
  // ============================================
  const paybackPeriodMonths = (data.implementationCost / totalAnnualBenefits) * 12;
  const corporatePaybackPeriodMonths = (data.implementationCost / corporateAnnualBenefits) * 12;
  
  const firstYearROI = ((totalAnnualBenefits - data.implementationCost) / data.implementationCost) * 100;
  const corporateFirstYearROI = ((corporateAnnualBenefits - data.implementationCost) / data.implementationCost) * 100;
  
  const fiveYearROI = ((totalAnnualBenefits * 5 - data.implementationCost) / data.implementationCost) * 100;
  const corporateFiveYearROI = ((corporateAnnualBenefits * 5 - data.implementationCost) / data.implementationCost) * 100;
  
  const fiveYearCumulativeBenefits = totalAnnualBenefits * 5;
  const corporateFiveYearCumulativeBenefits = corporateAnnualBenefits * 5;
  
  // ============================================
  // CORPORATE P&L DETAILS
  // ============================================
  const franchiseRevenueBenefits = revenueLeakageRecovery + retentionImprovementValue + leadConversionValue;
  const grossRoyaltyRevenue = franchiseRevenueBenefits * (data.corporateRoyaltyPercent / 100);
  const rdCostOfRevenue = grossRoyaltyRevenue * (data.rdCostOfRevenuePercent / 100);
  const netRoyaltyRevenue = grossRoyaltyRevenue - rdCostOfRevenue;
  const merchantFeesRevenue = franchiseRevenueBenefits * (data.merchantFeesPercent / 100);
  const nmfFees = franchiseRevenueBenefits * (data.corporateNMFPercent / 100);
  const corporateRoyaltyRevenue = grossRoyaltyRevenue;
  
  // ============================================
  // PER-CLINIC METRICS
  // ============================================
  const perClinicAnnualBenefit = totalAnnualBenefits / data.clinicCount;
  const perClinicCorporateBenefit = corporateAnnualBenefits / data.clinicCount;
  
  // ============================================
  // 5-YEAR PROJECTIONS
  // ============================================
  const fiveYearProjections: YearlyProjection[] = [];
  let cumulativeBenefit = 0;
  
  for (let year = 0; year < data.projectionYears; year++) {
    const clinicCount = data.yearlyClinicCounts[year] || 
      Math.round(data.clinicCount * Math.pow(1 + data.clinicGrowthRate / 100, year));
    
    const recurringExpenses = data.recurringAnnualOpEx * 
      Math.pow(1 + data.annualInflationRate / 100, year);
    
    const benefitScaling = clinicCount / data.clinicCount;
    const yearBenefits = corporateAnnualBenefits * benefitScaling;
    
    const netBenefit = yearBenefits - recurringExpenses;
    cumulativeBenefit += netBenefit;
    
    fiveYearProjections.push({
      year: 2026 + year,
      clinicCount,
      benefits: yearBenefits,
      recurringExpenses,
      netBenefit,
      cumulativeBenefit
    });
  }
  
  const fiveYearGrossBenefit = corporateAnnualBenefits * 5;
  const totalRecurringOpEx = Array.from({ length: 5 }, (_, i) => 
    data.recurringAnnualOpEx * Math.pow(1 + data.annualInflationRate / 100, i)
  ).reduce((sum, opex) => sum + opex, 0);
  const fiveYearNetBenefit = fiveYearGrossBenefit - totalRecurringOpEx;
  
  // ============================================
  // EXPANSION BENEFITS
  // ============================================
  let totalIncrementalInitialFees = 0;
  let totalIncrementalRoyalties = 0;
  let totalIncrementalNewClinics = 0;
  let cumulativeNewClinics = 0;
  
  for (let year = 1; year <= data.yearsToModel; year++) {
    cumulativeNewClinics += data.incrementalAnnualNewClinics;
    totalIncrementalNewClinics += data.incrementalAnnualNewClinics;
    totalIncrementalInitialFees += data.incrementalAnnualNewClinics * data.initialFranchiseFee;
    totalIncrementalRoyalties += cumulativeNewClinics * data.averageClinicRevenue * (data.corporateRoyaltyPercent / 100);
  }
  
  const totalCorporateBenefitIncludingExpansion = corporateAnnualBenefits * data.yearsToModel + totalIncrementalInitialFees + totalIncrementalRoyalties;

  return {
    totalAnnualBenefits,
    corporateAnnualBenefits,
    franchiseAnnualBenefits,
    
    sectionBenefits: {
      acquisitionBenefit,
      conversionBenefit,
      retentionBenefit,
      operationsBenefit,
      totalBenefit: totalAnnualBenefits
    },
    
    paybackPeriodMonths,
    corporatePaybackPeriodMonths,
    firstYearROI,
    corporateFirstYearROI,
    fiveYearROI,
    corporateFiveYearROI,
    
    timeSavingsValue,
    corporateTimeSavingsValue,
    franchiseTimeSavingsValue,
    revenueLeakageRecovery,
    corporateRevenueLeakageRecovery,
    franchiseRevenueLeakageRecovery,
    retentionImprovementValue,
    corporateRetentionImprovementValue,
    franchiseRetentionImprovementValue,
    itCostReduction,
    corporateRoyaltyRevenue,
    
    fiveYearCumulativeBenefits,
    corporateFiveYearCumulativeBenefits,
    
    // Legacy mapping
    timeSavings: timeSavingsValue,
    errorReduction: revenueLeakageRecovery,
    patientRetention: retentionImprovementValue,
    microservicesBenefits: itCostReduction,
    
    implementationCost: data.implementationCost,
    corporateRoyaltyPercent: data.corporateRoyaltyPercent,
    grossRoyaltyRevenue,
    rdCostOfRevenue,
    netRoyaltyRevenue,
    merchantFeesRevenue,
    nmfFees,
    
    perClinicAnnualBenefit,
    perClinicCorporateBenefit,
    
    fiveYearProjections,
    fiveYearNetBenefit,
    
    totalIncrementalInitialFees,
    totalIncrementalRoyalties,
    totalIncrementalNewClinics,
    totalCorporateBenefitIncludingExpansion,
    
    leadConversionValue,
    corporateLeadConversionValue,
    franchiseLeadConversionValue,
    annualConvertedLeads,
    newPatientsFromLeads,
    
    marketingSavingsValue
  };
}

export function calculateTimeSavings(data: BusinessCaseData): TimeSavingsCalculation {
  const minutesSaved = data.currentSystemTimeMinutes * (data.timeReductionPercent / 100);
  const totalTimeSavedPerClinicPerDay = minutesSaved * data.averageStaffPerClinic;
  
  const annualHoursSaved = (totalTimeSavedPerClinicPerDay * 260) / 60;
  const organizationWideSavings = annualHoursSaved * data.averageHourlyWage * data.clinicCount;
  
  return {
    refreshTimeSaved: minutesSaved * 0.75,
    workaroundTimeSaved: minutesSaved * 0.25,
    extraStepsTimeSaved: 0,
    totalTimeSavedPerClinicPerDay,
    organizationWideSavings
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export const formatLargeNumber = (num: number): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
};
