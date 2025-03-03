/**
 * Price Formatting Utilities
 * 
 * Handles consistent price formatting throughout the application.
 * Converts cents to dollars and formats with proper decimal places.
 */

/**
 * Formats a price from cents to dollars
 * @param cents - Price in cents
 * @returns Formatted price string
 * 
 * @example
 * ```ts
 * formatPrice(4999) // Returns "49.99"
 * ```
 */
export const formatPrice = (cents: number): string => {
  return (cents / 100).toFixed(2);
};