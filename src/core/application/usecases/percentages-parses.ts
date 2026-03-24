function percentStringToMultiplier(value: string): number {
  const numeric = Number(value.replace('%', '').trim());
  return numeric / 100;
}

function multiplierToPercentString(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export const percentageUseCases = {
  percentStringToMultiplier,
  multiplierToPercentString
}
