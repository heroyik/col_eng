/**
 * Returns the Astro base URL (`import.meta.env.BASE_URL`) guaranteed to end
 * with a trailing slash. Falls back to `"/"` when `BASE_URL` is empty.
 */
export function assetBaseUrl(): string {
  const baseUrl = import.meta.env.BASE_URL || "/";
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}
