/**
 * Database access has been migrated to browser localStorage for Vercel serverless compatibility.
 * This prevents read-only filesystem errors (EROFS) and ensures complete local-first persistence.
 */

export function getDatabase() {
  return null;
}
