// Updated data model to include corporate vs. franchise benefit allocation
export interface BusinessCaseData {
  // Clinic operations
  clinicCount: number;
  averageVisitsPerDay: number;
  averageHourlyWage: number;
  averageClinicRevenue: number;
  
  // Time savings
  refreshReductionPercent: number;
  workaroundReductionPercent: number;
  extraStepsReductionPercent: number;
  
  // Error reduction & revenue
  revenueLeakageReductionPercent: number;
  retentionImprovementPercent: number;
  
  // Microservices benefits
  itCostReductionPercent: number;
  downtimeReductionPercent: number;
  
  // Implementation
  implementationCost: number;
  
  // Corporate benefit allocation
  corporateRoyaltyPercent: number;
  corporateNMFPercent: number;
  corporateITCostAllocation: number;
  
  // For TimeImpactVisualization component
  averageStaffPerClinic: number;
}

export const defaultBusinessCaseData: BusinessCaseData = {
  // Clinic operations
  clinicCount: 950,
  averageVisitsPerDay: 40,
  averageHourlyWage: 30,
  averageClinicRevenue: 1000000,
  
  // Time savings
  refreshReductionPercent: 75,
  workaroundReductionPercent: 70,
  extraStepsReductionPercent: 65,
  
  // Error reduction & revenue
  revenueLeakageReductionPercent: 55,
  retentionImprovementPercent: 6,
  
  // Microservices benefits
  itCostReductionPercent: 30,
  downtimeReductionPercent: 40,
  
  // Implementation
  implementationCost: 325000,
  
  // Corporate benefit allocation - based on P&L data
  corporateRoyaltyPercent: 7.1,
  corporateNMFPercent: 2.0,
  corporateITCostAllocation: 100, // 100% of IT cost savings go to corporate
  
  // For TimeImpactVisualization component
  averageStaffPerClinic: 2
};

export interface BenefitCalculation {
  totalAnnualBenefits: number;
  corporateAnnualBenefits: number;
  franchiseAnnualBenefits: number;
  paybackPeriodMonths: number;
  corporatePaybackPeriodMonths: number;
  firstYearROI: number;
  corporateFirstYearROI: number;
  fiveYearROI: number;
  corporateFiveYearROI: number;
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
  
  // Additional properties needed by components
  fiveYearCumulativeBenefits: number;
  corporateFiveYearCumulativeBenefits: number;
  
  // Properties for BenefitsBreakdown component
  timeSavings: number;
  errorReduction: number;
  patientRetention: number;
  microservicesBenefits: number;
  
  // Properties for CorporatePnLImpact component
  implementationCost: number;
  corporateRoyaltyPercent: number;
}

export interface TimeSavingsCalculation {
  refreshTimeSaved: number;
  workaroundTimeSaved: number;
  extraStepsTimeSaved: number;
  totalTimeSavedPerClinicPerDay: number;
  organizationWideSavings: number;
}

export function calculateTimeSavings(data: BusinessCaseData): TimeSavingsCalculation {
  // Time savings calculations
  const refreshTimeSaved = 60 * (data.refreshReductionPercent / 100); // minutes per day per staff
  const workaroundTimeSaved = 22.5 * (data.workaroundReductionPercent / 100); // minutes per day per staff
  const extraStepsTimeSaved = data.averageVisitsPerDay * 1.5 * (data.extraStepsReductionPercent / 100); // minutes per day per clinic
  
  const totalTimeSavedPerStaffPerDay = refreshTimeSaved + workaroundTimeSaved + (extraStepsTimeSaved / data.averageStaffPerClinic);
  const totalTimeSavedPerClinicPerDay = totalTimeSavedPerStaffPerDay * data.averageStaffPerClinic;
  
  // Convert to annual financial impact
  const annualHoursSaved = (totalTimeSavedPerClinicPerDay * 260) / 60; // 260 working days, convert to hours
  const organizationWideSavings = annualHoursSaved * data.averageHourlyWage * data.clinicCount;
  
  return {
    refreshTimeSaved,
    workaroundTimeSaved,
    extraStepsTimeSaved,
    totalTimeSavedPerClinicPerDay,
    organizationWideSavings
  };
}

