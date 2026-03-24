export function markPeriodUseCase(period?: number) {
  return !period ? 2 : period > 6 ? 6 : period
}
