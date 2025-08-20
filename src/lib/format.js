// === FORMATTING LIBRARY ===

// Format currency to USD
export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format number with commas
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

// Format percentage
export const formatPercent = (value) => {
  return `${value}%`;
};

// Format time in hours
export const formatHours = (hours) => {
  return `${hours} hours`;
};

// Format time in minutes
export const formatMinutes = (minutes) => {
  return `${minutes} min`;
};
