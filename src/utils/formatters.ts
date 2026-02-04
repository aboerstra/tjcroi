export const formatLargeNumber = (num: number): string => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1000000000) return `${sign}${(absNum / 1000000000).toFixed(1)}B`;
  if (absNum >= 1000000) return `${sign}${(absNum / 1000000).toFixed(1)}M`;
  if (absNum >= 1000) return `${sign}${Math.round(absNum / 1000)}K`;
  return Math.round(num).toLocaleString('en-US');
};

// Full currency format with commas, rounded to nearest dollar
export const formatCurrencyFull = (num: number): string => {
  return Math.round(num).toLocaleString('en-US');
};

// Compact currency format for small containers
export const formatCompactCurrency = (num: number): string => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-$' : '$';
  
  if (absNum >= 1000000000) return `${sign}${(absNum / 1000000000).toFixed(1)}B`;
  if (absNum >= 1000000) return `${sign}${(absNum / 1000000).toFixed(1)}M`;
  if (absNum >= 1000) return `${sign}${Math.round(absNum / 1000)}K`;
  return `${num < 0 ? '-$' : '$'}${Math.round(absNum).toLocaleString('en-US')}`;
};
