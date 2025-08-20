// === CALCULATION LIBRARY ===

// Constants
export const WORK_DAYS_PER_MONTH = 22;
export const WORK_DAYS_PER_WEEK = 5;
export const WAGE_MULTIPLIER = 1.5; // All-in wage (including taxes, insurance)
export const BILLABLE_RATE_MULTIPLIER = 2; // Billable rate vs wage
export const CLEANUP_CO_RATE = 35; // Hourly rate for cleanup company

// Time & Effort Calculations
export const calculateTotalHoursLost = (crewSize, cleanupTime, workDays) => {
  return Math.round((crewSize * cleanupTime * workDays) / 60);
};

export const calculateProductiveHoursGained = (crewSize, cleanupTime, workDays) => {
  return Math.round((crewSize * cleanupTime * workDays) / 60);
};

// Cost & Money Calculations
export const calculateLaborCost = (totalHoursLost, hourlyWage) => {
  return Math.round(totalHoursLost * hourlyWage * WAGE_MULTIPLIER);
};

export const calculateLostRevenue = (totalHoursLost, billableRate) => {
  return Math.round(totalHoursLost * billableRate);
};

export const calculateTotalCost = (laborCost, lostRevenue) => {
  return laborCost + lostRevenue;
};

// Morale & Productivity Calculations
export const calculateMoraleScore = (moraleImpact) => {
  return Math.max(1, 10 - moraleImpact);
};

export const calculateProductivityGain = (teamSize, productivityLoss, workDays) => {
  return Math.round((teamSize * productivityLoss * workDays) / 100);
};

// Safety & Risk Calculations
export const calculateRiskScore = (incidentRate, liabilityRisk) => {
  return Math.max(1, 10 - (incidentRate + liabilityRisk));
};

export const calculatePotentialSavings = (incidentRate, liabilityRisk) => {
  return Math.round((incidentRate * 5000) + (liabilityRisk * 2000));
};

// Double Loss Calculations (from original app)
export const calculateCleanupHoursMonth = (crewSize, cleanupMinutesPerDay) => {
  const cleanupHoursPerWeek = (cleanupMinutesPerDay / 60) * WORK_DAYS_PER_WEEK;
  return crewSize * cleanupHoursPerWeek * (WORK_DAYS_PER_MONTH / WORK_DAYS_PER_WEEK);
};

export const calculateWagesPaidMonth = (cleanupHoursMonth, wageBase) => {
  return cleanupHoursMonth * (wageBase * WAGE_MULTIPLIER);
};

export const calculateProfitMissedMonth = (cleanupHoursMonth, wageBase) => {
  const billableRate = (wageBase * WAGE_MULTIPLIER) * BILLABLE_RATE_MULTIPLIER;
  return cleanupHoursMonth * (billableRate - (wageBase * WAGE_MULTIPLIER));
};

export const calculateTotalDoubleLoss = (wagesPaidMonth, profitMissedMonth) => {
  return wagesPaidMonth + profitMissedMonth;
};

export const calculateCleanupCoCost = (cleanupHoursMonth) => {
  return cleanupHoursMonth * CLEANUP_CO_RATE;
};

export const calculateProfitEarnedBack = (cleanupHoursMonth, wageBase) => {
  const billableRate = (wageBase * WAGE_MULTIPLIER) * BILLABLE_RATE_MULTIPLIER;
  return cleanupHoursMonth * billableRate;
};

export const calculateNetGain = (profitEarnedBack, cleanupCoCost) => {
  return profitEarnedBack - cleanupCoCost;
};