export function calculateTotalBenefits(data: BusinessCaseData): BenefitCalculation {
  // Time savings calculations
  const dailyRefreshTimeSavings = 60 * (data.refreshReductionPercent / 100); // minutes per day
  const dailyWorkaroundTimeSavings = 22.5 * (data.workaroundReductionPercent / 100); // minutes per day
  const dailyExtraStepsTimeSavings = data.averageVisitsPerDay * 1.5 * (data.extraStepsReductionPercent / 100); // minutes per day
  
  const totalDailyTimeSavings = dailyRefreshTimeSavings + dailyWorkaroundTimeSavings + dailyExtraStepsTimeSavings; // minutes per day
  const totalAnnualTimeSavings = totalDailyTimeSavings * 260 / 60; // hours per year (260 working days)
  
  const timeSavingsValue = totalAnnualTimeSavings * data.averageHourlyWage * data.clinicCount * 2; // 2 staff per clinic
  
  // Revenue leakage recovery
  const currentRevenueLeakage = data.averageClinicRevenue * 0.015; // 1.5% of revenue
  const revenueLeakageRecovery = currentRevenueLeakage * (data.revenueLeakageReductionPercent / 100) * data.clinicCount;
  
  // Retention improvement
  const retentionImprovementValue = data.retentionImprovementPercent * 10000 * data.clinicCount; // $10K per percentage point per clinic
  
  // IT cost reduction
  const itCostReduction = 5000000 * (data.itCostReductionPercent / 100); // $5M annual IT costs
  
  // Total benefits
  const totalAnnualBenefits = timeSavingsValue + revenueLeakageRecovery + retentionImprovementValue + itCostReduction;
  
  // Corporate vs. Franchise benefit allocation
  // Corporate gets royalty percentage of franchise revenue increases
  const corporateTimeSavingsValue = timeSavingsValue * (data.corporateRoyaltyPercent / 100);
  const franchiseTimeSavingsValue = timeSavingsValue - corporateTimeSavingsValue;
  
  const corporateRevenueLeakageRecovery = revenueLeakageRecovery * (data.corporateRoyaltyPercent / 100);
  const franchiseRevenueLeakageRecovery = revenueLeakageRecovery - corporateRevenueLeakageRecovery;
  
  const corporateRetentionImprovementValue = retentionImprovementValue * (data.corporateRoyaltyPercent / 100);
  const franchiseRetentionImprovementValue = retentionImprovementValue - corporateRetentionImprovementValue;
  
  // IT cost reduction is 100% corporate benefit
  const corporateITCostReduction = itCostReduction * (data.corporateITCostAllocation / 100);
  
  // Total corporate benefits
  const corporateAnnualBenefits = 
    corporateTimeSavingsValue + 
    corporateRevenueLeakageRecovery + 
    corporateRetentionImprovementValue + 
    corporateITCostReduction;
  
  // Total franchise benefits
  const franchiseAnnualBenefits = 
    franchiseTimeSavingsValue + 
    franchiseRevenueLeakageRecovery + 
    franchiseRetentionImprovementValue;
  
  // ROI calculations
  const paybackPeriodMonths = (data.implementationCost / totalAnnualBenefits) * 12;
  const corporatePaybackPeriodMonths = (data.implementationCost / corporateAnnualBenefits) * 12;
  
  const firstYearROI = ((totalAnnualBenefits - data.implementationCost) / data.implementationCost) * 100;
  const corporateFirstYearROI = ((corporateAnnualBenefits - data.implementationCost) / data.implementationCost) * 100;
  
  const fiveYearROI = ((totalAnnualBenefits * 5 - data.implementationCost) / data.implementationCost) * 100;
  const corporateFiveYearROI = ((corporateAnnualBenefits * 5 - data.implementationCost) / data.implementationCost) * 100;
  
  // Calculate 5-year cumulative benefits
  const fiveYearCumulativeBenefits = totalAnnualBenefits * 5;
  const corporateFiveYearCumulativeBenefits = corporateAnnualBenefits * 5;
  
  // Map benefits to categories for BenefitsBreakdown component
  const timeSavings = timeSavingsValue;
  const errorReduction = revenueLeakageRecovery;
  const patientRetention = retentionImprovementValue;
  const microservicesBenefits = itCostReduction;
  
  // Calculate corporate royalty revenue (sum of all revenue-based benefits * royalty percentage)
  const corporateRoyaltyRevenue = (revenueLeakageRecovery + retentionImprovementValue) * (data.corporateRoyaltyPercent / 100);
  
  return {
    totalAnnualBenefits,
    corporateAnnualBenefits,
    franchiseAnnualBenefits,
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
    
    // Additional properties needed by components
    fiveYearCumulativeBenefits,
    corporateFiveYearCumulativeBenefits,
    
    // Properties for BenefitsBreakdown component
    timeSavings,
    errorReduction,
    patientRetention,
    microservicesBenefits,
    
    // Properties for CorporatePnLImpact component
    implementationCost: data.implementationCost,
    corporateRoyaltyPercent: data.corporateRoyaltyPercent
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}
