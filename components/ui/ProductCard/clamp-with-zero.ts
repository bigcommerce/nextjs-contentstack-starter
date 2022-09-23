/**
 * Special case for Ratings,
 *   any number below 1 should => 0
 *   any other number should be clamped to (min..max)
 */
export const clampWithZero = (value : number, min : number, max: number): number => {
  if (value == 0) {
    return value
  }

  return Math.min(Math.max(value, min), max)
}

export default clampWithZero
