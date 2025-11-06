/**
 * A helper to sanitize query objects before converting them into URLSearchParams.
 * Removes undefined, null, and empty string values to ensure cleaner URLs and backend safety.
 *
 * @param query - An object containing query parameters
 * @returns URLSearchParams - A sanitized query string
 */
export const getQuery = (query: Record<string, unknown>): URLSearchParams => {
  const checkedQuery: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      checkedQuery[key] = String(value);
    }
  }

  return new URLSearchParams(checkedQuery);
};

/**
 * Combines multiple class names into a single string.
 * Ignores falsy values (false, null, undefined, '').
 *
 * @param  {...(string | undefined | false | null)} classes - Class names to combine
 * @returns {string} - The combined class string
 */
export const cn = (
  ...classes: (string | undefined | false | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
